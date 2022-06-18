import React from "react";

export type Props = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};

const SidebarFooter = ({ children, className, ...rest }: Props) => {
  return (
    <div className="pro-sidebar-footer" {...rest}>
      {children}
    </div>
  );
};

export default SidebarFooter;
