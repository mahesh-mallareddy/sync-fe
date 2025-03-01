"use client"
import React from 'react'
// import { CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'
import AuthorTable from "@/components/app/admin/author/AuthorTable"
import AuthorHeader from "@/components/app/admin/author/AuthorHeader"


  const people = [
    // The people data array from your initial code
      {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        role: "Admin",
        email: "jane.cooper@example.com",
        count: 5,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        role: "user",
        email: "jane.cooper@example.com",
        count: 3,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      
      {
        name: "Jane Cooper",
        title: "Regional Paradigm Technician",
        department: "Optimization",
        role: "support",
        email: "jane.cooper@example.com",
        count: 6,
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      },
      
    ];

export default function Authors() {
  return (
    <div className="p-3 space-y-5">
            <AuthorHeader />
            <AuthorTable people={people}/>
    </div>
  )
}

  
