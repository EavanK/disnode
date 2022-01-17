import { useContext, useEffect, useRef } from "react";
import ServerList from "../components/Server/ServerList";
import ChannelList from "../components/Channel/ChannelList";
import MessageList from "../components/Channel/Message/MessageList";
import MemberList from "../components/Member/MemberList";
import sio from "../socket/index";
import AuthContext from "../contexts/AuthContext";
import ServerContext from "../contexts/ServerContext";
import { Container } from "@mui/material";
import { getServers } from "../network/serverApi";

export default function Test() {
  // const { app, setServer, setChannel } = useServerData();

  const socket = useRef();
  const { state, dispatch } = useContext(AuthContext);
  const { app, setServers } = useContext(ServerContext);

  useEffect(() => {
    socket.current = sio;
  }, [socket.current]);

  useEffect(async () => {
    if (!state.loading) {
      const servers = await getServers();
      setServers(servers);
    }
  }, [state.authenticated]);
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <ServerList socket={socket.current} user={state.user}>
        {app.server && (
          <ChannelList>
            <MessageList>
              <MemberList socket={socket.current} />
            </MessageList>
          </ChannelList>
        )}
      </ServerList>
    </div>
  );
}
