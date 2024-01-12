import React, { ReactNode } from "react";
import NavLinks from "./components/Navlinks";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <NavLinks />
      {children}
    </div>
  );
}
