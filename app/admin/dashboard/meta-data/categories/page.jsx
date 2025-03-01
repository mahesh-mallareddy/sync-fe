"use client"
import React from 'react'
// import { CreditCardIcon, UsersIcon } from '@heroicons/react/solid'
import CategoryTable from "@/components/app/admin/category/CategoryTable"; // Fixed import
import CategoryHeader from "@/components/app/admin/category/CategoryHeader";

export default function Category() {
//   const people = []; // Initialize with an empty array or fetch data from an API
const people = [
    // The people data array from your initial code
    {
      description: "Cybersecurity Best Practices",
      categories: "security Optimization",
      slug: "security-Optimization",
      count: 4,
     },
    {
      description: "Cloud Computing Essentials",
      categories: "Cloud ",
      slug: "Cloud",
      count: 6,

      },
    {
      description: "Introduction to UX Design",
      categories: "Design architech",
      slug: "Design-architech",
      count: 8,

    },
     
  ];
  return (
    <div className='p-3 space-y-5'>
      <CategoryHeader />
      <CategoryTable data={people} /> {/* Pass data to CategoryTable */}
    </div>
  )
}
