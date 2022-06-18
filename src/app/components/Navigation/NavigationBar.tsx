import React from "react";
import { Link, useLocation } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Menu from "../../features/Menu/Menu";
import MenuItem from "../../features/Menu/MenuItem";
import SidebarContent from "../../features/MenuLayout/SidebarContent";
import SidebarFooter from "../../features/MenuLayout/SidebarFooter";
import SidebarHeader from "../../features/MenuLayout/SidebarHeader";
import Sidebar from "../../features/SideBar/Sidebar";
import { menuRoutes } from "../../../constants/menuRoutes.constants";
import { useAppDispatch } from "../../hooks";
import { handleLogout } from "../../features/Login/loginSlice";
import "./navigation.scss";

const NavigationBar = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  let showNavigation = location.pathname !== "/login";
  if (showNavigation) {
    return (
      <div className="d-flex align-items-flex-start">
        <Sidebar>
          <SidebarHeader>
            <div className="sidebar-title">Admin Dasboard</div>
          </SidebarHeader>

          <SidebarContent>
            <Menu>
              {menuRoutes.map((route) => {
                return (
                  <MenuItem key={`${route.name}-navigation`} icon={<route.icon />} active={location.pathname.localeCompare(route.path) == 0 ? true : false}>
                    <Link to={route.path}>{route.name}</Link>
                  </MenuItem>
                );
              })}
            </Menu>
          </SidebarContent>

          <SidebarFooter style={{ textAlign: "center" }}>
            <div className="sidebar-btn-wrapper">
              <span className="sidebar-btn" onClick={() => dispatch(handleLogout())}>
                <span>Logout</span>
                <ExitToAppOutlinedIcon />
              </span>
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
    );
  } else {
    return null;
  }
};

export default NavigationBar;
