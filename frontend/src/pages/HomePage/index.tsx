import * as React from "react";
import { useState } from "react";
import { Link, RouteComponentProps } from "@reach/router";

import { useAuth } from "~/hooks";
import { BlankPageLayout, Footer } from "~/components/layout";
import { Logo } from "~/components/elements";

type Props = RouteComponentProps & {};

export const HomePage: React.FC<Props> = () => {
  const [isOpen, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <BlankPageLayout>
      <div className="h-full flex flex-col relative bg-gray-100">
        <div className="max-w-screen-xl mx-auto lg:h-full">
          <div className="relative z-10 pb-8 bg-gray-100 sm:pb-16 md:pb-20 lg:h-full lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to={isAuthenticated ? "/collages" : "/"}>
                      <Logo />
                    </Link>
                    <div className="-mr-2 flex items-center md:hidden">
                      <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                      >
                        <svg
                          className="h-6 w-6"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-2 md:pr-4">
                  <Link
                    to="/"
                    className="ml-8 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                  >
                    Home
                  </Link>
                  <a
                    href="#"
                    className="ml-8 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-150 ease-in-out"
                  >
                    Features
                  </a>
                  <Link
                    to={isAuthenticated ? "/collages" : "/login"}
                    className="ml-8 font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none focus:text-indigo-700 transition duration-150 ease-in-out"
                  >
                    {isAuthenticated ? "My collages" : "Log in"}
                  </Link>
                </div>
              </nav>
            </div>

            {isOpen && (
              <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-md">
                  <div className="rounded-lg bg-white shadow-xs overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <Logo />
                      </div>
                      <div className="-mr-2">
                        <button
                          onClick={() => setOpen(false)}
                          type="button"
                          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                          <svg
                            className="h-6 w-6"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="px-2 pt-1 pb-3">
                      <Link
                        to="/"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        Home
                      </Link>
                      <a
                        href="#"
                        className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
                      >
                        Features
                      </a>
                    </div>
                    <div>
                      <Link
                        to={isAuthenticated ? "/collages" : "/login"}
                        className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
                      >
                        {isAuthenticated ? "My collages" : "Log in"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-10 mx-auto h-full max-w-screen-xl px-4 flex items-center justify-center sm:mt-12 sm:px-6 md:mt-16 lg:mt-0 lg:px-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none lg:text-6xl">
                  Everything you need to build
                  <br />
                  <span className="text-indigo-600">beautiful collages</span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 lg:text-xl lg:mx-0">
                  Just add more than 3 of your images and enjoy!
                </p>
                <div className="mt-5 flex justify-center sm:mt-8 lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to={isAuthenticated ? "/collages" : "/register"}
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:text-white hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      {isAuthenticated ? "Go to my collages" : "Register"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-100 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>
        <div className="flex-grow lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1692&q=80"
            alt="Photos"
          />
        </div>
      </div>

      <Footer />
    </BlankPageLayout>
  );
};
