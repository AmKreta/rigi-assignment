import { createBrowserRouter } from "react-router-dom";
import Feed from "../page/feed/feed.component";
import DetailedPost from "../page/post/detailedPost.component";
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
        element: <DetailedPost />,
      },
    ],
  },
  {
    path:'*',
    element:<NotFound />,
  }
]);

export default router;
