import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(err => console.log(err));
    }

    const menuItems = <React.Fragment>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/appointment">Appointment</Link></li>

        {user && user.uid ? (
            <>
                <li>
                    <Link
                        to="/dashboard"
                        title="Dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
                                : `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
                        }
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <button
                        title="Logout"
                        className="font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl"
                        onClick={handleLogOut}
                    >
                        Logout
                    </button>
                </li>

            </>
        ) : (
            <>
                <li>
                    <Link
                        to="/login"
                        title="Sign in"
                        className={({ isActive }) =>
                            isActive
                                ? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
                                : `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
                        }
                    >
                        Sign in
                    </Link>
                </li>
                <li>
                    <Link
                        to="/register"
                        className={({ isActive }) =>
                            isActive
                                ? `font-medium tracking-wide text-gray-700 transition-colors duration-500 border-b-4 border-b-emerald-600 pb-1`
                                : `font-medium tracking-wide text-gray-700 transition-colors duration-500 hover:text-teal-600 hover:drop-shadow-xl`
                        }
                        title="Sign up"
                    >
                        Sign up
                    </Link>
                </li>
            </>
        )}
    </React.Fragment>

    return (
        <div className="navbar bg-base-100 flex justify-between">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl">General Hospital</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt='' />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <Link className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to='/profile'>Profile</Link></li>

                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;