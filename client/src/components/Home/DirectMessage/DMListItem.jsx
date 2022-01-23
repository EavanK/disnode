import React from "react";
import {
  ListItem,
  ListItemText,
  Divider,
  Box,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

//style
const useStyles = makeStyles(() => ({
  divider: {
    marginTop: ".6em",
    width: "60%",
  },
  listItem: {
    "&:hover": {},
    padding: "1.2em 1em",
    "&.MuiListItem-root": {
      padding: "1.2em 1.2em",
    },
  },
  selected: {
    background: "rgb(182, 185, 181, 0.5)",
  },
  text: {
    color: "black",
    paddingLeft: "2em",
  },
  avatar: {
    width: "50px",
    height: "50px",
  },
}));

export default function DMListItem(props) {
  const classes = useStyles();
  const { user, id, DM, setDM } = props;
  // const listItemClass = classNames(classes.listItem, {
  //   [classes.selected]: id === channel.id,
  // });

  const handleChannelClick = () => {
    setDM(id);
  };

  return (
    <>
      {/* <ListItem
        className={classes.listItem}
        button
        key={user.id}
        onClick={handleChannelClick}
        disablePadding
      >
        <ListItemAvatar>
          <Avatar
            alt={user.full_name}
            src={user.img}
            className={classes.avatar}
          />
        </ListItemAvatar>
        <ListItemText primary={user.full_name} className={classes.text} />
      </ListItem> */}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={""} />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
}
