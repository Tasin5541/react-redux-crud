import React from "react";

export type Props = React.LiHTMLAttributes<HTMLLIElement> & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
};

const MenuItem = ({ children, icon, active, ...rest }: Props) => {
  return (
    <li className={"pro-menu-item " + (active ? "active" : "")} {...rest}>
      <div className="pro-inner-item" tabIndex={0} role="button">
        {icon ? (
          <span className="pro-icon-wrapper">
            <span className="pro-icon">{icon}</span>
          </span>
        ) : null}
        <span className="pro-item-content">{children}</span>
      </div>
    </li>
  );
};

export default MenuItem;
