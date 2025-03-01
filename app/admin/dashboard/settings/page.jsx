'use client'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import SubShell from '@/components/app/SubShell'
// import {
//   BellIcon,
//   BookmarkAltIcon,
//   CashIcon,
//   CogIcon,
//   FireIcon,
//   HomeIcon,
//   InboxIcon,
//   KeyIcon,
//   MenuIcon,
//   PhotographIcon,
//   SearchCircleIcon,
//   UserIcon,
//   ViewGridAddIcon,
//   XIcon,
// } from '@heroicons/react/outline'
// import { ChevronLeftIcon } from '@heroicons/react/solid'

const navigation = [
  { name: 'Home', href: '#', icon: "" },
  { name: 'Trending', href: '#', icon: "" },
  { name: 'Bookmarks', href: '#', icon: "" },
  { name: 'Messages', href: '#', icon: "" },
  { name: 'Profile', href: '#', icon: "" },
]
const subNavigation = [
  {
    name: 'Change Password',
    description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
    href: '#',
    icon: 'CogIcon',
    current: true,
  },
  {
    name: 'Notifications',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    href: '#',
    icon: 'BellIcon',
    current: false,
  },
  {
    name: 'Security',
    description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
    href: '#',
    icon: 'KeyIcon',
    current: false,
  },
  {
    name: 'Appearance',
    description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
    href: '#',
    icon: 'PhotographIcon',
    current: false,
  },
  {
    name: 'Billing',
    description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
    href: '#',
    icon: 'CashIcon',
    current: false,
  },
  {
    name: 'Integrations',
    description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
    href: '#',
    icon: 'ViewGridAddIcon',
    current: false,
  },
  {
    name: 'Additional Resources',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '#',
    icon: 'SearchCircleIcon',
    current: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
    <SubShell title="Settings">
      <main className="">
            <div className="flex-1 flex flex-col overflow-y-auto xl:overflow-hidden">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="bg-white border-b border-blue-gray-200 xl:hidden">
                <div className="max-w-3xl mx-auto py-3 px-4 flex items-start sm:px-6 lg:px-8">
                  <a
                    href="#"
                    className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium text-blue-gray-900"
                  >
                    {/* <ChevronLeftIcon className="h-5 w-5 text-blue-gray-400" aria-hidden="true" /> */}
                    <span>Settings</span>
                  </a>
                </div>
              </nav>

              <div className="flex-1 flex xl:overflow-hidden">
                {/* Secondary sidebar */}
                <nav
                  aria-label="Sections"
                  className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col"
                >
                  {/* <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
                    <p className="text-lg font-medium text-blue-gray-900">Settings</p>
                  </div> */}
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    {subNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
                          'flex p-6 border-b border-blue-gray-200'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {/* <item.icon className="flex-shrink-0 -mt-0.5 h-6 w-6 text-blue-gray-400" aria-hidden="true" /> */}
                        <div className="ml-3 text-sm">
                          <p className="font-medium text-blue-gray-900">{item.name}</p>
                          <p className="mt-1 text-blue-gray-500">{item.description}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </nav>

                {/* Main content */}
                <div className="flex-1 xl:overflow-y-auto">
                  
                </div>
              </div>
            </div>
          </main>
          </SubShell>

    </>
  )
}
