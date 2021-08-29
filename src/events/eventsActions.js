import axios from "axios";

/**
 * Returns events for given venue
 * @param {string} venue - Name of venue
 */
export async function fetchEvents(venue) {
  const config = { "X-Api-Key": "dHmvC0ZXzF4h1mWldfur13c6s4Ix6wCF4OTzozXC" };

  const { data } = await axios.get(
    `https://events-api.dice.fm/v1/events?filter[venues]=${venue}&page[size]=12`,
    { headers: config }
  );

  return data;
}

export default fetchEvents;
