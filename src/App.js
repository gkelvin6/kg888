import './App.css';
import { Login } from './Login.js';
import {Homepage} from './Homepage.js';
import { Layout,RequireAuth } from './layout.js';
import { Signup } from './Signup.js';
import { Record } from './Record.js';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { betLoader } from './loaders.js';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{
        path: "/",
          element: <Login />,
      },{
        path: "/kgsignup",
        element: <Signup/>
      },
    ],
    },     
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/bet",
          element: <Homepage />,
        },
        {
          path: "/record",
          element: <Record />,
          loader: betLoader,
        },
      ],
    },
    
  ]);
  
  return (
    // <BrowserRouter>
    // <Routes>
    //   <Navbar/>
    //   <Route path="/" element={<Login />}/>
    //   <Route path="/bet" element={<Homepage />}/>
    // </Routes>
    // </BrowserRouter>
    <RouterProvider router={router} />
  );
}

export default App;
