import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import accredian from "../assets/image.png";

import axios from "axios";

async function signupUser({ username, email, password, confirmPassword }) {
  try {
    const response = await axios.post("http://localhost:8080/api/signup", {
      username,
      email,
      password,
      confirmPassword,
    });

    return response.data;
  } catch (error) {
    throw new Error("Signup failed: " + error.response.data.error);
  }
}

export default function Signup() {
  const navigate = useNavigate();
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);
  const [errorText, setErrorText] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (formData) => {
    try {
      // Call signupUser function passing formData
      console.log(formData);
      await signupUser(formData);

      // If signup was successful, set success alert and navigate
      setIsSuccessAlertVisible(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect to login after 3 seconds
    } catch (error) {
      // Handle signup failure
      setErrorText("Signup failed: " + error.message);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {isSuccessAlertVisible && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
            Signup successful! Redirecting to login...
          </div>
        )}

        {errorText && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
            {errorText}
          </div>
        )}

        <div className="flex items-center justify-center px-10 py-16 lg:px-8 lg:py-20">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <img src={accredian} height={100} width={130} alt="Logo" />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign up to create an account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-800 transition-all duration-200 hover:underline"
              >
                Sign In here
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="text-base font-medium text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("username")}
                        placeholder="Username"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p>{errors.username?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p>{errors.email?.message}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row lg:gap-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p>{errors.password?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-base font-medium text-gray-900"
                    >
                      Confirm password
                    </label>
                    <div className="mt-2">
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="Confirm password"
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <p>{errors.confirmPassword?.message}</p>
                    </div>
                  </div>
                </div>
                <div className="py-3">
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white bg-blue-800 "
                  >
                    Sign up
                    <ArrowRight className="ml-2" size={16} />
                  </motion.button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
