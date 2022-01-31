import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { makeStyles } from "@mui/styles";
import ServerContext from "../../../contexts/ServerContext";
import { editChannel } from "../../../network/channelApi";
import { CHANNEL_EDIT, EDIT_CHANNEL } from "../../../utils/constants";
import AuthContext from "../../../contexts/AuthContext";

const useStyles = makeStyles({
  dialogPaper: {
    display: "flex",
    width: "25%",
    alignItems: "center",
    borderRadius: "1em",
    textAlign: "center",
    padding: "20px 20px 40px 40px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflowY: "auto",
    overflowX: "hidden",
  },
});

export default function ChannelEditDialog(props) {
  const { open, setOpen, input, setInput } = props;
  const { app, appDispatch } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setInput(app.channel.title);
    }, 500);
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = async () => {
    if (input !== app.channel.title && input) {
      const channel = await editChannel(app.channel.id, input);
      socket.emit(CHANNEL_EDIT, channel);
      appDispatch({
        type: EDIT_CHANNEL,
        channel,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle style={{ fontSize: "1.55em" }}>Edit Channel</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "auto",
            height: "auto",
            marginBottom: "40px",
          }}
        >
          <Typography variant="h6">{app.channel?.title}</Typography>
        </Box>
        <Grid container columnSpacing={12} rowSpacing={4}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              type="text"
              variant="outlined"
              label="Channel Title"
              value={input}
              onKeyDown={handleKeydown}
              onChange={(e) => setInput((prev) => e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "20px 20px", paddingBottom: "0" }}>
        <Button
          variant="outlined"
          disableRipple
          color="primary"
          onClick={handleClose}
          sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableRipple
          onClick={handleSave}
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
