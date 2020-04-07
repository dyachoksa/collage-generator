import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

import { useAuth } from "~/hooks";
import { User } from "~/models/entities";
import { DropdownLink } from "~/components/ui";

const getDisplayName = (user: User) => user.first_name || user.email;

export const AccountDropdown: React.FC = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const elRef = useRef(null);

  useEffect(() => {
    const handleEvent = e => {
      if (elRef?.current && !elRef?.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
    };
  }, [elRef]);

  const logoutHandler = useCallback(() => {
    logout();
  }, [logout]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="ml-3 relative" ref={elRef}>
      <div>
        <button
          onClick={() => setOpen(prevState => !prevState)}
          className="ml-2 px-3 py-2 rounded-md text-sm font-medium leading-5 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
        >
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
          <span className="pl-1 hidden sm:inline-block">
            {getDisplayName(currentUser)}
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
          <div className="py-1 rounded-md bg-white shadow-xs">
            <DropdownLink to="/profile">Profile</DropdownLink>
            <a
              href="#"
              onClick={logoutHandler}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
