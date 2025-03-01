import Tabs from "@/components/ui/tabs"
// import { CreditCardIcon, OfficeBuildingIcon, UserIcon, UsersIcon } from '@heroicons/react/solid'

const tabs = [
    { name: 'Blog', href: '/admin/dashboard/blogs', icon: '', current: true },
    { name: 'Add Blog', href: '/admin/dashboard/blogs/addblog', icon: '', current: false },
    { name: 'Authors', href: '/admin/dashboard/blogs/author', icon: '', current: false },
    { name: 'Categories', href: '/admin/dashboard/blogs/categories', icon: '', current: false },
  ]
function page({children}) {
    return (
        <div className="p-5 flex flex-col space-y-3">
            {/* <Tabs tabs={tabs} /> */}
            <div>
                {children}
            </div>
        </div>
    )
}

export default page
