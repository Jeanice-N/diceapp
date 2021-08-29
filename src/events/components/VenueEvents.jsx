import React from "react";
import PropTypes from "prop-types";
import { EventsRow, Header } from "../eventsStyles";
import Event from "./Event";

export default function VenueEvents({ venue, events }) {
  return (
    <>
      <Header variant="h5">{`Upcoming events at ${venue}`}</Header>
      <EventsRow>
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </EventsRow>
    </>
  );
}

VenueEvents.propTypes = {
  venue: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};
