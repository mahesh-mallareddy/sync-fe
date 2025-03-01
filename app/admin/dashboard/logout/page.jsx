'use client'
import Cookies from 'js-cookie';
import {useEffect} from 'react'
function Page() {
    const handleLogout = () => {
        // Clear all cookies
        const allCookies = Cookies.get(); // Get all cookies as an object
        Object.keys(allCookies).forEach(cookieName => {
          Cookies.remove(cookieName); // Remove each cookie
        });
    
        // Optionally, redirect the user to a login page or home page
        window.location.href = '/admin'; // Adjust the route based on your app
      };

      useEffect(() => {
        handleLogout()
      })

      handleLogout()

    return (
        <div>
            
        </div>
    )
}

export default Page
