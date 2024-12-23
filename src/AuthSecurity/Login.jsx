import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// import useAuth from "../../Components/hooks/useAuth";
// import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import axios from "axios";
// import PageTitle from "../../Components/PageTitle/PageTitle";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import PageTitle from "../PageTitle/PageTitle";
import SocialLogin from "../SocialLogin.jsx/SocialLogin";

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

  const onSubmit = (data) => {
    const { email, password } = data;
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        const user = { email };
        toast.success("Login Successfully", {
          onClose: () => {
            reset();
            //
            // get access token
            axios
              .post("https://hotel-booking-server-lake.vercel.app/jwt", user, {
                withCredentials: true,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                  navigate(location?.state ? location?.state : "/");
                }
              });
          },
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        toast.error("Login Failed Try Again");
      });
  };

  return (
    <div className="min-h-[calc(100vh-246px)] lg:flex justify-center items-center my-10 container mx-auto">
      <PageTitle title="Login"></PageTitle>
      <div data-aos="fade-right" className="lg:w-1/2 ">
        <img
          className="h-[550px] w-full"
          src="https://i.ibb.co/0BsT0Fy/pexels-vaishnav-devadas-415764-2086676.jpg"
          alt=""
        />
      </div>
      <div data-aos="fade-left" className="lg:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className=" text-center">
            <p className=" font-robotoslab text-5xl font-light">Welcome Back</p>
            <p className=" font-robotoslab text-xl font-light">cozystay</p>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              name="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className=" text-red-600">This field is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className=" relative ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: true,
                })}
              />
              <span
                className=" absolute top-4 right-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
              </span>
            </div>
            {errors.password && (
              <span className=" text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary text-white">Login</button>
          </div>
          <p className=" text-center mt-5">
            Don&apos;t have and account?{" "}
            <Link className=" text-primary font-semibold" to="/register">
              Registration
            </Link>
          </p>
          <div className="divider divider-primary">Or continue with</div>
          <SocialLogin></SocialLogin>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
