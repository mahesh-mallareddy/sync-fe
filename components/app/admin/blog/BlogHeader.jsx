/* This example requires Tailwind CSS v2.0+ */
"use client";

import Link from "next/link";

export default function BlogHeader() {
  
 
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl text-brandPrimary font-bold leading-7 sm:text-3xl sm:truncate">
          Blog Details
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        {/* <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit
        </button> */}
        <Link href={'/admin/dashboard/blogs/addblog'}>
        <button
          type="button"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
          + Add New Blog
        </button>
          </Link>
      </div>
    </div>
  );
}
