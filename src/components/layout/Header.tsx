import React, { ComponentType, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";
import { useRecoilState } from "recoil";
import {
  userState,
  handleSignInCompleted,
  logoutUser,
  isLoggingInState,
} from "@/store/index";
import { IoMdPerson } from "react-icons/io";
import styles from "@/layoutstyles/header.module.scss";

/*
 * We want to use the pwa-auth web component strictly as a client side React component
 * so we'll make use of the the wc-react wrapper module and load the component using
 * Next.js's dynamic function.
 */
const PwaAuthComponent: ComponentType<PwaAuthProps> = dynamic(
  () =>
    import("wc-react").then((mod) => {
      import("@pwabuilder/pwaauth");
      return mod.wrapWc<PwaAuthProps>("pwa-auth");
    }),
  {
    ssr: false,
  }
);

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const [isAuthenticating, setIsAuthenticating] = useRecoilState(
    isLoggingInState
  );

  const toggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpen((prev) => !prev);
  };

  const toggleUserMenuAlt = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    setMenuOpen((prev) => !prev);
  };

  const closeUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(false);
  };

  const handleLogin = async (result: CustomEvent<SignInResult>) => {
    setIsAuthenticating(true);
    await handleSignInCompleted((result as unknown) as SignInResult, setUser);
    setIsAuthenticating(false);
  };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    await logoutUser(setUser);
    closeUserMenu(event);
  };

  return (
    <header className="bg-indigo-700 text-gray-900 text-center w-full">
      <div className="flex items-center justify-between mx-auto py-3 w-11/12 lg:max-w-screen-xl">
        <div className="flex items-center">
          <Link href="/">
            <a className="mr-2 sm:mr-3">
              <img src="/logo.png" alt="Logo" />
            </a>
          </Link>
          <h1 className="font-normal text-2xl m-0">
            <Link href="/">
              <a className="text-gray-200 hover:text-white focus:text-white">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </a>
            </Link>
          </h1>
        </div>

        {user ? (
          <div className="relative right-0 rounded-full hover:shadow-lg">
            {user.data.imageUrl ? (
              <img
                className="rounded-full h-9 w-9 cursor-pointer"
                src={user.data.imageUrl}
                onClick={toggleUserMenu}
                alt="Pic"
              />
            ) : (
              <IoMdPerson
                className="w-8 h-8 p-2 cursor-pointer bg-indigo-500 text-white rounded-full"
                onClick={toggleUserMenuAlt}
              />
            )}
            {isMenuOpen && (
              <button
                tabIndex={-1}
                onClick={closeUserMenu}
                className="fixed inset-0 h-full w-full bg-black opacity-25 cursor-default"
              ></button>
            )}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded pt-3 pb-1 shadow-xl z-50">
                <div className="text-center leading-relaxed pb-4 border-b">
                  <div className="text-gray-800 text-sm font-semibold">
                    {user.data.name}
                  </div>
                  <div className="text-gray-700 text-xs">{user.data.email}</div>
                </div>
                <div
                  className="pt-2 pb-2 px-4 cursor-pointer text-sm"
                  onClick={handleLogout}
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles["auth-control"]}>
            <PwaAuthComponent
              googleKey={process.env.NEXT_PUBLIC_GOOGLE_KEY}
              signInButtonText={isAuthenticating ? "..." : "Log In"}
              signInCompleted={handleLogin}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
