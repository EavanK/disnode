import { makeStyles, createStyles } from "@mui/styles";

export const useDisButtonStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
      height: "100%",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    submit: {
      color: "white",
      borderRadius: ".8em",
      backgroundColor: "#7a211b",
      "&:hover": {
        backgroundColor: "#635c5b",
      },
    },
    create: {
      color: "white",
      borderRadius: ".8em",
      backgroundColor: "#7a211b",
      "&:hover": {
        backgroundColor: "#635c5b",
      },
    },
    cancel: {
      color: "#7a211b",
      borderRadius: ".8em",
      border: "1px solid #7a211b",
    },
  })
);
