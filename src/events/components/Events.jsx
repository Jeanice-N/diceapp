import React, { useState, useEffect } from "react";
import {
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fetchEvents } from "../eventsActions";
import {
  Form,
  LoadMoreWrapper,
  NoResultsWrapper,
  SearchButton,
  SearchField,
  Wrapper,
} from "../eventsStyles";
import EventsResult from "./EventsResult";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [nextLink, setNextLink] = useState(null);
  const [venue, setVenue] = useState("");
  const [isNoResults, setIsNoResults] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (!venue) {
      handleOnClear();
    }
  }, [venue]);

  const handleOnChange = async (e) => {
    e.preventDefault();

    if (!venue) {
      setError(true);
      return;
    }

    const firstEvents = await fetchEvents(venue);
    if (!firstEvents.data.length) setIsNoResults(true);

    setEvents(firstEvents.data);
    setNextLink(firstEvents?.links?.next);
    setError(false);
  };

  const handleOnClear = () => {
    setVenue("");
    setEvents([]);
    setNextLink(null);
    setIsNoResults(false);
    setError(false);
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
                <IconButton onClick={handleOnClear} data-testid="clearBtn">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={isError}
          helperText={isError && "Venue name is required"}
        />
        <SearchButton variant="contained" type="submit" color="primary">
          Search
        </SearchButton>
      </Form>

      {isNoResults && (
        <NoResultsWrapper>
          <Typography variant="h4">No results</Typography>
        </NoResultsWrapper>
      )}

      {Boolean(venue && events.length) && (
        <EventsResult venue={venue} events={events} />
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
