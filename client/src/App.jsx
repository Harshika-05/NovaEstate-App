import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import {Layout , RequireAuth } from "./routes/layout/layout.jsx";
import SinglePage from "./routes/singlePage/singlePage.jsx";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage.jsx";
import NewPostPage from "./routes/newPostPage/newPostPage.jsx";
import { singlePageLoader , listPageLoader, profilePageLoader } from "./lib/loaders.js";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage/>,
          loader : listPageLoader,
        },
        {
          path:"/:id",
          element:<SinglePage/>,
          loader : singlePageLoader,
        },
      
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
      ],
    },
    {
      path : "/",
      element : <RequireAuth/>,
      children : [
        {
          path:"/profile",
          element:<ProfilePage/>,
          loader : profilePageLoader
        },
        {
          path : "/profile/update",
          element : <ProfileUpdatePage/>,
          
        },
        {
          path : "/add",
          element : <NewPostPage/>,
          
        },
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
