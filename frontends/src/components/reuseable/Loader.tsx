"use client";
// import { Loader2 } from "lucide-react";
// import React from "react";

// const Loader = () => {
//   return (
//     <div className="flex justify-center items-center h-screen">
//       <Loader2 className="animate-spin h-10 w-10" />
//       <h2 className="text-2xl font-bold">Loading...</h2>
//     </div>
//   );
// };

// export default Loader;

import React from "react";

const Loader = () => {
  return (
    <>
      <style jsx global>
        {`
          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 10;
            width: 160px;
            height: 100px;
            margin-left: -80px;
            margin-top: -50px;
            border-radius: 5px;
            background: #1e3f57;
            animation: dot1_ 3s cubic-bezier(0.55, 0.3, 0.24, 0.99) infinite;
          }

          .loader:nth-child(2) {
            z-index: 11;
            width: 150px;
            height: 90px;
            margin-top: -45px;
            margin-left: -75px;
            border-radius: 3px;
            background: #3c517d;
            animation-name: dot2_;
          }

          .loader:nth-child(3) {
            z-index: 12;
            width: 40px;
            height: 20px;
            margin-top: 50px;
            margin-left: -20px;
            border-radius: 0 0 5px 5px;
            background: #6bb2cd;
            animation-name: dot3_;
          }

          @keyframes dot1_ {
            3%,
            97% {
              width: 160px;
              height: 100px;
              margin-top: -50px;
              margin-left: -80px;
            }

            30%,
            36% {
              width: 80px;
              height: 120px;
              margin-top: -60px;
              margin-left: -40px;
            }

            63%,
            69% {
              width: 40px;
              height: 80px;
              margin-top: -40px;
              margin-left: -20px;
            }
          }

          @keyframes dot2_ {
            3%,
            97% {
              height: 90px;
              width: 150px;
              margin-left: -75px;
              margin-top: -45px;
            }

            30%,
            36% {
              width: 70px;
              height: 96px;
              margin-left: -35px;
              margin-top: -48px;
            }

            63%,
            69% {
              width: 32px;
              height: 60px;
              margin-left: -16px;
              margin-top: -30px;
            }
          }

          @keyframes dot3_ {
            3%,
            97% {
              height: 20px;
              width: 40px;
              margin-left: -20px;
              margin-top: 50px;
            }

            30%,
            36% {
              width: 8px;
              height: 8px;
              margin-left: -5px;
              margin-top: 49px;
              border-radius: 8px;
            }

            63%,
            69% {
              width: 16px;
              height: 4px;
              margin-left: -8px;
              margin-top: -37px;
              border-radius: 10px;
            }
          }
        `}
      </style>
      <div className="flex justify-center items-center h-screen">
        <div className="container">
          <div className="loader"></div>
          <div className="loader"></div>
          <div className="loader"></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
