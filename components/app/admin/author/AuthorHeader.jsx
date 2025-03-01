/* This example requires Tailwind CSS v2.0+ */
"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
// import { Input, Button, Label } from '@/components/ui';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/textarea";
// import { Textarea } from "@/components/ui/Label"


import { useForm } from "react-hook-form";
import { addAuthorSchema } from "@/schema/admin/addauthor";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicForm } from "@/components/primitives/auto-form";

export default function AuthorHeader() {
    const { reset } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle form submission (e.g., API call)
    };
    const handleClose = () => {
        reset(); // Reset the form fields
    };

    return (
        <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl text-brandPrimary font-bold leading-7 sm:text-3xl sm:truncate">
                    Authors
                </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Sheet >
                        <SheetTrigger>+ Add New Author</SheetTrigger>
                        <SheetContent className="overflow-y-auto" onClose={handleClose}>
                            <BasicForm formSchema={addAuthorSchema} onSubmit={onSubmit} />
                        </SheetContent>
                    </Sheet>
                </button>
            </div>
        </div>
    );
}
