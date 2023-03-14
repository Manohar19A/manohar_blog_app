
// import './App.css';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Single from './pages/Single';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Write from './pages/Write';
import './style.scss'
import { AuthContextProvider } from "./pages/authContext";
// import { Children } from 'react';
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/write",
          element: <Write />,
        },
        {
          path: "/post/:id",
          element: <Single />,
        },
      ]

    },
    {
      path: "/login",
      element: <Login />,
    },
    , {
      path: "/register",
      element: <Register />,
    },
  ])

  return (
   
      <div className="app">
        <div className="container">
          <RouterProvider router={router} />
        </div>
      </div>
  

  );
}

export default App;
