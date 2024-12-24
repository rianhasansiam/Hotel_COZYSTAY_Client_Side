import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Make sure axios is imported

import "react-toastify/dist/ReactToastify.css";
import useAuth from "../hooks/useAuth";
import PageTitle from "../PageTitle/PageTitle";
import SocialLogin from "../SocialLogin.jsx/SocialLogin";
import Aos from "aos";
import "aos/dist/aos.css";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  console.log(location);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signInUser(email, password);
      console.log(result.user);
      const user = { email };

      toast.success("Login Successfully", {
        onClose: async () => {
          reset();

          // Get access token
          try {
            const res = await axios.post(
              "https://hotel-booking-server-lake.vercel.app/jwt",
              user,
              { withCredentials: true }
            );
            console.log(res.data);
            if (res.data.success) {
              navigate(location?.state || "/");
            }
          } catch (error) {
            console.error("Error fetching token:", error);
          }
        },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Login Failed Try Again");
    }
  };

  return (
    <div className="min-h-[calc(100vh-246px)] lg:flex justify-center items-center my-10 container mx-auto">
      <PageTitle title="Login" />
      <div data-aos="fade-right" className="lg:w-1/2">
        <img
          className="h-[550px] w-full"
          src="https://i.ibb.co/0BsT0Fy/pexels-vaishnav-devadas-415764-2086676.jpg"
          alt="Login Illustration"
        />
      </div>
      <div data-aos="fade-left" className="lg:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="text-center">
            <p className="font-robotoslab text-5xl font-light">Welcome Back</p>
            <p className="font-robotoslab text-xl font-light">cozystay</p>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered w-full"
                {...register("password", { required: "Password is required" })}
              />
              <span
                className="absolute top-4 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Login</button>
          </div>

          <p className="text-center mt-5">
            Don&apos;t have an account?{" "}
            <Link className="text-primary font-semibold" to="/register">
              Register
            </Link>
          </p>
          <div className="divider divider-primary">Or continue with</div>
          <SocialLogin />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
