import { useContext, useState } from "react";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import Person from "@mui/icons-material/Person";
import Admin from "@mui/icons-material/AdminPanelSettings";
import Onwership from "@mui/icons-material/CompareArrows";
import {
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import MemberDialog from "./MemberDialog";
import AuthContext from "../../contexts/AuthContext";
import ServerContext from "../../contexts/ServerContext";

export default function MemberMenu(props) {
  const { anchor, setAnchor, member } = props;
  const {
    state: { user },
  } = useContext(AuthContext);
  const {
    app: { members },
  } = useContext(ServerContext);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");

  const [PROFILE, ADD, ADMIN, DEMOTE, KICK, OWNERSHIP] = [
    "PROFILE",
    "ADD",
    "ADMIN",
    "DEMOTE",
    "KICK",
    "OWNERSHIP",
  ];

  const role = members.find((m) => m.user_id === user.id).role;

  const handleAction = (action) => {
    setOpen(true);
    setAnchor(false);
    setAction(action);
  };
  // user is not friend with the member
  const isNotFriend = (memberId) => {
    return !user.friends.some((f) => f.user_id === memberId);
  };

  // user received/sent friend request from/to member
  const isNotPending = (memberId) => {
    return (
      !user.requests.received.some((f) => f.user_id === memberId) &&
      !user.requests.sent.some((f) => f.user_id === memberId)
    );
  };

  return (
    <Box>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchor)}
        onClose={() => setAnchor(false)}
      >
        <MenuList>
          <Divider />
          <MenuItem onClick={() => handleAction(PROFILE)}>
            <ListItemIcon>
              <Person color="info" />
            </ListItemIcon>
            Profile
          </MenuItem>
          {member.user_id !== user.id &&
            isNotFriend(member.user_id) &&
            isNotPending(member.user_id) && (
              <MenuItem onClick={() => handleAction(ADD)}>
                <ListItemIcon>
                  <PersonAdd color="success" />
                </ListItemIcon>
                Add Friend
              </MenuItem>
            )}
          {role === "owner" &&
            member.user_id !== user.id &&
            member.role === "admin" && (
              <MenuItem onClick={() => handleAction(OWNERSHIP)}>
                <ListItemIcon>
                  <Onwership color="secondary" />
                </ListItemIcon>
                Pass Ownership
              </MenuItem>
            )}

          {member.role !== "admin" &&
            role === "owner" &&
            member.user_id !== user.id && (
              <MenuItem onClick={() => handleAction(ADMIN)}>
                <ListItemIcon>
                  <Admin color="warning" />
                </ListItemIcon>
                Assign Admin
              </MenuItem>
            )}
          {member.role === "admin" &&
            role === "owner" &&
            member.user_id !== user.id && (
              <MenuItem onClick={() => handleAction(DEMOTE)}>
                <ListItemIcon>
                  <Admin color="warning" />
                </ListItemIcon>
                Demote To User
              </MenuItem>
            )}
          {(role === "owner" || (role === "admin" && member.role === "user")) &&
            member.user_id !== user.id && (
              <MenuItem onClick={() => handleAction(KICK)}>
                <ListItemIcon>
                  <Logout color="error" />
                </ListItemIcon>
                Kick
              </MenuItem>
            )}
        </MenuList>

        {/* DIALOG HERE  */}

        <MemberDialog
          setAction={setAction}
          member={member}
          open={open}
          setOpen={setOpen}
          action={action}
        />
      </Menu>
    </Box>
  );
}
