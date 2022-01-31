import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  asd: { width: "60ch", margin: "0 auto" },
  actions: { display: "flex", justifyContent: "center" },
}));
export default function ConnectionsDialog(props) {
  const { input, url, setOpen, open, setUrl, iconId, setInput } = props;
  const classes = useStyles();

  const handleAction = () => {
    setInput((prev) => ({
      ...prev,
      socials: [
        ...prev.socials.filter((social) => social.id !== iconId),
        { id: iconId, url },
      ],
    }));

    setOpen(false);
    setUrl("");
  };
  const handleCancel = () => {
    setUrl("");
    setOpen(false);
  };

  return (
    <Dialog className={classes.asd} open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Enter a URL to share!</DialogTitle>
      <DialogContent>
        <DialogContentText color="error">
          Note: This will be visible to your friends and mutual server members.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Connection URL"
          type="text"
          fullWidth
          variant="standard"
          placeholder={input[iconId]?.url}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </DialogContent>

      <DialogActions className={classes.actions}>
        <Button
          variant="outlined"
          disableRipple
          color="primary"
          onClick={handleCancel}
          sx={{ color: "white", opacity: 0.8, "&:hover": { opacity: 1 } }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableRipple
          onClick={handleAction}
          sx={{
            color: "white",
            opacity: 0.8,
            "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
            backgroundColor: "rgb(199, 58, 58,0.8)",
          }}
          // startIcon={<DoNotDisturbIcon />}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
