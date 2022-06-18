import React from "react";
import SidebarToggler from "../../features/SideBar/SidebarToggler";
import NavigationBar from "../Navigation/NavigationBar";
import { useAppSelector } from "../../hooks";
import "./layout.scss";

export type Props = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Layout = ({ children, ...rest }: Props) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <div>
      {isLoggedIn ? (
        <div className="d-flex align-items-flex-start">
          <NavigationBar />
          <div className="route-body">
            <div className="d-flex">
              <SidebarToggler />
            </div>
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default Layout;
