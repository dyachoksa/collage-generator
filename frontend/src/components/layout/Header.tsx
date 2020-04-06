import * as React from "react";
import { useState } from "react";
import classNames from "classnames";

import { useAuth } from "~/hooks";

import { NavItem } from "~/components/ui";
import { AccountDropdown } from "~/components/blocks";
import { Logo } from "~/components/elements";

export const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setOpen(prevState => !prevState)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={classNames({ hidden: isOpen, "inline-flex": !isOpen })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={classNames({ hidden: !isOpen, "inline-flex": isOpen })}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:justify-start">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="hidden sm:block sm:ml-4">
              <div className="flex">
                <NavItem to="/">Home</NavItem>
                {isAuthenticated && (
                  <>
                    <NavItem to="/collages">Collages</NavItem>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex">
            {!isAuthenticated && (
              <div className="hidden sm:block">
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/register">Register</NavItem>
              </div>
            )}
            {isAuthenticated && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <AccountDropdown />
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className={classNames({ block: isOpen, hidden: !isOpen }, ["sm:hidden"])}>
        <div className="-mt-1 px-2 pt-2 pb-3">
          <NavItem to="/" isMobile>
            Home
          </NavItem>
          {isAuthenticated && (
            <NavItem to="profile" isMobile>
              Profile
            </NavItem>
          )}
          {!isAuthenticated && (
            <>
              <NavItem to="login" isMobile>
                Login
              </NavItem>
              <NavItem to="register" isMobile>
                Register
              </NavItem>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
