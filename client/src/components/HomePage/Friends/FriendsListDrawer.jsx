import { Fragment, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from "@mui/material";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import MessageIcon from "@mui/icons-material/Message";
import Badge from "@mui/material/Badge";
import AuthContext from "../../../contexts/AuthContext";
import FriendRequestDialog from "./FriendRequestDialog";
import Request from "@mui/icons-material/GroupAdd";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    zIndex: 0,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const useStyles = makeStyles(() => ({
  main: {
    width: "0",
  },
  drawer: {
    "& .MuiDrawer-paper": {
      left: "90px",
    },
  },
  button: {
    positon: "absolute",
    zIndex: 1300,
    left: "15px",
    top: "17px",
    color: "rgb(177,55,55)",
    opacity: 0.9,
    "&:hover": {
      opacity: 1,
    },
  },
  listBox: {
    width: "365.141px",
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    overflowX: "hidden",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0em",
      display: "hidden",
      borderRadius: "30px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 6px rgb(0,0,0,0)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0)",
      borderRadius: "30px",
    },
  },
  list: {},
  topListItem: {},
  botListItem: {},
  toolbar: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#040B0C",
    height: "50px",
    width: "100%",
    padding: "0.5em 0",
    position: "sticky",
    top: "0",
    zIndex: "1",
    borderBottomRightRadius: "7px",
  },
  header: { color: "white" },
  avatar: { width: "45px", height: "45px" },
}));

export default function FriendsListDrawer(props) {
  const classes = useStyles();
  const {
    state: { user },
  } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  // when toggle button is clicked, fetch friends
  const toggleDrawer = async () => {
    setOpen(!open);
  };

  const handleClick = async () => {
    setToggle(true);
  };

  const list = (anchor) => (
    <Box className={classes.listBox}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className={classes.header}
        >
          Friends
        </Typography>
        <Request
          color="primary"
          sx={{
            cursor: "pointer",
            position: "absolute",
            right: "1em",
          }}
          onClick={handleClick}
        />
        <FriendRequestDialog open={toggle} setOpen={setToggle} />
      </Toolbar>

      <Divider />
      <List className={classes.list}>
        {user?.friends.map((friend) => (
          <ListItem
            button
            key={friend.friend_id}
            className={classes.botListItem}
          >
            <ListItemAvatar>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant={friend.is_active ? "dot" : "standard"}
              >
                <Avatar
                  alt={friend.full_name}
                  src={friend.avatar}
                  className={classes.avatar}
                />
              </StyledBadge>
            </ListItemAvatar>

            <ListItemText primary={friend.full_name} />
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className={classes.main}>
      <Fragment key={"left"}>
        <IconButton
          aria-label="friends"
          size="large"
          onClick={open ? toggleDrawer : toggleDrawer}
          className={classes.button}
          disableRipple
        >
          <PeopleAlt />
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
        <SwipeableDrawer
          anchor={"left"}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(false)}
          open={open}
          className={classes.drawer}
        >
          {list("left")}
        </SwipeableDrawer>
      </Fragment>
    </div>
  );
}
