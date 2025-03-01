/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export default function TenantsTable({ initialTenantList }) {
    const [activeData, setActiveData] = useState(null)
    const [openAccept, setOpenAccept] = useState(false)
    const [tenantList, setTenantList] = useState(initialTenantList)


    // const autoupdate = (tenant) => {
    //     const updatedTenants = tenantList.map(t => 
    //       t._id === tenant._id ? { ...t, verifiedBysuperAdmin: true, status: "Active" } : t
    //     )
    //     setTenantList(updatedTenants)
    //     setOpenAccept(false)
    //   }

    const onAcceptHandler = (tenant) => {
        const updatedTenants = tenantList.map(t =>
            t._id === tenant._id ? { ...t, verifiedBysuperAdmin: true, status: "Active" } : t
        )
        setTenantList(updatedTenants)
        setOpenAccept(false)
    }

    const onVerifyHandler = (tenant) => {
        const updatedTenants = tenantList.map(t =>
            t._id === tenant._id ? { ...t, verifiedBysuperAdmin: true, status: "Verified" } : t
        )
        setTenantList(updatedTenants)
    }
    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Sr. No
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Profile
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Type
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Mobile
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tenantList.map((tenant, index) => (
                                        <tr key={tenant._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                            <td className="px-2 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={'https://github.com/shadcn.png'} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tenant.email}</td>
                                            <td className="px-3 py-4 whitespace-nowrap ">
                                                <div className="text-sm text-gray-500 ml-3">{tenant.mobile}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${tenant.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                        tenant.status === 'Verified' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {tenant.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {tenant.verifiedBysuperAdmin ? (
                                                    tenant.status === "Active" ? (

                                                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white"
                                                            onClick={() => onVerifyHandler(tenant)}>
                                                            Verify
                                                        </Button>
                                                    ) : (
                                                        <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white" disabled>
                                                            Verified
                                                        </Button>
                                                    )
                                                ) : (
                                                    <Button size="sm" onClick={() => {
                                                        setActiveData(tenant)
                                                        setOpenAccept(true)
                                                    }}>
                                                        Activate
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={openAccept} onOpenChange={setOpenAccept}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Accept User</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to Accept user?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={() => onAcceptHandler(activeData)} >
                            Accept
                        </Button>
                        <Button variant="outline" onClick={() => setOpenAccept(false)}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
