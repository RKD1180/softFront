const { useContext } = require("react");
const { AuthContext } = require("../context/Authprovider");

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
