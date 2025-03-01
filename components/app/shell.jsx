'use client'
import { Fragment, useState , useEffect} from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
// import {
//   BellIcon,
//   CalendarIcon,
//   ChartBarIcon,
//   FolderIcon,
//   HomeIcon,
//   InboxIcon,
//   MenuAlt2Icon,
//   UsersIcon,
//   XIcon,
// } from '@heroicons/react/outline'
// import { SearchIcon } from '@heroicons/react/solid'

import { useDispatch, useSelector } from "react-redux";
import { usePathname } from 'next/navigation';
import {
  Rss,
  ClipboardMinus,
  Ticket,
  CalendarCheck,
  User,
  Users,
  LayoutDashboard,
  LucideMenu
} from 'lucide-react';
import logo from '@/public/images/Sync_Spaces_White.png'
import Image from 'next/image';
const navigationData = [
  { name: 'Dashboard', href: '/admin/dashboard/', icon: LayoutDashboard, current: true },
  { name: 'Tenants', href: '/admin/dashboard/tenants', icon: Users, current: false },
  { name: 'User Management', href: '/admin/dashboard/user-management', icon: User, current: false },
  { name: 'Subscriptions', href: '/admin/dashboard/subscriptions', icon: CalendarCheck, current: false },
  { name: 'Tickets', href: '/admin/dashboard/tickets', icon: Ticket, current: false },
  { name: 'Reports', href: '/admin/dashboard/reports', icon: ClipboardMinus, current: false },
  { name: 'Blogs', href: '/admin/dashboard/blogs', icon: Rss, current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/admin/dashboard/profile' },
  { name: 'Settings', href: '/admin/dashboard/settings' },
  { name: 'Staff', href: '/admin/dashboard/staff' },
  { name: 'Sign out', href: '/admin/dashboard/logout' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Shell({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pageDetails = useSelector((state) => state.pageType);
  console.log(pageDetails, "pageDetails")

  const [navigation, setNavigation] = useState(navigationData);

  const pathname = usePathname();
  

  const url = window.location.pathname; // Assuming you're getting the current URL this way
  useEffect(() => {
    const updatedNavigationData = navigationData.map(item => ({
      ...item,
      current: item.href.replace(/\/$/, '') === pathname.replace(/\/$/, ''),
    }));
    setNavigation(updatedNavigationData);
  }, [pathname]);
  
  console.log(navigation.map((item) => item.current), url);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      {/* <XIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <Image
                    className="h-8 w-auto"
                    src={logo}
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 p-10">
              <Image
                className="h-11 w-auto"
                src={logo}
                alt="Workflow"
              />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <LucideMenu className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between items-center">
              <div className="flex-1 flex ">
              <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{pageDetails?.title}</h1>

              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  {children}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
