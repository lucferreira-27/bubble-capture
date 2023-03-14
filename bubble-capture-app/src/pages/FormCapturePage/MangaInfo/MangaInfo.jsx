import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@material-ui/core";

function MangaInfo({ mangaInfo, isLoading, classes }) {
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    };
  
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <Box mt={3}>
            <Paper elevation={3} className={classes.imagePaper}>
              {mangaInfo && mangaInfo.poster && (
                <img
                  src={mangaInfo.poster}
                  alt="Manga Cover"
                  className={classes.coverImage}
                />
              )}
              {!mangaInfo && (
                <Typography align="center">
                  Please insert a manga title or URL from Kitsu or MAL
                </Typography>
              )}
              {mangaInfo && (
                <Box ml={3} flexGrow={1}>
                  <Typography variant="h6" gutterBottom>
                    {mangaInfo.title}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Chapters: {mangaInfo.chapterCount || "Not Avaiblabe"}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Volumes: {mangaInfo.volumeCount || "Not Avaiblabe"}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Published In: {mangaInfo.serialization || "Not Avaiblabe"}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Release: {formatDate(mangaInfo.startDate)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Finish: {mangaInfo.endDate ? formatDate(mangaInfo.endDate) :"Not Avaiblabe"}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Characters: {mangaInfo.characters ? mangaInfo.characters.length : "Not Avaiblabe"}
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        )}
      </Box>
    );
  }
  

export default MangaInfo;
