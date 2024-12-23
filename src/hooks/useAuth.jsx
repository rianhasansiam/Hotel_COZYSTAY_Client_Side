import { useContext } from "react";
import { contextData } from "../Contex";
// import { AuthContext } from "../FirebaseProvider/FirebaseProvider";

const useAuth = () => {
  const all = useContext(contextData);
  return all;
};

export default useAuth;
