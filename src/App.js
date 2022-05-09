import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./componnent/PrivateRoute/PrivateRoute";
import Authprovider from "./context/Authprovider";
import Dashboard from "./View/Dashboard/Dashboard";
import Products from "./View/Dashboard/Products/Products";
import User from "./View/Dashboard/User/User";
import Login from "./View/Login/Login";
import Registration from "./View/Registration/Registration";

function App() {
  return (
    <Authprovider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<User />} />
            <Route path="/dashboard/products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Authprovider>
  );
}

export default App;
