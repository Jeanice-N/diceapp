import React, { useState } from "react";
import { InputAdornment, IconButton, Button } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fetchEvents } from "../eventsActions";
import {
  Form,
  LoadMoreWrapper,
  SearchButton,
  SearchField,
  Wrapper,
} from "../eventsStyles";
import VenueEvents from "./VenueEvents";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [nextLink, setNextLink] = useState(null);
  const [venue, setVenue] = useState("");

  const handleOnChange = async (e) => {
    e.preventDefault();
    const firstEvents = await fetchEvents(venue);
    setEvents(firstEvents.data);
    setNextLink(firstEvents?.links?.next);
  };

  const handleOnClear = async (e) => {
    setVenue("");
    setEvents([]);
  };

  const handleLoadMore = async (e) => {
    e.preventDefault();
    const nextEvents = await fetchEvents(venue, nextLink);
    setEvents(events.concat(nextEvents.data));
    setNextLink(nextEvents?.links?.next);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleOnChange}>
        <SearchField
          label="Venue"
          variant="outlined"
          fullWidth
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleOnClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SearchButton variant="contained" type="submit" color="primary">
          Search
        </SearchButton>
      </Form>
      {Boolean(venue && events.length) && (
        <VenueEvents venue={venue} events={events} />
      )}

      {nextLink && (
        <LoadMoreWrapper>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </LoadMoreWrapper>
      )}
    </Wrapper>
  );
}
