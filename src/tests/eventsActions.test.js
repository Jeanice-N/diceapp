import moxios from "moxios";
import { fetchEvents } from "../events/eventsActions";

describe("fetchEvents", () => {
  const VENUE = "Roundhouse";
  const REQUEST = `https://events-api.dice.fm/v1/events?filter[venues]=${VENUE}&page[size]=12`;
  const NEXT_LINK = `${REQUEST}&page[number]=2`;

  const RESPONSE = {
    data: [
      {
        name: "Event A",
      },
      {
        name: "Event B",
      },
    ],
    links: {
      next: NEXT_LINK,
      self: REQUEST,
    },
  };

  beforeEach(() => {
    moxios.install();
    moxios.stubRequest(REQUEST, {
      status: 200,
      response: RESPONSE,
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it(`Given venue and no nextLink
    And successful response
    Then return events`, async () => {
    expect(await fetchEvents(VENUE)).toEqual(RESPONSE);
  });

  it(`Given venue and nextLink
    And successful response
    Then should return next events`, async () => {
    const nextResponse = {
      data: [
        {
          name: "Event C",
        },
      ],
      links: {
        next: null,
        self: NEXT_LINK,
      },
    };

    moxios.stubRequest(NEXT_LINK, {
      status: 200,
      response: nextResponse,
    });

    expect(await fetchEvents(VENUE, NEXT_LINK)).toEqual(nextResponse);
  });

  it(`Given error response
    Then should return empty events`, async () => {
    moxios.stubRequest(NEXT_LINK, {
      status: 400,
    });

    expect(await fetchEvents(VENUE, NEXT_LINK)).toEqual([]);
  });
});
