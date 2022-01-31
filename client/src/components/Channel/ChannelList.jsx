import { useContext } from "react";
import { List, ListItem, Box } from "@mui/material";
import ChannelListItem from "./ChannelListItem";
import NewChannelDialog from "./Create/NewChannelDialog";
import ServerContext from "../../contexts/ServerContext";
import ServerMenu from "./ServerMenu/ServerMenu";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../contexts/AuthContext";

const useStyles = makeStyles({
  channels: {
    borderRight: "1px solid rgb(4,11,12,0.5)",
    width: "30%",
    maxWidth: "17em",
    backgroundColor: "rgb(173, 169, 168,0.9)",
  },
  add: {
    justifyContent: "center",
  },
});

export default function ChannelList() {
  const classes = useStyles();
  const {
    app: { channels, members },
  } = useContext(ServerContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  const parsedChannels = Object.values(channels).map((ch) => {
    return <ChannelListItem key={ch.id} id={ch.id} channel={ch} />;
  });
  return (
    <Box className={classes.channels}>
      <List>
        <ServerMenu />
        {channels && parsedChannels}
        {members.find((m) => m.user_id === user.id).role !== "user" && (
          <ListItem className={classes.add}>
            <NewChannelDialog />
          </ListItem>
        )}
      </List>
    </Box>
  );
}
