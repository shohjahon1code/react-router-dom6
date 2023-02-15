import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function Events() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
    <Await resolve={events}>
      {(loadedData) => <EventsList events={loadedData} />}
    </Await>

    </Suspense>
  );
}

export default Events;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch data" },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
