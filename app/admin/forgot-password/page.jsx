"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import fps from '@/public/images/forgot_password.png'

const fgpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(fgpSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image and Features */}
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <div className="flex h-full flex-col justify-between px-8 py-24">
        <div className="relative w-full h-54"> {/* Set a specific height */}
      <Image
        src={fps}
        alt="Login visual"
        layout="responsive"  
        width={500}          
        height={500}        
        objectFit="cover"    
        className="rounded-lg"
      />
    </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Why choose us?</h2>
            <ul className="space-y-2">
              {[
                "Secure login",
                "Fast and reliable",
                "User-friendly interface",
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Check className="h-5 w-5 text-green-500" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verify your account 
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email && (
                  <motion.p
                    className="mt-1 text-sm text-red-600"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/admin"
                  className=" text-blue-500/40 font-semibold hover:text-blue-500"
                >
                  Back to Login
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Reset"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
