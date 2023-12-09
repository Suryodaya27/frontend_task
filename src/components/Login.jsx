import React from "react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import accredian from "../assets/image.png";
import axios from "axios";

async function signinUser({ email, password }) {
  try {
    const response = await axios.post("http://localhost:8080/api/login", {
      email: email,
      password: password,
    });
    console.log(response.data); // Handle the response data here
  } catch (error) {
    console.log(error)
    new Error(error); // Handle the error response here
  }
}

function Login() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or Username is required"),
    password: Yup.string().required("Password is required"),
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
      const response = await axios.post("http://localhost:8080/api/login", {
        email: formData.email,
        password: formData.password,
      });

      // If signup was successful, set success alert and navigate
      setIsSuccessAlertVisible(true);
    } catch (error) {
      // Handle signup failure
      setErrorText("Signup failed: " + error.response.data.error);
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
            Signin successful!
          </div>
        )}
        {errorText && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
            {errorText}
          </div>
        )}
        <div className="flex items-center justify-center px-4 sm:px-6 py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 mx-3 flex justify-center">
              <img
                src={accredian}
                height={100}
                width={130}
                alt="Accredian Logo"
              />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-blue-800 transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email or Username
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("email")}
                      placeholder="Email or Username"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p>{errors.email?.message}</p>
                  </div>
                </div>
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
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white bg-blue-800"
                  >
                    Sign in
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

export default Login;
