import React from 'react'
import PropTypes from 'prop-types'

const Signup = props => {



    const registerHandle = (e) => {
        e.preventDefault();
        const name=e.target.name.value
        const email=e.target.email.value
        const password=e.target.password.value
        const photoUrl=e.target.photoUrl.value
        
        
    
    
    
    //pass verifications
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const isLengthValid = password.length >= 6;
            if (!isLengthValid) {
              return setAlert('Password must be at least 6 characters long.')
            }
            if (!hasUppercase) {
              return setAlert('Password must contain at least one uppercase letter.')
            }
            if (!hasLowercase) {
              return setAlert('Password must contain at least one lowercase letter.')
            }
    
            if(hasUppercase && hasLowercase && isLengthValid){
              setverifypass(password)
              setAlert('')
            }
    
            createNewUser(name,email,verifypass,photoUrl)
       
      };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-white">
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
        Create Your Account
      </h1>
      






      <form onSubmit={registerHandle}>
        {/* Name Field */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">
            Name
          </label>
          <input
            type="text"
         
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
           name="name"

            required
          />
        </div>

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

        {/* Photo URL Field */}
        <div className="mb-6">
          <label htmlFor="photoUrl" className="block text-gray-700 text-lg font-medium mb-2">
            Photo URL
          </label>
          <input
            type="text"
            name="photoUrl"
            className="w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your photo URL"

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

         <p  className="label-text-alt link link-hover text-red-500 text-base mt-2">{alert}</p>
        
        </div>

        {/* Register Button */}
        <div>
          <button
            type="submit"
            className="w-full p-4 text-black text-lg font-semibold rounded-lg shadow-md  'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400" >
            Register
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
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}

Signup.propTypes = {}

export default Signup