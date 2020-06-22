import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="flex-initial flex-wrap border-t bg-white text-center">
      <div className="mx-auto pb-4 w-11/12 lg:max-w-screen-lg pt-5 text-xs text-gray-600">
        <span className="mr-2">
          &copy; {new Date().getUTCFullYear()}{" "}
          <a
            href="https://owanhunte.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Owan Hunte
          </a>
          . All Rights Reserved.
        </span>
        <Link href="/support/privacy-policy">
          <a className="mr-2">Privacy Policy</a>
        </Link>
        <Link href="/support/terms-of-service">
          <a className="mr-2">Terms of Service</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
