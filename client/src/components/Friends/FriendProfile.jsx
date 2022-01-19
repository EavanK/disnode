import DisBox from "../Box/DisBox";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import SteamSvg from "../SvgIcons/SteamSvg";
import DisTypography from "../Box/DisTypography";
import TwitterSvg from "../SvgIcons/TwitterSvg";
import RiotGamesSvg from "../SvgIcons/RiotGamesSvg";
import EpicGamesSvg from "../SvgIcons/EpicGamesSvg";
import FriendProfileItems from "./FriendProfileItems";
import { Avatar, CardActions, CardContent } from "@mui/material";

const useStyles = makeStyles(() => ({
  cardAction: {
    width: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "2em",
    minWidth: 550,
    minHeight: 650,
    // marginTop: "8em",
    backgroundColor: "#68696b",
    color: "#FFF",
    borderRadius: "1em",
  },
  avatar: {
    width: "5em",
    height: "5em",
  },
}));

const connectionsIcons = [
  <SteamSvg />,
  <TwitterSvg />,
  <RiotGamesSvg />,
  <EpicGamesSvg />,
];

export default function FriendProfile(props) {
  const { friend, children } = props;
  const classes = useStyles();

  const icons = connectionsIcons.map((icon) => {
    return <FriendProfileItems>{icon}</FriendProfileItems>;
  });

  return (
    <Card className={classes.card}>
      <Avatar
        alt={friend.full_name}
        src={friend.img}
        className={classes.avatar}
      />
      <DisBox type="displayColumn">
        <CardContent className={classes.cardContent}>
          <DisTypography
            type="userName"
            gutterBottom
            variant="h5"
            component="div"
          >
            {friend.username}
          </DisTypography>
          <DisTypography gutterBottom variant="h7" component="div">
            {friend.full_name}
          </DisTypography>
          <DisTypography type="bio" variant="body1" color="text.secondary">
            {friend.bio}
          </DisTypography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <DisBox type="connections">{icons}</DisBox>
        </CardActions>
        {children}
      </DisBox>
    </Card>
  );
}
