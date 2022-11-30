import React from "react";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
