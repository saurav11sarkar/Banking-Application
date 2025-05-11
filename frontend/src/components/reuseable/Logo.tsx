import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <h2 className="text-2xl font-bold text-blue-950">
          <span className="text-red-700">CBI</span> Bank
        </h2>
      </Link>
    </>
  );
};

export default Logo;
