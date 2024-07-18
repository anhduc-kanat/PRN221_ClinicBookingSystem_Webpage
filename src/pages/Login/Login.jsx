import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword, login } from "../../redux/Slice/LoginSlice/loginSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import "./Login.css"


// Schema definition for form validation


export function Login() {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dispatch = useDispatch(); // Hook to dispatch actions
  const [open, setOpen] = useState(false); // State for dialog visibility
  const { isLoading } = useSelector((state) => state.user); // Accessing loading state from Redux store
  const SignUpSchema = z.object({
    phoneNumber: z.string().min(4).max(15),
    password: z.string().min(3).max(40),
  });
  // Setting up form handling with validation
  const { register, handleSubmit } = useForm({ resolver: zodResolver(SignUpSchema) });

  // Handling form submission for login
  const handleSignIn = async (data) => {
    console.log(data, "data");
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (res.role === "DENTIST") {
          navigate("/dentist");
        } else if (res.role === "CUSTOMER") {
          navigate("/customer");
        } else if (res.role === "STAFF") {
          navigate("/staff");
        } else if (res.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/403");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // Handling form submission for forgot password
  const handleForgot = async (data) => {
    dispatch(forgotPassword(data))
      .unwrap()
      .then((res) => {
        navigate("/profile");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    // <div className="flex justify-center items-center h-screen">
    //   <Card color="transparent" shadow={false}>
    //     <Typography variant="h4" color="blue-gray">
    //       Sign In
    //     </Typography>
    //     <Typography color="gray" className="mt-1 font-normal">
    //       Welcome back! Enter your details to log in.
    //     </Typography>
    //     <form
    //       className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
    //       noValidate
    //       onSubmit={handleSubmit(handleSignIn)}
    //     >
    //       <div className="mb-6">
    //         <Typography variant="h6" color="blue-gray" className="-mb-1">
    //           Phone Number
    //         </Typography>
    //         <Input
    //           size="lg"
    //           placeholder="1234567890"
    //           className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    //           labelProps={{
    //             className: "before:content-none after:content-none",
    //           }}
    //           {...register("phoneNumber")}
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <Typography variant="h6" color="blue-gray" className="-mb-1">
    //           Password
    //         </Typography>
    //         <Input
    //           type="password"
    //           size="lg"
    //           placeholder="********"
    //           className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    //           labelProps={{
    //             className: "before:content-none after:content-none",
    //           }}
    //           {...register("password")}
    //         />
    //       </div>
    //       <Button
    //         className="mt-4 mb-10 flex justify-center items-center"
    //         fullWidth
    //         type="submit"
    //         disabled={isLoading}
    //       >
    //         {isLoading ? (
    //           <AiOutlineLoading3Quarters color="white" className="animate-spin" />
    //         ) : (
    //           "Sign In"
    //         )}
    //       </Button>
    //       <Typography color="gray" className="mt-4 text-center font-normal">
    //         Don't have an account?{" "}
    //         <Link to="/signup" className="font-medium text-gray-900">
    //           Sign Up
    //         </Link>
    //       </Typography>
    //       <Typography
    //         onClick={() => {
    //           setOpen(true);
    //         }}
    //         color="gray"
    //         className="mt-4 text-center font-normal cursor-pointer"
    //       >
    //         Forgot password?
    //       </Typography>
    //     </form>
    //   </Card>
    //   <ForgotPasswordDialog open={open} setOpen={setOpen} handleForgot={handleForgot} />
    //</div>
    <div className="login-container">
      <div className="card">
        <h2 className="title">Sign In</h2>
        <p className="subtitle">Welcome back! Enter your details to log in.</p>
        <form className="form" noValidate onSubmit={handleSubmit(handleSignIn)}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="1234567890"
              {...register("phoneNumber")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              {...register("password")}
            />
          </div>
          <button
            className="btn-submit"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : (
              "Sign In"
            )}
          </button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
          <p
            onClick={() => setOpen(true)}
            className="link text-center cursor-pointer"
          >
            Forgot password?
          </p>
        </form>
      </div>
      <ForgotPasswordDialog open={open} setOpen={setOpen} handleForgot={handleForgot} />
    </div>
  );
}

export default Login;
