import React from "react";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function SearchInput({ register, handleSearchClick, classes }) {
  return (
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={9}>
        <TextField
          label="Title"
          fullWidth
          className={classes.textField}
          {...register("title", { required: true })}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
        
          variant="contained"
          color="secondary"
          className={classes.searchButton}
          onClick={handleSearchClick}
          style={{ textAlign: "center" }}
          startIcon={<SearchIcon className={classes.iconButton}/>}
        /> 
      </Grid>
    </Grid>
  );
}

export default SearchInput;
