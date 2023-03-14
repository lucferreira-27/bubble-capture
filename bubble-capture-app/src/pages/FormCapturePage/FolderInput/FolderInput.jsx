import React from "react";
import {
  Grid,
  TextField,
  Button
} from "@material-ui/core";


function FolderInput({ register, handleFolderFindClick, classes }) {
    return (
      <Grid item xs={12}  container alignItems="flex-end" justifyContent="flex-end">
        <TextField
          label="Path"
          fullWidth
          className={classes.textField}
          {...register("path", { required: true })}
          disabled={true}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.findFolderButton}
          onClick={handleFolderFindClick}
          disabled={true}
        >
          Find Folder
        </Button>
      </Grid>
    );
}

export default FolderInput;
