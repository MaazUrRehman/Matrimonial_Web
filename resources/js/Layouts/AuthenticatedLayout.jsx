import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user; // Safe access

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Check if user is admin
    const isAdmin = user?.email === 'admin@gmail.com';
    // Check if user is logged in (any user including admin)
    const isLoggedIn = !!auth?.user;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-100 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 justify-between">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center space-x-3 group">
                                    <div className="relative">
                                        <ApplicationLogo className="block h-12 w-auto fill-current text-maroon-700 transition-transform duration-300 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                                    </div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-maroon-700 to-maroon-900 bg-clip-text text-transparent">
                                        PerfectMatch
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-1 sm:-my-px sm:ms-12 sm:flex">
                                {/* Home/Dashboard link - show for all logged in users */}
                                {isLoggedIn && (
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                        className="relative px-6 py-2 font-semibold text-maroon-700 hover:text-maroon-900 transition-all duration-300 hover:bg-maroon-50 rounded-lg group"
                                    >
                                        <span className="relative z-10">Home</span>
                                        {route().current('dashboard') && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full"></div>
                                        )}
                                    </NavLink>
                                )}
                                
                                {/* Partner tab - show for regular logged in users (not admin) */}
                                {isLoggedIn && !isAdmin && (
                                    <NavLink
                                        href={route('candidateProfile.candidatesList.index')}
                                        active={route().current('candidateProfile.candidatesList.index')}
                                        className="relative px-6 py-2 font-semibold text-maroon-700 hover:text-maroon-900 transition-all duration-300 hover:bg-maroon-50 rounded-lg group"
                                    >
                                        <span className="relative z-10">Partner</span>
                                        {route().current('candidateProfile.candidatesList.index') && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full"></div>
                                        )}
                                    </NavLink>
                                )}

                                {/* Candidate tab - show only for admin */}
                                {isAdmin && (
                                    <NavLink
                                        href={route('admin.candidatesList.index')}
                                        active={route().current('admin.candidatesList.index')} 
                                        className="relative px-6 py-2 font-semibold text-maroon-700 hover:text-maroon-900 transition-all duration-300 hover:bg-maroon-50 rounded-lg group"
                                    >
                                        <span className="relative z-10">Candidate</span>
                                        {route().current('admin.candidatesList.index') && ( /* Update this condition to match your candidate route */
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-maroon-600 to-maroon-800 rounded-full"></div>
                                        )}
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* Conditional rendering based on authentication */}
                        <div className="hidden sm:flex sm:items-center sm:space-x-8">
                            {!isLoggedIn ? (
                                // User is not logged in - show login/register buttons
                                <div className="flex items-center space-x-8">
                                    <NavLink
                                        href={route('login')}
                                        active={route().current('login')}
                                        className="px-4 py-2 font-semibold text-maroon-700 hover:text-maroon-900 transition-all duration-300 hover:bg-maroon-50 rounded-lg"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink
                                        href={route('register')}
                                        active={route().current('register')}
                                        className="px-4 py-2 font-semibold text-maroon-700 hover:text-maroon-900 transition-all duration-300 hover:bg-maroon-50 rounded-lg"
                                    >
                                        Register
                                    </NavLink>
                                </div>
                            ) : isAdmin ? (
                                // Admin user
                                <div className="flex items-center space-x-8">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-maroon-800 transition-all duration-300 ease-in-out hover:bg-maroon-50 hover:border-maroon-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-opacity-20"
                                                >
                                                    <div className="w-9 h-9 bg-gradient-to-br from-maroon-600 to-maroon-800 rounded-full flex items-center justify-center mr-3 shadow-sm">
                                                        <span className="text-white font-bold text-sm">
                                                            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                                                        </span>
                                                    </div>
                                                    <span className="mr-2">Admin</span>
                                                    <svg
                                                        className="-me-0.5 ms-1 h-4 w-4 text-maroon-600 transition-transform duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content className="bg-white border border-gray-100 shadow-xl rounded-xl mt-2 py-2 min-w-[200px]">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <div className="text-sm font-semibold text-maroon-800">{user?.name || 'Admin'}</div>
                                                <div className="text-xs text-gray-500 mt-1">Administrator</div>
                                            </div>

                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="px-4 py-3 text-sm text-maroon-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 group"
                                            >
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign Out
                                                </div>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            ) : (
                                // Regular user (not admin)
                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-semibold text-maroon-800 transition-all duration-300 ease-in-out hover:bg-maroon-50 hover:border-maroon-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-opacity-20"
                                                >
                                                    <div className="w-9 h-9 bg-gradient-to-br from-maroon-600 to-maroon-800 rounded-full flex items-center justify-center mr-3 shadow-sm">
                                                        <span className="text-white font-bold text-sm">
                                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                        </span>
                                                    </div>
                                                    <span className="mr-2">{user?.name || 'User'}</span>
                                                    <svg
                                                        className="-me-0.5 ms-1 h-4 w-4 text-maroon-600 transition-transform duration-200"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content className="bg-white border border-gray-100 shadow-xl rounded-xl mt-2 py-2 min-w-[200px]">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <div className="text-sm font-semibold text-maroon-800">{user?.name || 'User'}</div>
                                            </div>

                                            <Dropdown.Link
                                                href={route('candidateProfile.index')}
                                                className="px-4 py-3 text-sm text-maroon-600 hover:bg-maroon-50 hover:text-maroon-900 transition-colors duration-200 group"
                                            >
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-3 text-maroon-600 group-hover:text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Profile
                                                </div>
                                            </Dropdown.Link>

                                            <div className="border-t border-gray-100 my-1"></div>

                                            <Dropdown.Link
                                                href={route('logout')}
                                                method="post"
                                                as="button"
                                                className="px-4 py-3 text-sm text-maroon-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 group"
                                            >
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign Out
                                                </div>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-xl p-2.5 text-maroon-700 transition-all duration-300 ease-in-out hover:bg-maroon-50 hover:text-maroon-900 focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:ring-opacity-20"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden bg-white border-t border-gray-100 shadow-lg'
                    }
                >
                    <div className="px-4 py-3 space-y-1">
                        {/* Mobile navigation links with same conditional logic */}
                        {isLoggedIn && (
                            <ResponsiveNavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className="px-4 py-3 text-base font-semibold text-maroon-800 hover:bg-maroon-50 hover:text-maroon-900 rounded-lg transition-colors duration-200"
                            >
                                Home
                            </ResponsiveNavLink>
                        )}
                        
                        {/* Partner tab for regular users in mobile */}
                        {isLoggedIn && !isAdmin && (
                            <ResponsiveNavLink
                                href={route('candidateProfile.candidatesList.index')}
                                active={route().current('candidateProfile.candidatesList.index')}
                                className="px-4 py-3 text-base font-semibold text-maroon-800 hover:bg-maroon-50 hover:text-maroon-900 rounded-lg transition-colors duration-200"
                            >
                                Partner
                            </ResponsiveNavLink>
                        )}

                        {/* Candidate tab for admin in mobile */}
                        {isAdmin && (
                            <ResponsiveNavLink
                                href={route('login')} 
                                active={route().current('login')}
                                className="px-4 py-3 text-base font-semibold text-maroon-800 hover:bg-maroon-50 hover:text-maroon-900 rounded-lg transition-colors duration-200"
                            >
                                Candidate
                            </ResponsiveNavLink>
                        )}
                    </div>

                    {/* Mobile menu conditional rendering */}
                    {isLoggedIn ? (
                        // Mobile menu for logged in user
                        <div className="border-t border-gray-100 px-4 py-4">
                            <div className="mb-4">
                                <div className="text-base font-bold text-maroon-800">{user?.name || 'User'}</div>
                                {isAdmin && (
                                    <div className="text-sm text-gray-500 mt-1">Administrator</div>
                                )}
                            </div>

                            <div className="space-y-2">
                                {/* Show Profile link only for regular users */}
                                {!isAdmin && (
                                    <ResponsiveNavLink
                                        href={route('candidateProfile.index')}
                                        className="px-4 py-3 text-sm text-maroon-700 hover:bg-maroon-50 hover:text-maroon-900 rounded-lg transition-colors duration-200 flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Profile
                                    </ResponsiveNavLink>
                                )}
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    className="px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200 flex items-center w-full text-left"
                                >
                                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        // Mobile menu for guest users
                        <div className="border-t border-gray-100 px-4 py-4 space-y-2">
                            <ResponsiveNavLink
                                href={route('login')}
                                className="px-4 py-3 text-base font-semibold text-maroon-700 hover:bg-maroon-50 hover:text-maroon-900 rounded-lg transition-colors duration-200"
                            >
                                Login
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route('register')}
                                className="px-4 py-3 text-base font-semibold text-white bg-maroon-600 hover:bg-maroon-700 rounded-lg transition-colors duration-200 text-center"
                            >
                                Register
                            </ResponsiveNavLink>
                        </div>
                    )}
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}