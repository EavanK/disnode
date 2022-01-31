import {
  Avatar,
  ListItemText,
  ListItem,
  styled,
  Tooltip,
  IconButton,
} from "@mui/material";
import classNames from "classnames";
import MemberMenu from "./MemberMenu";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Badge from "@mui/material/Badge";
import { Settings } from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
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

const useStyles = makeStyles({
  member: {
    justifyContent: "center",
    cursor: "pointer",
  },
  nickname: { paddingLeft: "2em", fontSize: "1em" },
  avatar: { width: "45px", height: "45px" },
  openedAvatars: {
    marginLeft: "0.8em",
  },
  divider: {
    width: "65%",
    margin: "auto auto",
  },
});

export default function MemberListItem(props) {
  const { member, open } = props;
  const [anchor, setAnchor] = useState(false);

  const classes = useStyles();
  const memberListClass = classNames(classes.member, {
    [classes.memberListOpen]: !open,
  });
  const avatarClasses = classNames(classes.avatar, {
    [classes.openedAvatars]: open,
  });

  const handleAnchor = (e) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <ListItem disableGutters className={memberListClass}>
        <Tooltip title={member.nickname} arrow placement="left">
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant={member.is_active ? "dot" : "standard"}
            onClick={handleAnchor}
          >
            <Avatar
              alt={member.nickname}
              src={member.avatar ? member.avatar : "/images/Disnode-red.png"}
              className={avatarClasses}
            />
          </StyledBadge>
        </Tooltip>
        {open && (
          <>
            <ListItemText
              inset
              primary={member.nickname}
              className={classes.nickname}
            />
            <Tooltip title={"Options"}>
              <IconButton onClick={handleAnchor} sx={{ mr: "20px" }}>
                <Settings fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}

        <MemberMenu anchor={anchor} setAnchor={setAnchor} member={member} />
      </ListItem>
    </>
  );
}
