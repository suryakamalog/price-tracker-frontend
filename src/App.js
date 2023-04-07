import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RootLayout from "./components/Root";
import ProductList from "./components/ProductList";
import NewProduct from "./components/NewProduct";
import PersistLogin from "./components/PersistLogin";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* public routes */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />

      {/* we want to protect these routes */}
      <Route element={<PersistLogin />}>
        <Route path="productlist" element={<ProductList />} />
        <Route path="productentry" element={<NewProduct />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
