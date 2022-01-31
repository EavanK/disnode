import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { answerRequest } from "../../../network/friendApi";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { REMOVE_REQUEST, UPDATE_FRIENDS } from "../../../utils/constants";

export default function RequestListItem(props) {
  const { user, received, sent } = props;
  const { dispatch } = useContext(AuthContext);

  // accept friend request
  const handleAnswer = async (requestId, answer) => {
    const { friends, request } = await answerRequest(requestId, answer);
    if (request) dispatch({ type: REMOVE_REQUEST, request });
    if (friends) dispatch({ type: UPDATE_FRIENDS, friends });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={user.nickname}
            src={user.avatar}
            sx={{ height: "50px", width: "50px" }}
          />
        </ListItemAvatar>
        <ListItemText sx={{ pl: "20px" }} primary={user.nickname} />
        {received ? (
          <>
            <IconButton
              disableRipple
              onClick={() => handleAnswer(user.request_id, true)}
              sx={{ color: "green", opacity: 0.6, "&:hover": { opacity: 1 } }}
            >
              <CheckCircleOutlineIcon />
            </IconButton>
            <IconButton
              disableRipple
              onClick={() => handleAnswer(user.request_id, false)}
              sx={{ color: "red", opacity: 0.6, "&:hover": { opacity: 1 } }}
            >
              <HighlightOffIcon />
            </IconButton>
          </>
        ) : sent ? (
          <Button
            variant="outlined"
            disableRipple
            color="error"
            onClick={() => handleAnswer(user.request_id, false)}
            sx={{ color: "red", opacity: 0.8, "&:hover": { opacity: 1 } }}
          >
            Cancel Request
          </Button>
        ) : null}
      </Box>
    </Box>
  );
}
