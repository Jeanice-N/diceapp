import axios from "axios";

/**
 * Returns events for given venue
 * @param {string} venue - Name of venue
 * @param {string|null} nextLink - Api link of next results
 */
export async function fetchEvents(venue, nextLink = null) {
  const config = { "X-Api-Key": "dHmvC0ZXzF4h1mWldfur13c6s4Ix6wCF4OTzozXC" };

  const url =
    nextLink ??
    `https://events-api.dice.fm/v1/events?filter[venues]=${venue}&page[size]=12`;

  const { data } = await axios.get(url, { headers: config });

  return data;
}

export default fetchEvents;
