import React from "react";
import "./menu.scss";

export type Props = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Menu = ({ children, ...rest }: Props) => {
  return (
    <nav className={`pro-menu shaped circle`} {...rest}>
      <ul>
        {React.Children.toArray(children)
          .filter(Boolean)
          .map((child, index) =>
            React.cloneElement(child as React.ReactElement, {
              key: index,
            }),
          )}
      </ul>
    </nav>
  );
};

export default Menu;
