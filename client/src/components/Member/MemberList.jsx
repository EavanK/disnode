import { useContext, useState } from "react";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { Drawer, ListItem, List, Typography, Divider } from "@mui/material";
import { useMemberListStyles } from "./useMemberListStyles";
import ServerContext from "../../contexts/ServerContext";
import MemberListItem from "./MemberListItem";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import GroupsIcon from "@mui/icons-material/Groups";

const useStyles = makeStyles({
  members: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      borderRadius: "30px",
      width: "2px",
    },
    "&::-webkit-scrollbar-track": {
      WebkitBoxShadow: "inset 0 0 3px rgb(0,0,0,0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgb(0,0,0,0.3)",
      borderRadius: "30px",
    },
  },
  button: {
    cursor: "pointer",
    opacity: "0.7",
    "&:hover": {
      opacity: "1.0",
    },
  },
  role: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1em",
  },
  divider: {
    width: "85%",
    margin: "auto auto",
  },
});

export default function MemberList(props) {
  const drawerClasses = useMemberListStyles();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    app: { members },
  } = useContext(ServerContext);
  const drawerClass = classNames(drawerClasses.drawer, {
    [drawerClasses.drawerOpen]: open,
  });

  const openDrawer = () => {
    // socket.emit("get online");
    setOpen(true);
  };
  const closeDrawner = () => {
    setOpen(false);
  };

  // role in the server is admin
  const admins = members
    .filter((member) => member.role === "admin")
    .map((member) => {
      return (
        <MemberListItem
          key={member.id}
          member={member}
          open={open}
          setOpen={setOpen}
        />
      );
    });

  // role in the server is user
  const users = members
    .filter((member) => member.role === "user")
    .map((member) => {
      return (
        <MemberListItem
          key={member.id}
          member={member}
          open={open}
          setOpen={setOpen}
        />
      );
    });

  // role in the server is owner
  const owner = members
    .filter((member) => member.role === "owner")
    .map((member) => {
      return (
        <MemberListItem
          key={member.id}
          member={member}
          open={open}
          setOpen={setOpen}
        />
      );
    });

  return (
    <Drawer
      className={drawerClass}
      variant="permanent"
      anchor="right"
      open={open}
    >
      <List className={classes.members}>
        <ListItem
          className={classes.button}
          onClick={open ? closeDrawner : openDrawer}
        >
          <GroupsIcon fontSize="large" />
          {open ? <ChevronRight /> : <ChevronLeft />}
        </ListItem>
        {owner.length > 0 && (
          <>
            <Typography
              className={classes.role}
              variant="button"
              sx={{ color: "rgb(199, 58, 58,1)" }}
            >
              owner
            </Typography>
            <Divider component="li" className={classes.divider} />
          </>
        )}
        {owner}
        {admins.length > 0 && (
          <>
            <Typography
              className={classes.role}
              variant="button"
              sx={{ color: "orange" }}
            >
              admins
            </Typography>
            <Divider component="li" className={classes.divider} />
          </>
        )}
        {admins}
        {users.length > 0 && (
          <>
            <Typography
              className={classes.role}
              variant="button"
              sx={{ color: "green" }}
            >
              users
            </Typography>
            <Divider component="li" className={classes.divider} />
          </>
        )}
        {users}
      </List>
    </Drawer>
  );
}
