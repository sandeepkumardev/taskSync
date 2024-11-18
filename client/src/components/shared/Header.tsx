"use server";

import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div className="p-1 md:p-2 border-b-2 flex justify-between">
      <h1 className="text-2xl font-bold">vRoom</h1>

      <ModeToggle />
    </div>
  );
};

export default Header;
