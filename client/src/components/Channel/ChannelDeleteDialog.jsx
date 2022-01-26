import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import ServerContext from "../../contexts/ServerContext";
import { deleteChannel } from "../../network/channelApi";
import {
  CHANNEL_DELETE,
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  DELETE_CHANNEL,
} from "../../utils/constants";
import { useDisButtonStyles } from "../styles/useDisButtonStyles";

const useStyles = makeStyles({
  dialogPaper: {
    display: "flex",
    width: "18%",
    alignItems: "center",
    borderRadius: "1em",
    textAlign: "center",
    padding: "20px 20px 40px 40px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflowY: "auto",
  },
});

export default function ChannelDeleteDialog({ open, setOpen }) {
  const classes = useStyles();
  const buttonClasses = useDisButtonStyles();
  const { app, setChannels, appDispatch } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);
  const { channel } = app;

  const handleDelete = async () => {
    // const channels = await deleteChannel(server.id, channel.id);
    // setChannels(channels);
    const channel = await deleteChannel(app.channel.id);
    socket.emit(CHANNEL_DELETE, channel);
    socket.emit(CHANNEL_LEAVE, channel.id);
    const channels = Object.values(app.server?.channels).filter(
      (c) => c.id !== channel.id
    );
    socket.emit(CHANNEL_JOIN, {
      id: channels[0]?.id,
      server_id: app.server.id,
    });
    appDispatch({
      type: DELETE_CHANNEL,
      channel,
    });

    setOpen(false);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle># {channel?.title}</DialogTitle>
      <DialogContentText>{`Are you sure you want to delete the channel?`}</DialogContentText>
      <DialogActions>
        <Button className={buttonClasses.cancel} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button className={buttonClasses.submit} onClick={handleDelete}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
