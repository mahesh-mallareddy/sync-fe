"use client"
import SubShell from "@/components/app/SubShell"


import { useState } from "react"
import { useForm } from "react-hook-form"
// import { IoMdSearch } from "react-icons/io"
// import { MdOutlineCancel } from "react-icons/md"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {Search,  X,} from "lucide-react"
import TenantsHeader from "@/components/app/admin/tenant/TenantsHeader"
import TenantsTable from "@/components/app/admin/tenant/TenantsTable"

// Dummy data
// const tenantList = [
//   { _id: "1", firstName: "John", lastName: "Doe", name: "John Doe", email: "john@example.com", type: "Business", sortname: "JD", mobile: "1234567890", verifiedBysuperAdmin: true },
//   { _id: "2", firstName: "Jane", lastName: "Smith", name: "Jane Smith", email: "jane@example.com", type: "Individual", sortname: "JS", mobile: "9876543210", verifiedBysuperAdmin: false },
// ]

const initialTenantList = [
    { _id: "1", firstName: "John", lastName: "Doe", name: "John Doe", email: "john@example.com", type: "Business", sortname: "JD", mobile: "1234567890", verifiedBysuperAdmin: true, status: "Pending" },
    { _id: "2", firstName: "Jane", lastName: "Smith", name: "Jane Smith", email: "jane@example.com", type: "Individual", sortname: "JS", mobile: "9876543210", verifiedBysuperAdmin: false, status: "Pending" },
  ]

const countryCodeList = [
  { value: "+91", label: "+91" },
  { value: "+44", label: "+44" },
  { value: "+21", label: "+21" },
]

export default function Tenant() {
  return (
    <div className="p-3 space-y-5">
            <TenantsHeader />
            <TenantsTable initialTenantList={initialTenantList}/>
      
    </div>
  )
}
