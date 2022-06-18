import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { createUserData, handleUserFormPopUp, createUser, updateUser, userData } from "./userSlice";
import "./userForm.scss";

const UserForm = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, reset } = useForm<createUserData>();

  const openPopUp = useAppSelector((state) => state.user.openPopUp);
  const selectedUserData = useAppSelector((state) => state.user.selectedUserData);

  const onSubmitCreateUser: SubmitHandler<createUserData> = (data) => {
    if (!selectedUserData) {
      let createUserData: createUserData = {
        name: data.name,
        email: data.email,
        website: data.website,
      };
      dispatch(createUser(createUserData));
    } else {
      let userData: userData = {
        id: selectedUserData.id,
        name: data.name,
        email: data.email,
        website: data.website,
      };
      dispatch(updateUser(userData));
    }
  };

  return (
    <Dialog
      open={openPopUp}
      onClose={() => {
        reset();
        dispatch(handleUserFormPopUp(false));
      }}
      keepMounted={false}
      scroll={"paper"}
      fullWidth
      maxWidth="md"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle className="form-header" id="scroll-dialog-title">
        <span className="mr-auto">{(selectedUserData ? "Update" : "Create New") + " User"}</span>
        <Button id="cancel-button" onClick={() => dispatch(handleUserFormPopUp(false))} startIcon={<CloseRoundedIcon />} color="primary">
          CANCEL
        </Button>
        <Button id="save-button" form="createUser" type="submit" startIcon={<SaveRoundedIcon />} color="primary">
          {selectedUserData ? "Update" : "SAVE"}
        </Button>
      </DialogTitle>
      <DialogContent dividers id="scroll-dialog-description" tabIndex={-1}>
        <form id="createUser" onSubmit={handleSubmit(onSubmitCreateUser)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                className="form-control"
                defaultValue={selectedUserData ? selectedUserData.name : null}
                id="Name"
                type="text"
                inputProps={{
                  maxLength: 100,
                }}
                placeholder="max length 100"
                label="Name"
                margin="dense"
                variant="outlined"
                {...register("name")}
                name="name"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                className="form-control"
                defaultValue={selectedUserData ? selectedUserData.website : null}
                id="Website"
                type="text"
                inputProps={{
                  maxLength: 100,
                }}
                placeholder="max length 100"
                label="Website"
                margin="dense"
                variant="outlined"
                {...register("website")}
                name="website"
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                className="form-control"
                defaultValue={selectedUserData ? selectedUserData.email : null}
                inputProps={{
                  maxLength: 100,
                }}
                placeholder="max length 100"
                id="Email"
                type="email"
                label="Email"
                margin="dense"
                variant="outlined"
                {...register("email")}
                name="email"
                required
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
