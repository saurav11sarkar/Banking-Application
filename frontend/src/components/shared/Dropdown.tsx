// import React from "react";
// import Link from "next/link";
// import { IUser } from "@/types";

// interface DropdownProps {
//   user: IUser; // Replace 'any' with your user type
// }

// const Dropdown: React.FC<DropdownProps> = ({ user }) => {
//   return (
//     <div className="relative">
//       <button className="text-blue-950 font-semibold">
//         {user.name || "User"}
//       </button>
//       <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
//         <Link
//           href="/profile"
//           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//         >
//           Profile
//         </Link>
//         <Link
//           href="/settings"
//           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//         >
//           Settings
//         </Link>
//         <Link
//           href="/logout"
//           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//         >
//           Logout
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;
