import React from "react";
import { Toolbar, Typography, Grid, FormControl, Select, MenuItem, TextField, InputAdornment, Button, IconButton } from "@material-ui/core";
import RotateLeftRoundedIcon from "@material-ui/icons/RotateLeftRounded";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import PermissionLogo from "../../../assets/images/PermissionLogo.svg";
import { handleFilterByChange, handleSearchByChange, clearSerach, handleUserFormPopUp } from "./userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import UserForm from "./UserForm";

const UserTableToolbar = () => {
  const dispatch = useAppDispatch();

  const searchBy = useAppSelector((state) => state.user.searchBy);
  const openPopUp = useAppSelector((state) => state.user.openPopUp);

  return (
    <Toolbar className="toolbar-root">
      <Typography className="toolbar-title" id="tableTitle" component="div">
        <Grid container spacing={2}>
          <Grid className="vertical-align" item>
            <div className="slds-avatar iconBG">
              <img src={PermissionLogo} width="100%" height="100%" className="d-inline-block align-top" alt="user table logo" />
            </div>
          </Grid>
          <Grid item>
            <Grid>
              <Grid className="lineheight-1" item xs={12} md={12}>
                <span className="toolbar-header-title">Users</span>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl margin="dense" className="toolbar-formControl">
                  <Select
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                    defaultValue="All"
                    onChange={(e) => dispatch(handleFilterByChange(e.target.value))}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Recent">Recent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Typography>

      <div className="table-heading-right">
        <Grid>
          <TextField
            className="table-search"
            variant="outlined"
            value={searchBy}
            onChange={(e) => {
              dispatch(handleSearchByChange(e.target.value));
            }}
            placeholder="name.."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid>
          <Button className="table-button" onClick={() => dispatch(clearSerach())} variant="text" color="primary" startIcon={<RotateLeftRoundedIcon />}>
            Refresh
          </Button>
        </Grid>
        <Grid>
          <Button className="table-button" onClick={() => dispatch(handleUserFormPopUp(true))} variant="text" color="primary" startIcon={<AddBoxRoundedIcon />}>
            NEW
          </Button>
        </Grid>
      </div>
      {openPopUp && <UserForm />}
    </Toolbar>
  );
};

export default UserTableToolbar;
