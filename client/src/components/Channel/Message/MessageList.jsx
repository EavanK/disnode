import MessageListItem from "./MessageListItem";
import { useContext, useRef, useEffect } from "react";
import ServerContext from "../../../contexts/ServerContext";
import { List } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  messages: {
    display: "flex",
    maxHeight: "100vh",
    height: "auto",
    flexDirection: "column",
    marginTop: "auto",
    paddingBottom: "0.5em",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      borderRadius: "30px",
      width: "5px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0.3)",
      borderRadius: "30px",
    },
  },
}));

export default function MessageList() {
  const classes = useStyles();
  const {
    app: { messages },
  } = useContext(ServerContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  });

  const parsedMessages = messages.map((message, i) => {
    return (
      <MessageListItem
        key={i}
        message={message}
        index={i}
        messages={messages}
      />
    );
  });

  return (
    <List className={classes.messages}>
      {parsedMessages}
      <div ref={scrollRef} />
    </List>
  );
}
