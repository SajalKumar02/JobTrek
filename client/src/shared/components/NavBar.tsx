import { Link, Outlet } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../app/providers/AuthProvider';

const NavBar = () => {
  const { logOut, authenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div>
      <nav className="w-full bg-white shadow py-4 px-8 flex justify-center">
        <ul className="flex space-x-8 items-center">
          <li>
            <Link to="/" className="text-blue-600 hover:underline font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-green-600 hover:underline font-semibold">
              Register
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-purple-600 hover:underline font-semibold">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-yellow-600 hover:underline font-semibold">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="text-red-600 hover:underline font-semibold">
              Jobs
            </Link>
          </li>
          {authenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-semibold px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
              >
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
