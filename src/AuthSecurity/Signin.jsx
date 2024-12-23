import React from 'react'
import PropTypes from 'prop-types'

const Signin = props => {

    const loginHandle = (e) => {
        e.preventDefault();
        const email=e.target.email.value
        const password=e.target.password.value
         
    
    
      };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-white">
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Welcome Back!
      </h1>
      



      <form onSubmit={loginHandle}>
        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6 relative">
          <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-2">
            Password
          </label>
          <input
            type={showpass?"text":"password"}
            name="password"
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
           {/* {showpass?<i onClick={showpassHandle} className="fa-regular fa-eye absolute top-[53px] right-[18px] text-xl cursor-pointer"></i>:<i  onClick={showpassHandle} className="fa-regular fa-eye-slash absolute top-[53px] right-[18px] text-xl cursor-pointer"></i>} */}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <div>
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </div>
      </form>
          <button onClick={} className="flex items-center justify-center bg-white text-gray-600 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 mx-auto my-3 font-semibold">
    <img
      src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
      alt="Google logo"
      className="w-5 h-5 mr-2"
    />
    Continue with Google
         </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}

Signin.propTypes = {}

export default Signin