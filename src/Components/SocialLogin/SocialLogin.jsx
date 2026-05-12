import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SocialLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const handleSocialLogin = (socialProvider) => {
    socialProvider()
      .then((result) => {
        if (result) {
          navigate(from);
        }
        // console.log(result.user);
      })
      .catch((error) => {
        console.error("Social login error:", error);
      });
  };

  return (
    <div>
      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={() => handleSocialLogin(googleLogin)}
          className="btn bg-primary hover:bg-secondary text-white"
        >
          <span>
            <FaGoogle />
          </span>{" "}
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
