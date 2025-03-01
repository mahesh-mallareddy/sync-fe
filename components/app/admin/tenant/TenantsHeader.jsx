"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useForm } from "react-hook-form";
import { addTenantSchema } from "@/schema/admin/addtenant";
import { BasicForm } from "@/components/primitives/auto-form";

export default function TenantsHeader() {
    const {
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

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
                        <SheetTrigger>+ Add New Tenant</SheetTrigger>
                        <SheetContent className="overflow-y-auto" onClose={handleClose}>
                           <BasicForm formSchema={addTenantSchema} onSubmit={onSubmit} />
                        </SheetContent>
                    </Sheet>
                </button>
            </div>
        </div>
    );
}
