import React from "react";
import {
    Box,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import { Folder as FolderIcon } from "@material-ui/icons";

function FolderList({ folder, classes }) {

    return (
        <Box mt={3}>
            <Paper elevation={3} className={classes.listPaper}>
                <List component="nav">
                    {
                        folder.listFiles.map(({path}) => {
                            <ListItem button>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary={path} />
                            </ListItem>
                        })
                    }
                </List>
            </Paper>
        </Box>
    );
}

export default FolderList;
