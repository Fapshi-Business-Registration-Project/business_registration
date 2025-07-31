"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="relative w-[360px] h-[800px] bg-white rounded-[10px] p-6">
      {/* Sign Up Title */}
      <h1 className="absolute left-[22px] top-[110px] font-poppins font-bold text-[25px] leading-[38px] text-black">
        Sign Up
      </h1>

      {/* Subtitle */}
      <p className="absolute left-[22px] top-[149px] w-[238px] font-poppins font-normal text-[15px] leading-[22px] text-black">
        Enter your email address for the sign up.
      </p>

      {/* Email Field */}
      <div className="absolute left-[22px] top-[243px] w-[324px]">
        <label
          htmlFor="email"
          className="font-poppins font-light text-[14px] leading-[21px] text-black"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="w-full font-poppins font-light text-[14px] leading-[21px] text-black border-none outline-none"
          placeholder="onyamartha@gmail.com"
          {...form.register("email")}
        />
        <div className="w-[323px] h-[1px] bg-black bg-opacity-27 mt-2" />
      </div>

      {/* Password Field */}
      <div className="absolute left-[22px] top-[328px] w-[324px]">
        <label
          htmlFor="password"
          className="font-poppins font-light text-[15px] leading-[22px] text-black"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className="w-full font-poppins font-light text-[14px] leading-[21px] text-black border-none outline-none"
            {...form.register("password")}
          />
          <button
            type="button"
            className="absolute right-0 top-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-6 h-6 text-black" />
            ) : (
              <Eye className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
        <div className="w-[323px] h-[1px] bg-black bg-opacity-27 mt-2" />

        {/* Password Strength Indicator */}
        <div className="flex gap-1 mt-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-[5.65px] h-[5px] bg-black rounded-full" />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="absolute left-[calc(50%-162.5px)] top-[468px] w-[325px] h-[47px] bg-[#4479FF] rounded-[5px] flex items-center justify-center"
        onClick={form.handleSubmit(onSubmit)}
      >
        <span className="font-poppins font-bold text-[15px] leading-[22px] text-white">
          Next
        </span>
      </button>

      {/* Login Link */}
      <div className="absolute left-[calc(50%-113.5px)] top-[550px] w-[227px] text-center">
        <span className="font-inter font-normal text-[15px] leading-[18px] text-black">
          Already have an account?{" "}
          <Link href="/login" className="text-[#4479FF]">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}
