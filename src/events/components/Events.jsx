import React, { useState } from "react";
import { InputAdornment, IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fetchEvents } from "../eventsActions";
import {
  Form,
  Header,
  SearchButton,
  SearchField,
  Wrapper,
} from "../eventsStyles";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [venue, setVenue] = useState("");

  const handleOnChange = async (e) => {
    e.preventDefault();
    setEvents(await fetchEvents(venue));
  };

  const handleOnClear = async (e) => {
    setVenue("");
    setEvents(await fetchEvents(""));
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
      {venue && <Header variant="h5">{`Upcoming events at ${venue}`}</Header>}
    </Wrapper>
  );
}
