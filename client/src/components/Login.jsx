import { useState, useContext } from "react";
import { login } from "../network/authApi";
import { Avatar, Box, Button, Link, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ServerContext from "../contexts/ServerContext";

const useStyles = makeStyles({
  login: {
    margin: "auto auto",
    border: "2px solid black",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
    backgroundColor: "rgb(16, 16, 16,0.4)",
    minWidth: "20%",
    height: "40%",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
    minWidth: "80%",
    height: "75%",
  },
});

const Login = () => {
  const { setMode } = useContext(ServerContext);
  const [input, setInput] = useState({ username: "", password: "" });
  const classes = useStyles();

  const register = () => {
    setMode("REGISTER");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(input);
    setInput((prev) => ({ ...prev, password: "" }));
  };

  return (
    <Stack className={classes.login}>
      <Avatar
        alt="Disnode"
        src="/images/Disnode-red.png"
        sx={{ width: 75, height: 75 }}
      ></Avatar>
      <b>Log In</b>
      <Box component="form" onSubmit={handleLogin} className={classes.main}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          autoFocus
          value={input.username}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <TextField
          required
          fullWidth
          label="Password"
          type="password"
          value={input.password}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, password: e.target.value }))
          }
          sx={{ margin: "10px 0px" }}
        />
        <Button
          variant="contained"
          disableRipple
          type="submit"
          sx={{
            color: "white",
            opacity: 0.8,
            "&:hover": { opacity: 1, backgroundColor: "rgb(199, 58, 58,1)" },
            backgroundColor: "rgb(199, 58, 58,0.8)",
          }}
        >
          Sign in
        </Button>
      </Box>

      <b>{"Don't have an account?"}</b>
      <Link
        onClick={register}
        variant="body2"
        sx={{
          textDecoration: "none",
          color: "red",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Sign Up
      </Link>
    </Stack>
  );
};

export default Login;
