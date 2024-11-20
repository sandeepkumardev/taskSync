"use server";

import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div className="p-1 md:p-2 border-b-2 flex justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">TaskSync</h1>
      </div>

      <ModeToggle />
    </div>
  );
};

export default Header;
