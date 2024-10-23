import { NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import AuthContext from "../../AuthContext"; // Update with your actual path

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log(isAuthenticated);
  console.log(user);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <nav className="h-12 bg-[#1C79C0] shadow-lg">
      {" "}
      {/* Pokémon blue background color */}
      <div className="font-sans text-white text-2xl flex justify-between items-center px-4 md:px-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold"
              : "hover:text-yellow-400 transition duration-300"
          }
        >
          Pokedex
        </NavLink>
        <NavLink
          to="/Community"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold"
              : "hover:text-yellow-400 transition duration-300"
          }
        >
          Community
        </NavLink>

        {!isAuthenticated && (
          <NavLink to="/Login" className="hover:text-white">
            Login | Signup
          </NavLink>
        )}

        {isAuthenticated && (
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <img
                src={`data:image/jpeg;base64,${user.profile_pic}`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white" // Circle profile image
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 bg-[#1C79C0] shadow-lg rounded-lg mt-2 p-4">
                <p className="text-3xl font-semibold">{user.name}</p>
                <NavLink
                  to="/Profile"
                  className="text-white font-semibold hover:text-yellow-400 transition duration-300"
                >
                  My Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className=" mt-1 text-2xl text-slate-900 font-bold hover:text-slate-400 focus:outline-none px-2 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
