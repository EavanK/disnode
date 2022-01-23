import { makeStyles } from "@mui/styles";
import ChannelList from "./Channel/ChannelList";
import MessageList from "./Channel/Message/MessageList";
import MemberList from "./Member/MemberList";
import Stack from "@mui/material/Stack";
import MessageForm from "./Channel/Message/MessageForm";
import ChannelHeader from "./Channel/ChannelHeader";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";

const useStyles = makeStyles({
  messages: { justifyContent: "flex-end", width: "100%" },
});
export default function Server(props) {
  const classes = useStyles();
  const {
    setMessages,
    appDispatch,
    setServer,
    app: { channel, server, messages },
  } = useContext(ServerContext);
  const {
    state: { user, socket, activeUsers, autheticated },
  } = useContext(AuthContext);

  // useeffect responsbile for all server actions
  useEffect(async () => {
    if (socket) {
      socket.on("channel message", async (message) => {
        // const messages = await getMessages();
        // if (channel.id !== message.channel_id) return;
        // const channels = await getChannels(server.id);

        // get back users online and add them in views
        // do this only if user is sender
        // can also only render views if message is last index
        // on backend -> receive that emit and add users to
        // views db and chip off the msg to clients w views filled
        if (message.server_id !== server.id) return;
        console.log(message);
        setMessages(message);
        // setChannels(channels); // dont use
        // setServer(server);
      });
    }
    return () => socket.removeAllListeners("channel message");
    // setMembers(members);
  }, [socket, activeUsers]);
  return (
    <>
      <ChannelList />
      <Stack spacing={0} className={classes.messages}>
        <ChannelHeader />
        <MessageList />
        <MessageForm />
      </Stack>
      <MemberList />
    </>
  );
}
