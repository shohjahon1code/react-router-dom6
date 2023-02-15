import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EditEvent from "./routes/EditEvent";
import Error from "./routes/Error";
import EventDetail, {
  loader as EventLoader,
  action as deleteAction,
} from "./routes/EventDetail";
import Events, { loader } from "./routes/Events";
import EventsRoot from "./routes/EventsRoot";
import Home from "./routes/Home";
import NewEvent from "./routes/NewEvent";
import Root from "./routes/Root";
import { action } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./routes/NewsLetter";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventsRoot />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: loader,
          },
          {
            path: ":eventsId",
            id: "event-detail",
            loader: EventLoader,
            children: [
              { index: true, element: <EventDetail />, action: deleteAction },
              { path: "edit", element: <EditEvent />, action: action },
            ],
          },
          { path: "new", element: <NewEvent />, action: action },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={route} />;
}

export default App;
