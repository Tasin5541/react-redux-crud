import React from "react";

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarContent = ({ children, className, ...rest }: Props) => {
  return (
    <div className="pro-sidebar-content" {...rest}>
      {children}
    </div>
  );
};

export default SidebarContent;
