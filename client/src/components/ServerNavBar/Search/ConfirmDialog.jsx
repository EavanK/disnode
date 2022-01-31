import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import ServerContext from "../../../contexts/ServerContext";
import { addMember } from "../../../network/memberApi";
import { getServer, getServers } from "../../../network/serverApi";
import {
  CHANNEL_JOIN,
  CHANNEL_LEAVE,
  MEMBER_UPDATE,
  SERVER,
  SERVER_JOIN,
  SERVER_LEAVE,
} from "../../../utils/constants";
import { useServerDialogStyles } from "../useServerDialogStyles";

export default function ConfirmDialog(props) {
  const { confirm, setOpen, server, setOpenResult, setConfirm } = props;
  const { setServers, setServer, setMode, app } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);
  const classes = useServerDialogStyles();

  const handleConfirm = async () => {
    try {
      const members = await addMember(server.id);
      socket.emit(MEMBER_UPDATE, members, server.id);
      const servers = await getServers();
      const joinedServer = await getServer(server.id);
      if (joinedServer && servers) {
        setOpenResult(false);
        setOpen(false);
        if (app.server.id) socket.emit(SERVER_LEAVE, app.server.id);
        socket.emit(SERVER_JOIN, joinedServer.id);
        if (app.channel) socket.emit(CHANNEL_LEAVE, app.channel.id);
        const channels = Object.values(joinedServer?.channels);
        socket.emit(CHANNEL_JOIN, {
          id: channels[0]?.id,
          server_id: joinedServer.id,
        });
        setServers(servers);
        setServer(joinedServer);
        setMode(SERVER);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={confirm}
      onClose={() => setConfirm(false)}
    >
      <DialogTitle>{server.title}</DialogTitle>
      <DialogContentText>{`Are you sure you want to Join?`}</DialogContentText>
      <DialogActions>
        <Button
          variant="outlined"
          disableRipple
          color="primary"
          onClick={() => setConfirm(false)}
          sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableRipple
          onClick={handleConfirm}
          sx={{
            color: "white",
            opacity: 0.8,
            "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
            backgroundColor: "rgb(199, 58, 58,0.8)",
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
