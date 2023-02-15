import React from "react";
import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
const EventDetail = () => {
  const data = useRouteLoaderData("event-detail");
  return (
    <div>
      <EventItem event={data.event} />
    </div>
  );
};

export default EventDetail;

export const loader = async ({ request, params }) => {
  const id = params.eventsId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "Could not fetch details" }, { status: 500 });
  }
  return response;
};

export const action = async ({ request, params }) => {
  const id = params.eventsId;
  const response = await fetch(`http://localhost:8080/events/` + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event " }, { status: 500 });
  }
  return redirect("/events");
};
