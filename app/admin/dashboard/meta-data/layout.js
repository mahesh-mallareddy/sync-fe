"use client"
import React, { useEffect, useState } from 'react';
import Tabs from "@/components/ui/tabs";
// import { CreditCardIcon, UsersIcon } from '@heroicons/react/solid';

export default function Layout({ children }) {
    const [activeTab, setActiveTab] = useState('');

    const tabs = [
        { name: 'meta-data', href: '/admin/dashboard/meta-data', icon: '', current: true },
        { name: 'Authors', href: '/admin/dashboard/meta-data/authors', icon: '', current: false },
        { name: 'Categories', href: '/admin/dashboard/meta-data/categories', icon: '' , current: false},
    ];

    return (
        <div className="p-3 flex flex-col space-y-5">
            <main >
                <Tabs tabs={tabs} />
            </main>
            {children}
        </div>
    );
}

