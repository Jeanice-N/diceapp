import React from "react";
import PropTypes from "prop-types";
import { EventsRow, Header } from "../eventsStyles";
import Event from "./Event";
import { sortEvents } from "../eventsUtils";

export default function VenueEvents({ venue, events }) {
  const sortedEvents = sortEvents(events);
  return (
    <>
      <Header variant="h5">{`Upcoming events at ${venue}`}</Header>
      <EventsRow>
        {sortedEvents.map((event) => (
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
