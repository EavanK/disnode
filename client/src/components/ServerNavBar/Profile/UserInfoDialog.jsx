import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import SelectButton from "../Create/SelectButton";
import { makeStyles } from "@mui/styles";
import UserForm from "./UserForm";
import ConnectionsDialog from "./ConnectionsDialog";
import SteamSvg from "../../SvgIcons/SteamSvg";
import TwitterSvg from "../../SvgIcons/TwitterSvg";
import { updateProfile } from "../../../network/userApi";
import uploadtoS3 from "../../../utils/s3";
import { SET_REQUESTS, UPDATE_USER } from "../../../utils/constants";
import TwitchSvg from "../../SvgIcons/TwitchSvg";
import YoutubeSvg from "../../SvgIcons/YoutubeSvg";
import RedditSvg from "../../SvgIcons/RedditSvg";
import SpotifySvg from "../../SvgIcons/SpotifySvg";

const useStyles = makeStyles({
  dialogPaper: {
    display: "flex",
    maxHeight: "90%",
    width: "30%",
    alignItems: "center",
    borderRadius: "1em",
    textAlign: "center",
    padding: "20px 20px 40px 40px",
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflowY: "auto",
  },
  connections: {
    marginTop: "20px",
  },
});

export default function UserInfoDialog({ open, setOpen }) {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);
  const { avatar, full_name, nickname, bio, socials } = user;

  const initialInput = {
    avatar,
    full_name,
    nickname,
    bio,
    socials,
  };
  const [file, setFile] = useState(null);
  const [input, setInput] = useState(initialInput);
  const [iconId, setIconId] = useState("");
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const classes = useStyles();

  const handleClose = () => {
    // setInput(initialInput);
    setOpen(false);
    setTimeout(() => {
      setInput(initialInput);
    }, 500);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);
    let logo;
    if (file) [logo] = await uploadtoS3(formData);
    const data = file ? { ...input, avatar: logo } : input;
    const updatedUser = await updateProfile(data, user.id);
    dispatch({ type: UPDATE_USER, user: updatedUser });
    dispatch({ type: SET_REQUESTS, requests: updatedUser.requests });
    setOpen(false);
  };

  const handleUndo = () => {
    const preview = document.querySelector("#image-preview");
    preview.src = user?.avatar;
    setFile(null);
  };

  const handleDialog = (iconId) => {
    setIconId(iconId);
    const url = input.socials.find((s) => s.id === iconId)?.url;
    setUrl(url || "");
    setDialog(true);
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle style={{ fontSize: "1.55em" }}>Edit Profile</DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "auto",
            marginBottom: "40px",
          }}
        >
          <Avatar
            style={{
              width: "70px",
              height: "70px",
              marginBottom: "20px",
            }}
            src={avatar ? avatar : "/images/Disnode-red.png"}
            imgProps={{ id: "image-preview" }}
          />
          <SelectButton setFile={setFile} />
          <Button color="error" onClick={handleUndo}>
            Undo
          </Button>
        </Box>

        {/* full name, nickname, bio form*/}
        <UserForm input={input} setInput={setInput} />

        {/* connection form */}
        <ConnectionsDialog
          input={input}
          open={dialog}
          iconId={iconId}
          setOpen={setDialog}
          setInput={setInput}
          url={url}
          setUrl={setUrl}
        />
        <Grid container className={classes.connections}>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(1)}
              disableRipple
              sx={
                input.socials.find((e) => e.id == 1)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <SteamSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(2)}
              disableRipple
              sx={
                input.socials.find((e) => e.id == 2)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <TwitchSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(3)}
              disableRipple
              sx={
                input.socials.find((e) => e.id == 3)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <SpotifySvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(4)}
              disableRipple
              sx={
                input.socials.find((e) => e.id == 4)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <YoutubeSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(5)}
              disableRipple
              sx={
                input.socials.find((e) => e.id == 5)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <TwitterSvg />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <IconButton
              onClick={() => handleDialog(6)}
              disableRipple
              sx={
                input.socials.find((e) => e.id == 6)?.url
                  ? { opacity: 1 }
                  : { opacity: 0.2 }
              }
            >
              <RedditSvg />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
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
          onClick={handleSubmit}
          sx={{
            color: "white",
            opacity: 0.8,
            "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
            backgroundColor: "rgb(199, 58, 58,0.8)",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
