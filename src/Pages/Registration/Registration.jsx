import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Components/FirebaseProvider/FirebaseProvider";
import PageTitle from "../../Components/PageTitle/PageTitle";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Registration = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const from = "/";

  const passwordValidation = (value) => {
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;

    if (!regexUpperCase.test(value)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!regexLowerCase.test(value)) {
      return "Password must contain at least one lowercase letter";
    }

    if (value.length < 6) {
      return "Password must be at least 6 characters long";
    }

    return true;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password, name, image } = data;

    createUser(email, password)
      .then((result) => {
        console.log("User created successfully:", result);
        updateUserProfile(name, image).then(() => {
          reset();
          toast.success("Registration Successful", {
            onClose: () => {
          
            },
          });
          navigate(from);

          // window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error); // Log any errors during user creation
      });
  };

  return (
    <div className="min-h-[calc(100vh-246px)] lg:flex justify-center items-center my-10 container mx-auto">
      <PageTitle title="Home"></PageTitle>
      <div data-aos="fade-right" className="lg:w-1/2">
        <img
          className="lg:h-[650px] md:h-[650px] h-[550px] w-full"
          src="https://i.ibb.co/yfnsfFy/pexels-nguyendesigner-244133.jpg"
          alt=""
        />
      </div>
      <div data-aos="fade-left" className="lg:w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className=" text-center">
            <p className=" font-robotoslab text-5xl font-light">Welcome To</p>
            <p className=" font-robotoslab text-xl font-light">cozystay</p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className=" text-red-600">This field is required</span>
            )}
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
              <span className="label-text">Image Url</span>
            </label>
            <input
              type="text"
              placeholder="Image Url"
              className="input input-bordered"
              name="image"
              {...register("image")}
            />
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
                  validate: passwordValidation,
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
            <button className="btn btn-primary text-white">Registration</button>
          </div>
          <p className=" text-center mt-5">
            Already have and account?{" "}
            <Link className=" text-primary font-semibold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
