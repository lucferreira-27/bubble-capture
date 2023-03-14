import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Grid,
    ThemeProvider,
    Container,
    Button,
} from "@material-ui/core";
import { useStyles, theme } from "./styles";
import FolderList from "./FolderList/FolderList";
import MangaInfo from "./MangaInfo/MangaInfo";
import SearchInput from "./SearchInput/SearchInput"
import FolderInput from "./FolderInput/FolderInput"
import { searchManga, findFolder } from "./utils";

function FormCapturePage({ className }) {
    const classes = useStyles();
    const { register, handleSubmit, getValues } = useForm();
    const [mangaInfo, setMangaInfo] = useState(null);
    const [folderLocation, setFolderLocation] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleSearchClick = async () => {
        const title = getValues("title");
        setIsLoading(true);
        try {
          const mangaInfo = await searchManga(title);
          setIsLoading(false);
          setMangaInfo(mangaInfo);
        } catch (error) {
          console.error("Error searching for manga:", error);
          setIsLoading(false);
          mangaInfo.title = title
          mangaInfo.coverImage = `https://via.placeholder.com/300x400.png?text=${title}`
          setMangaInfo(mangaInfo);
        }
      };
      

    const handleFolderFindClick = () => {
        findFolder();
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Container maxWidth="lg">
            <ThemeProvider theme={theme}>
                <form className={`${classes.form} ${className}`} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <h1 className={classes.header}>MANGA REGISTRATION</h1>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <MangaInfo mangaInfo={mangaInfo} isLoading={isLoading} classes={classes} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2} direction="column">
                                <SearchInput register={register} handleSearchClick={handleSearchClick} classes={classes} />
                                <FolderInput register={register} handleFolderFindClick={handleFolderFindClick} classes={classes} />
                            </Grid>
                        </Grid>
                        {folderLocation &&
                            <Grid item xs={12}>
                                <FolderList classes={classes} />
                            </Grid>
                        }
                        <Grid item xs={1}>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                                FINISH
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Container>
    );
}

export default FormCapturePage;
