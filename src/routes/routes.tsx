import { createBrowserRouter } from "react-router-dom";
import Feed from "../page/feed/feed.component";
import Post from "../page/post/post.component";
import App from "../App";
import NotFound from "../page/not-found/not-found.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/:id",
        element: <Post />,
      },
    ],
  },
  {
    path:'*',
    element:<NotFound />,
  }
]);

export default router;
