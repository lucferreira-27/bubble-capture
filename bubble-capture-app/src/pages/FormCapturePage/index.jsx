import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Grid,
    TextField,
    Button,
    createTheme,
    ThemeProvider,
    makeStyles,
    createStyles,
    Box,
    Typography,
    CircularProgress, // Import the CircularProgress component
} from "@material-ui/core";
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
        },
        autoCompleteButton: {
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
                color: "#fff",
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

function FormCapturePage({ className }) {
    const classes = useStyles();
    const { register, handleSubmit, getValues } = useForm();
    const [coverImage, setCoverImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add state for loading indicator

    const handleAutoCompleteClick = () => {
        const title = getValues("title");
        setIsLoading(true);
        fetch(`https://via.placeholder.com/300x400.png?text=${title}`,{
            mode: 'no-cors'
          })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error(response);
                }
                return response.blob();
            })
            .then((blob) => {
                setIsLoading(false);
                setCoverImage(URL.createObjectURL(blob));
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
                setIsLoading(false);
                setCoverImage(`https://via.placeholder.com/300x400.png?text=${title}`);
            });
    };

    const handleFolderFindClick = () => {
        // Placeholder function to handle folder find button click
        console.log("Folder find clicked!");
    };

    const onSubmit = (data) => {
        // Placeholder function to handle form submission
        console.log(data);
    };

    return (
        <ThemeProvider theme={theme}>
            <form className={`${classes.form} ${className}`} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h1 className={classes.header}>MANGA REGISTRATION</h1>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Title" fullWidth className={classes.textField} {...register("title", { required: true })} />
                        <Button variant="contained" color="secondary" className={classes.autoCompleteButton} onClick={handleAutoCompleteClick}>
                            Auto-Complete
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Path" fullWidth className={classes.textField} {...register("path", { required: true })} />
                        <Button variant="contained" color="primary" className={classes.autoCompleteButton} onClick={handleFolderFindClick}>
                            Find Folder
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        {isLoading ? ( // Render the loading indicator conditionally
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <CircularProgress />
                            </Box>
                        ) : (
                            coverImage && (
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img src={coverImage} alt="Manga Cover" className={classes.coverImage} />
                                </Box>
                            )
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth className={classes.submitButton}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>
    );
}

export default FormCapturePage;
