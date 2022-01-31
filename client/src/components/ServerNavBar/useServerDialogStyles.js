import { makeStyles, createStyles } from "@mui/styles";

export const useServerDialogStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiInputBase-root": {
        textAlign: "center",
      },
    },
    avatar: {
      height: "50px",
      width: "50px",
    },
    addButton: {
      marginTop: "0.2em",
      color: "#FFFFFF",
      opacity: "0.8",
      "&:hover": {
        opacity: "1",
      },
    },
    content: {
      width: "500px",
      paddingBottom: "42px",
      overflowY: "hidden",
    },
    dialogPaper: {
      display: "flex",
      height: "auto",
      maxHeight: "80%",
      alignItems: "center",
      borderRadius: "2em",
      textAlign: "center",
      padding: "40px",
      flexDirection: "column",
      justifyContent: "space-evenly",
      overflowY: "auto",
    },
  })
);
