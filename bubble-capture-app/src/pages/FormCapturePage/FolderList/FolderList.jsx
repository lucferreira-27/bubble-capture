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

function FolderList({ folderPath,classes }) {

    return (
        <Box mt={3}>
            <Paper elevation={3} className={classes.listPaper}>
                <List component="nav">
                    <ListItem button>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="File 1" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="File 2" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="File 3" />
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
}

export default FolderList;
