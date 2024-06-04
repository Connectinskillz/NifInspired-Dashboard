import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import AddProduct from "./Pages/AddProduct";
import AddBlog from "./Pages/AddBlog";
import ViewProducts from "./Pages/ViewProducts";

//for the router we are using the React-Router-Dom version 6.4
//check treello infospace for the link to the documentation and Link to a Tutorial video
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route path="/overview" element={<HomePage />} />

      <Route path="/" element={<RootLayout />}>
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/products" element={<ViewProducts />} />
      </Route>
    </Route>
  )
);

//for the tailwind CSS there is already a set default font
//that would be used for this project "poppins" and also color "accent"

function App() {
  return <RouterProvider router={router} />;
}

export default App;
