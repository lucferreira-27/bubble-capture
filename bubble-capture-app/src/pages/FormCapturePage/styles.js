import { makeStyles, createStyles, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#bdbdbd",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        fontFamily: "'Panton', sans-serif",
    },
});

const useStyles = makeStyles((theme) =>
    createStyles({
        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            marginBottom: theme.spacing(2),
        },
        textField: {
            marginBottom: theme.spacing(2),
            "& .MuiInputBase-input": {
                padding: "0.8rem",
                backgroundColor: "#1f1f1f",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                color: "#fff",
                fontSize: "1rem",
                border: "none",
                borderRadius: theme.shape.borderRadius,
            },
            "& .MuiInputBase-input:disabled": {
                backgroundColor: "#1a1a1a",
                color: "gray",
            },
        },
        searchButton: {
            marginTop: "16px",
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(2),
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "2rem",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            transition: "background-color 0.3s ease",
            padding: "0.6rem 1rem",
            color: "#fff",
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
            },
            "&:disabled": {
                color: "gray",
            },
        },
        findFolderButton: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            marginLeft: theme.spacing(2),
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "2rem",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            transition: "background-color 0.3s ease",
            padding: "0.6rem 1rem",
            color: "#fff",
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
            },
            "&:disabled": {
                color: "gray",
            },
        },
        imagePaper: {
            padding: theme.spacing(2),
            background: "#1f1f1f",
            color: "#fff",
            display: "flex",
            alignItems: "center"
        },
        coverImage: {
            height: "auto",
            maxWidth: "100%",
            borderRadius:"borderRadius"
        },
        paperTitle: {
            marginBottom: theme.spacing(2),
        },
        iconButton: {
            marginLeft: theme.spacing(1),
        },
        submitButton: {
            marginTop: theme.spacing(2),
            backgroundColor: "transparent",
            border: `1px solid ${theme.palette.grey[400]}`,
            borderRadius: "2rem",
            textTransform: "uppercase",
            letterSpacing: "0.1rem",
            transition: "background-color 0.3s ease",
            padding: "0.6rem 2rem",
            color: theme.palette.grey[400],
            "&:hover": {
                backgroundColor: theme.palette.grey[400],
                color: "#000",
                fontWeight: "bold"
            },

        },
        header: {
            fontFamily: "'Panton', sans-serif",
            fontSize: "2rem",
            color: "#fff",
            marginBottom: theme.spacing(2),
            textAlign: "center",
        },
        coverImage: {
            marginTop: theme.spacing(2),
            width: "200px",
            height: "auto",
        },
    })
);
export { useStyles, theme };