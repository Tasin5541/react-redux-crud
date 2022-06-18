import React from "react";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { handleToggleSidebar } from "../../features/SideBar/sidebarSlice";
import { useAppDispatch } from "../../hooks";

const SidebarToggler = () => {
  const dispatch = useAppDispatch();
  return (
    <IconButton className="btn-toggle" onClick={() => dispatch(handleToggleSidebar())} color="primary" aria-label="toggle sidebar" component="span">
      <MenuIcon />
    </IconButton>
  );
};

export default SidebarToggler;
