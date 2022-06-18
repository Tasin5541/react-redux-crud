import React from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { handleToggleSidebar } from "./sidebarSlice";
import "./sidebar.scss";

export type Props = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Sidebar = ({ children, ...rest }: Props) => {
  const toggled = useAppSelector((state) => state.sidebar.toggled);
  const dispatch = useAppDispatch();

  return (
    <div className={"pro-sidebar md " + (toggled ? "toggled" : "")} {...rest}>
      <div className="pro-sidebar-inner">
        <div className="pro-sidebar-layout">{children}</div>
      </div>
      <div
        className="overlay"
        onClick={() => dispatch(handleToggleSidebar())}
        onKeyPress={() => dispatch(handleToggleSidebar())}
        role="button"
        tabIndex={0}
        aria-label="overlay"
      />
    </div>
  );
};

export default Sidebar;
