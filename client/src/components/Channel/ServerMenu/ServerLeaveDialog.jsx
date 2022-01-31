import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useContext } from "react";
import ServerContext from "../../../contexts/ServerContext";
import AuthContext from "../../../contexts/AuthContext";
import { useNewChannelDialogStyles } from "../Create/useNewChannelDialogStyles";
import { removeMember } from "../../../network/memberApi";
import { getServers } from "../../../network/serverApi";
import {
  CHANNEL_LEAVE,
  HOME,
  MEMBER_UPDATE,
  SERVER_LEAVE,
} from "../../../utils/constants";

export default function ServerLeaveDialog(props) {
  const { open, setOpen, role } = props;
  const classes = useNewChannelDialogStyles();
  const {
    app: { server, channel },
    setServers,
    setMode,
  } = useContext(ServerContext);
  const {
    state: { user, socket },
  } = useContext(AuthContext);

  // click handler for confirm button
  const handleConfirm = async () => {
    const memberId = server.members.find((e) => e.user_id == user.id).id;
    const members = await removeMember(server.id, memberId);
    socket.emit(MEMBER_UPDATE, members, server.id);
    socket.emit(SERVER_LEAVE, server.id);
    socket.emit(CHANNEL_LEAVE, channel.id);
    const servers = await getServers();
    await setServers(servers);
    setOpen(false);
    setMode(HOME);
  };

  const confirmation =
    role === "owner"
      ? "Pass your ownership before leaving"
      : "Would you like to leave server?";

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>{confirmation}</DialogTitle>
      <DialogActions>
        <Button
          variant="outlined"
          disableRipple
          color="primary"
          onClick={() => setOpen(false)}
          sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          Cancel
        </Button>
        {role !== "owner" && (
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
        )}
      </DialogActions>
    </Dialog>
  );
}
