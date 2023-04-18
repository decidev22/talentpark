import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import Login from "./auth/login";

const NavBar = () => {
  return (
    <div
      className={`flex top-0 sticky w-full h-[100px] text-[35px] font-bold text-black bg-white px-20 py-5 z-[100]`}
    >
      <div className="grid grid-cols-8 gap-4">
        <Link
          href="/"
          className="relative group col-start-2 col-end-3 cursor-pointer"
        >
          <div className="text-gray-800">Talent</div>
          <div className="absolute top-6 left-9 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Park
          </div>
        </Link>

        <div className="col-end-8 col-span-1 text-[18px] flex items-end justify-self-end font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          <Link href="/auth/login">My Account</Link>
        </div>
        <Link
          href="/viewTalent/talentTable"
          className=" cursor-pointer col-end-9 col-span-1 w-[180px] h-[50px] text-[22px] flex items-end font-bold rounded-full text-white bg-gradient-to-r from-blue-500 to-violet-600 items-center justify-center drop-shadow-md"
        >
          View Talents
        </Link>
      </div>
    </div>
  );
};

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <NavBar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
