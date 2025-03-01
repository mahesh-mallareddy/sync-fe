"use client";
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tabs({tabs}) {
  const [tabNavigation, setTabNavigation] = useState(tabs);

  const pathname = usePathname();

  const url = window.location.pathname; // Assuming you're getting the current URL this way
  useEffect(() => {
    const updatedNavigationData = tabs.map(item => ({
      ...item,
      current: item.href.replace(/\/$/, '') === pathname.replace(/\/$/, ''),
    }));
    setTabNavigation(updatedNavigationData);
  }, [pathname]);
  
  console.log(tabNavigation.map((item) => item.current), url);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.current)}
        >
          {tabNavigation.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabNavigation.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.current ? 'page' : undefined}
              >
                {console.log(JSON.stringify(tab))
                }
                {/* <tab.icon
                  className={classNames(
                    tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden="true"
                /> */}
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

// import React from 'react';
 
// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
// }
 
// export default function Tabs({ tabs, activeTab, onTabChange }) {
//     // Function to handle tab click and update window location
//     const handleTabClick = (tab) => {
//         onTabChange(tab.name);
//         window.location.href = tab.href; // Update the page via window.location.href
//     };
 
//     return (
//         <div>
//             <div className="sm:hidden">
//                 <label htmlFor="tabs" className="sr-only">
//                     Select a tab
//                 </label>
//                 <select
//                     id="tabs"
//                     name="tabs"
//                     className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
//                     value={activeTab}
//                     onChange={(e) => handleTabClick(tabs.find(tab => tab.name === e.target.value))}
//                 >
//                     {tabs.map((tab) => (
//                         <option key={tab.name} value={tab.name}>
//                             {tab.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>
 
//             <div className="hidden sm:block">
//                 <div className="border-b border-gray-200">
//                     <nav className="-mb-px flex space-x-8" aria-label="Tabs">
//                         {tabs.map((tab) => (
//                             <a
//                                 key={tab.name}
//                                 onClick={() => handleTabClick(tab)}
//                                 className={classNames(
//                                     activeTab === tab.name
//                                         ? 'border-indigo-500 text-indigo-600'
//                                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
//                                     'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
//                                 )}
//                                 aria-current={activeTab === tab.name ? 'page' : undefined}
//                             >
//                                 <tab.icon
//                                     className={classNames(
//                                         activeTab === tab.name ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
//                                         '-ml-0.5 mr-2 h-5 w-5'
//                                     )}
//                                     aria-hidden="true"
//                                 />
//                                 <span>{tab.name}</span>
//                             </a>
//                         ))}
//                     </nav>
//                 </div>
//             </div>
//         </div>
//     );
// }
 