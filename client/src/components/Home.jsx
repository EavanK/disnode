import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import FriendsListDrawer from "./HomePage/Friends/FriendsListDrawer";
import DMList from "./HomePage/DirectMessage/DMList";
import { makeStyles } from "@mui/styles";
import DMChat from "./HomePage/DirectMessage/DMChat";
import { messages } from "./HomePage/DirectMessage/mock";

// styles
import MessageForm from "./Channel/Message/MessageForm";
import { Stack } from "@mui/material";
import DMHeader from "./HomePage/DirectMessage/DMHeader";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  messages: { justifyContent: "flex-end", flexGrow: 1 },
  form: { justifyContent: "flex-end", width: "100%" },
}));

export default function Home() {
  const classes = useStyles();
  const { state } = useContext(AuthContext);

  // If user is not logged in, redirect to login
  const navigate = useNavigate();
  useEffect(() => {
    if (!state.authenticated) navigate("/login");
  }, []);

  return (
    <>
      <FriendsListDrawer />
      <DMList />
      <Stack className={classes.messages}>
        <DMHeader />
        <DMChat messages={messages} />
        <MessageForm spacing={0} className={classes.form} />
      </Stack>
    </>
  );
}
