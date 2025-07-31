"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
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
    <div className="relative w-[360px] h-[800px] bg-white rounded-[10px]">
      {/* Back Button */}
      <button className="absolute left-[23px] top-[31px] w-8 h-5">
        <div className="absolute left-[24.53%] right-[24.53%] top-[61.09%] bottom-[38.91%] border-t-2 border-black transform rotate-180" />
      </button>

      {/* Title */}
      <h1 className="absolute left-[22px] top-[110px] w-[70px] h-[38px] font-poppins font-bold text-[25px] leading-[38px] text-black">
        Login
      </h1>

      {/* Subtitle */}
      <p className="absolute left-[22px] top-[149px] w-[238px] h-[23px] font-poppins font-normal text-[15px] leading-[22px] text-black">
        Welcome back!!
      </p>

      {/* Email Field */}
      <div className="absolute left-[20px] top-[254px] w-[324px]">
        <label
          htmlFor="email"
          className="font-poppins font-light text-[14px] leading-[21px] text-black"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          className="w-full mt-1 font-poppins font-light text-[14px] leading-[21px] text-black border-none outline-none"
          placeholder="onyamartha@gmail.com"
          {...form.register("email")}
        />
        <div className="w-[323px] h-[1px] bg-black bg-opacity-27 mt-2" />
      </div>

      {/* Password Field */}
      <div className="absolute left-[20px] top-[337px] w-[324px]">
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
            className="w-full mt-1 font-poppins font-light text-[14px] leading-[21px] text-black border-none outline-none"
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
      </div>

      {/* Forgot Password Link */}
      <Link
        href="/forgot-password"
        className="absolute left-[calc(50%-59.5px)] top-[420px] w-[119px] h-[18px] font-inter font-semibold text-[15px] leading-[18px] text-[#311386] text-center"
      >
        forgot password
      </Link>

      {/* Login Button */}
      <button
        type="submit"
        className="absolute left-[calc(50%-162.5px)] top-[521px] w-[325px] h-[47px] bg-[#4479FF] rounded-[5px] flex items-center justify-center"
        onClick={form.handleSubmit(onSubmit)}
      >
        <span className="font-poppins font-bold text-[15px] leading-[22px] text-white">
          Login
        </span>
      </button>

      {/* Divider */}
      <div className="absolute left-[131px] top-[615px] w-[99px] h-[1px] bg-black" />

      {/* "or continue with" text */}
      <p className="absolute left-[calc(50%-51.5px)] top-[599px] w-[103px] h-[16px] font-inter font-semibold text-[13px] leading-[16px] text-black text-center">
        or continue with
      </p>

      {/* Social Login Buttons */}
      <div className="absolute left-[140px] top-[639px] flex gap-4">
        <button className="w-[29px] h-[28px] bg-[#EDEDED] rounded-[5px] border-2 border-white flex items-center justify-center">
          {/* Google Icon */}
          <div className="relative w-[17px] h-[15px]">
            <div className="absolute w-[83.34%] h-[83.34%] bg-[#FFC107]" />
            <div className="absolute w-[65.23%] h-[32.02%] bg-[#FF3D00]" />
            <div className="absolute w-[65.03%] h-[50.12%] bg-[#4CAF50]" />
            <div className="absolute w-[41.67%] h-[39.44%] bg-[#1976D2]" />
          </div>
        </button>
        <button className="w-[29px] h-[28px] bg-[#EDEDED] rounded-[5px] border-2 border-white flex items-center justify-center">
          {/* Facebook Icon */}
          <div className="relative w-[17px] h-[15px]">
            <div className="absolute w-full h-[99.39%] bg-[#1877F2]" />
            <div className="absolute w-[42.78%] h-[80.47%] bg-white left-[29.49%]" />
          </div>
        </button>
      </div>

      {/* Sign Up Link */}
      <div className="absolute left-[calc(50%-84.5px)] top-[755px] w-[169px] h-[18px] text-center">
        <span className="font-inter font-normal text-[15px] leading-[18px] text-black">
          Not a member?{" "}
          <Link href="/register-account" className="text-[#4479FF]">
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}
