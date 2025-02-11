import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useServerDialogStyles } from "../../ServerNavBar/useServerDialogStyles";
import uploadtoS3 from "../../../utils/s3";
import { updateServer } from "../../../network/serverApi";
import {
  EDIT_SERVER,
  SERVERS_UPDATE,
  SERVER_EDIT,
} from "../../../utils/constants";
import { Box } from "@mui/system";
import AuthContext from "../../../contexts/AuthContext";
import ServerContext from "../../../contexts/ServerContext";
import SelectButton from "../../ServerNavBar/Create/SelectButton";
import Tags from "../../ServerNavBar/Create/Tags";

export default function ServerEditDialog(props) {
  const { open, setOpen, input, setInput, initialInput } = props;
  const { app, appDispatch } = useContext(ServerContext);
  const {
    state: { socket },
  } = useContext(AuthContext);
  const { server } = app;
  const classes = useServerDialogStyles();
  const [tags, setTags] = useState(server.tags.map((tag) => tag.id));
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleCancel = () => {
    setTimeout(() => {
      setInput(initialInput);
    }, 200);
    setOpen(false);
    setError(null);
  };

  const handleUndo = () => {
    const preview = document.querySelector("#image-preview");
    preview.src = server.logo;
    setFile(null);
  };

  const handleEdit = async () => {
    input.tags = tags;
    if (!input.title) return setError("Title can not be empty");
    const formData = new FormData();
    formData.append("image", file);
    let logo;
    if (file) [logo] = await uploadtoS3(formData);
    const data = file ? { ...input, logo } : input;

    const server = await updateServer(app.server.id, data);
    appDispatch({ type: EDIT_SERVER, server });
    socket.emit(SERVER_EDIT, server);
    socket.emit(SERVERS_UPDATE);
    setOpen(false);
    setError(null);
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle style={{ fontSize: "1.55em" }}>Edit Server</DialogTitle>
        <DialogContent className={classes.content}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              style={{
                width: "85px",
                height: "85px",
                marginBottom: "20px",
              }}
              imgProps={{ id: "image-preview" }}
              src={server.logo}
            />
            <SelectButton setFile={setFile} />
            <Button
              // variant="outlined"
              disableRipple
              color="error"
              onClick={handleUndo}
              sx={{
                mt: "5px",
                color: "rgb(199, 58, 58,1)",
                opacity: 1,
                "&:hover": { opacity: 1 },
              }}
            >
              Undo
            </Button>
          </Box>
          <TextField
            autoFocus
            type="text"
            fullWidth
            variant="outlined"
            label="Title"
            value={input.title}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: "30px" }}
          />
          <Tags setTags={setTags} serverTags={server.tags} />
        </DialogContent>
        <DialogActions>
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
            onClick={handleEdit}
            sx={{
              color: "white",
              opacity: 0.8,
              "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
              backgroundColor: "rgb(199, 58, 58,0.8)",
            }}
          >
            Edit
          </Button>
        </DialogActions>
        {error && <Alert severity="error">{error}</Alert>}
      </Dialog>
    </div>
  );
}
