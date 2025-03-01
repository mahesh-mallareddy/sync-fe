
"use client"

import { useState } from "react";
import BlogTable from "@/components/app/admin/blog/BlogTable";
import StatsComponent from "@/components/app/admin/StatsComponent";
import BlogHeader from "@/components/app/admin/blog/BlogHeader";
import Pagination from "@/components/ui/pagination";
import SubShell from "@/components/app/SubShell";


const people = [
  // The people data array from your initial code
  {
    name: "Jane Cooper",
    title: "Introduction to Artificial Intelligence",
    categories: "Optimization",
    role: "Admin",
    email: "@example.com",
    Status: "publish",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Steve Jobs",
    title: "Web Development with React",
    categories: "Development",
    role: "Manager",
    email: "@example.com",
    Status: "un publish",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Robert Frost",
    title: "Regional Paradigm Technician",
    categories: "Optimization",
    role: "User",
    email: "@example.com",
    Status: "Peding review",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Steve Jobs",
    title: "Data Science Fundamentals",
    categories: "Data Science",
    role: "User",
    email: "@example.com",
    Status: "Peding review",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Robert Frost",
    title: "Machine Learning Algorithms",
    categories: "Algorithms",
    role: "Manager",
    email: "@example.com",
    Status: "publish",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Roosevelt Cooper",
    title: "Introduction to Blockchain",
    categories: "Optimization",
    role: "User",
    email: "@example.com",
    Status: "Peding review",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Franklin",
    title: "iOS App Development",
    categories: "Development",
    role: "User",
    email: "@example.com",
    Status: "un publish",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Franklin ",
    title: "Python for Data Analysis",
    categories: "core languages",
    role: "Support",
    email: "@example.com",
    Status: "publish",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Robert Frost",
    title: "Cybersecurity Best Practices",
    categories: "security Optimization",
    role: "Admin",
    email: "@example.com",
    Status: "publish",

    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Sam Coer",
    title: "Cloud Computing Essentials",
    categories: "Cloud ",
    role: "Admin",
    email: "@example.com",
    Status: "Peding review",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jeo Mark",
    title: "Introduction to UX Design",
    categories: "Design",
    role: "Manager",
    email: "@example.com",
    Status: "publish",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Alan Kay",
    title: "Regional Paradigm Technician",
    categories: "Technician",
    role: "User",
    email: "@example.com",
    Status: "un publish",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

const itemsPerPage = 10;

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  console.log()
  // Get the total number of pages based on itemsPerPage
  const totalPages = Math.ceil(people.length / itemsPerPage);

  // Calculate data to display on the current page
  const currentData = people.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <SubShell title="Blogs">
      <div className="p-3 flex flex-col space-y-5">
        <BlogHeader />
        <StatsComponent />
        <BlogTable data={currentData} />
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </SubShell>
  );
}

export default Page;
