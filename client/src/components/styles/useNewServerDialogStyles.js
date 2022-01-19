import { makeStyles, createStyles } from "@mui/styles";

export const useNewServerDialogStyles = makeStyles((theme) =>
  createStyles({
    addButton: {
      color: "#FFFFFF",
      // backgroundColor: "inherit",
      "&:hover": {
        color: "gray",
        // backgroundColor: "inherit",
      },
    },
    root: {
      // color: "#FFFFFF",
      "& .MuiInputBase-root": {
        width: "500px",
        // color: "#FFF", // or black
        textAlign: "center",
      },
    },
    content: {
      // color: "#FFFFFF",
      width: "500px",
      paddingBottom: "42px",
      overflowY: "hidden",
    },
    dialogPaper: {
      display: "flex",
      alignItems: "center",
      borderRadius: "2em",
      // backgroundColor: "#040B0C",
      // color: "#FFFFFF",
      textAlign: "center",
      padding: "40px 20px",
      paddingTop: "25px",
      flexDirection: "column",
      justifyContent: "space-evenly",
      overflow: "hidden",
    },
  })
);
