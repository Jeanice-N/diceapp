import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { fetchEvents } from "../actions/eventsActions";

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
    <div>
      <form onSubmit={handleOnChange}>
        <TextField
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
        <Button variant="contained" type="submit" color="primary">
          Search
        </Button>
      </form>
      <Typography>Upcoming events as Venue</Typography>
    </div>
  );
}
