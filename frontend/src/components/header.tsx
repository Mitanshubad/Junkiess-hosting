// import { Link } from "react-router-dom";
// import {
//   FaSearch,
//   FaShoppingBag,
//   FaSignInAlt,
//   FaUser,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { useState } from "react";
// import { User } from "../types/types";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// import toast from "react-hot-toast";

// interface PropsType {
//   user: User | null;
// }

// const Header = ({ user }: PropsType) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const logoutHandler = async () => {
//     try {
//       await signOut(auth);
//       toast.success("Sign Out Successfully");
//       setIsOpen(false);
//     } catch (error) {
//       toast.error("Sign Out Fail");
//     }
//   };

//   return (
//     <nav className="header">
//       <Link to="">
//         <img src="https://www.linkedin.com/dms/prv/vid/v2/D5606AQFz_jZU3dHg4g/messaging-attachmentFile/messaging-attachmentFile/0/1724434169994?m=AQJ0KY-8I3IAywAAAZGASdkjDOO4fT1s5jDuzR7REYkKrC-qY60WJgaEiQ&ne=1&v=beta&t=X69VJBH5FdZFhhjJaJW58CUiWBGM1_3As8TAUl1SFUg" alt="e"  className="h-20 rotate-90" />
//       </Link>

//       <Link onClick={() => setIsOpen(false)} to={"/"}>
//         HOME
//       </Link>
//       <Link onClick={() => setIsOpen(false)} to={"/search"}>
//         <FaSearch />
//       </Link>
//       <Link onClick={() => setIsOpen(false)} to={"/cart"}>
//         <FaShoppingBag />
//       </Link>

//       {user?._id ? (
//         <>
//           <button onClick={() => setIsOpen((prev) => !prev)}>
//             <FaUser />
//           </button>
//           <dialog open={isOpen}>
//             <div>
//               {user.role === "admin" && (
//                 <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
//                   Admin
//                 </Link>
//               )}

//               <Link onClick={() => setIsOpen(false)} to="/orders">
//                 Orders
//               </Link>
//               <button onClick={logoutHandler}>
//                 <FaSignOutAlt />
//               </button>
//             </div>
//           </dialog>
//         </>
//       ) : (
//         <Link to={"/login"}>
//           <FaSignInAlt />
//         </Link>
//       )}
//     </nav>
//   );
// };

// export default Header;
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaUser,
  FaSignOutAlt,
 
} from "react-icons/fa";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-2 bg-white header">
      {/* Logo aligned to the left with blend effect and better margin */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center ml-8">
          <img
            src="https://www.linkedin.com/dms/prv/vid/v2/D5606AQEALk96m45jkg/messaging-attachmentFile/messaging-attachmentFile/0/1724440108957?m=AQJErCbnUarlhAAAAZGAo-z0Q98c7vHBWJJ6wl6iN9uQO9jKNQC1bMtEmA&ne=1&v=beta&t=GcrsBw2hlhsgNr_eKxuOJx4pFtG88zW3bAvfQ6lxOGQ"
            alt="e"
            className="h-24 mix-blend-multiply object-contain rotate-90"
          />
        </Link>
      </div>

      {/* Centered Home Icon with margin */}
      {/* <div className="flex items-center">
        <Link
          onClick={() => setIsOpen(false)}
          to={"/"}
          className="text-xl mx-4"
        >
          <FaHome />
        </Link>
      </div> */}

      {/* Icons aligned to the right with consistent spacing */}
      <div className="flex items-center space-x-6">
        <Link onClick={() => setIsOpen(false)} to={"/search"} className="text-xl">
          <FaSearch />
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"} className="text-xl">
          <FaShoppingBag />
        </Link>

        {user?._id ? (
          <>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-xl"
            >
              <FaUser />
            </button>
            <dialog
              open={isOpen}
              className="fixed top-16 right-4 bg-white text-black p-4 rounded shadow-lg"
            >
              <div className="space-y-2">
                {user.role === "admin" && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/admin/dashboard"
                    className="block"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/orders"
                  className="block"
                >
                  Orders
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center space-x-2 text-red-500"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"} className="text-xl">
            <FaSignInAlt />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
