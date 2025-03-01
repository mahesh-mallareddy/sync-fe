// "use client"
// /* This example requires Tailwind CSS v2.0+ */
// import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
// import { useState } from 'react';

// export default function Pagination({ totalPages = 10, currentPage = 1 }) {
//   const [activePage, setActivePage] = useState(currentPage);

//   const handlePageClick = (page) => {
//     setActivePage(page);
//     // Here you would typically fetch data for the new page
//     // and update the content accordingly
//     console.log(`Navigating to page ${page}`);
//   };

//   return (
//     <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
//       <div className="-mt-px w-0 flex-1 flex">
//         <a
//           href="#"
//           className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
//           onClick={() => handlePageClick(activePage - 1)}
//           disabled={activePage === 1}
//         >
//           <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//           Previous
//         </a>
//       </div>
//       <div className="hidden md:-mt-px md:flex">
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//           <a
//             key={page}
//             href="#"
//             className={classNames(
//               activePage === page
//                 ? 'border-indigo-500 text-indigo-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
//               'border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium'
//             )}
//             onClick={() => handlePageClick(page)}
//             aria-current={activePage === page ? 'page' : undefined}
//           >
//             {page}
//           </a>
//         ))}
//         {/* Add ellipsis if needed */}
//         {totalPages > 10 && (
//           <span className="border-transparent text-gray-500 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
//             ...
//           </span>
//         )}
//       </div>
//       <div className="-mt-px w-0 flex-1 flex justify-end">
//         <a
//           href="#"
//           className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
//           onClick={() => handlePageClick(activePage + 1)}
//           disabled={activePage === totalPages}
//         >
//           Next
//           <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
//         </a>
//       </div>
//     </nav>
//   );
// }

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function Pagination({ totalPages = 10, currentPage = 1, onPageChange }) {
  const [activePage, setActivePage] = useState(currentPage);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setActivePage(page);
      onPageChange(page); // Notify parent component
    }
  };

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          onClick={() => handlePageClick(activePage - 1)}
          disabled={activePage === 1}
        >
          {/* <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <a
            key={page}
            href="#"
            className={classNames(
              activePage === page
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              "border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
            )}
            onClick={() => handlePageClick(page)}
            aria-current={activePage === page ? "page" : undefined}
          >
            {page}
          </a>
        ))}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <a
          href="#"
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          onClick={() => handlePageClick(activePage + 1)}
          disabled={activePage === totalPages}
        >
          Next
          {/* <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </a>
      </div>
    </nav>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

