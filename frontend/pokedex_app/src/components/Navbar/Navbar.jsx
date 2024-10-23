
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
    <>
      <nav className="h-16 bg-rose-900 text-center">
        <div className="font-sans text-zinc-950 text-3xl py-4 flex justify-evenly">
          <NavLink to="/Profile">My Profile</NavLink>
          <NavLink to="/">Pokedex</NavLink>
    	    <NavLink to="/Community">
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
                <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 p-4">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-1 text-red-600 hover:text-red-800 focus:outline-none text-sm px-2 py-1 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
