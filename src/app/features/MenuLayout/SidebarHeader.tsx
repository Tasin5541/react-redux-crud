import React from "react";

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarHeader = ({ children, className, ...rest }: Props) => {
  return (
    <div className="pro-sidebar-header" {...rest}>
      {children}
    </div>
  );
};

export default SidebarHeader;
