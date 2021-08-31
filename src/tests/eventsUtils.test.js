import {
  sortEvents,
  isOnSaleNow,
  getButtonText,
  getMinPrice,
  getAudioUrl,
} from "../events/eventsUtils";

describe("sortEvents", () => {
  it(`Given events array
    Then will return events sorted by featured first`, () => {
    const events = [
      {
        name: "Event B",
        featured: false,
      },
      {
        name: "Event A",
        featured: true,
      },
    ];

    const expected = [
      {
        name: "Event A",
        featured: true,
      },
      {
        name: "Event B",
        featured: false,
      },
    ];

    expect(sortEvents(events)).toEqual(expected);
  });
});

describe("isOnSaleNow", () => {
  it(`Given startDate and endDate
    When current date is within start date and end date
    Then will return true`, () => {
    const today = new Date();
    const startDate = "2021-01-29T12:00:00Z";
    const endDate = new Date().setDate(today.getDate() + 1);

    expect(isOnSaleNow(startDate, endDate)).toEqual(true);
  });

  it(`Given startDate and endDate
    When current date is before start date
    Then will return false`, () => {
    const today = new Date();
    const date = new Date().setDate(today.getDate() + 1);

    expect(isOnSaleNow(date, date)).toEqual(false);
  });

  it(`Given startDate and endDate
    When current date is after end date
    Then will return false`, () => {
    const date = "2021-01-29T12:00:00Z";

    expect(isOnSaleNow(date, date)).toEqual(false);
  });
});

describe("getButtonText", () => {
  it(`Given event is sold out
    Then should return "sold out" string`, () => {
    const date = "2021-01-29T12:00:00Z";

    expect(getButtonText(date, date, true)).toEqual("sold out");
  });

  it(`Given current date is within start date and end date
    And event is not sold out
    Then should return "book now" string`, () => {
    const startDate = "2021-01-29T12:00:00Z";
    const endDate = new Date().setDate(new Date().getDate() + 1);

    expect(getButtonText(startDate, endDate, false)).toEqual("book now");
  });

  it(`Given event is not on sale
    And event is not sold out
    Then should return "get reminded" string`, () => {
    const date = new Date().setDate(new Date().getDate() + 1);

    expect(getButtonText(date, date, false)).toEqual("get reminded");
  });
});

describe("getMinPrice", () => {
  it(`Given ticketTypes array
    Then should return minimum price`, () => {
    const ticketTypes = [
      {
        price: {
          face_value: 10,
          fees: 20,
          total: 30,
        },
      },
      {
        price: {
          face_value: 15,
          fees: 5,
          total: 20,
        },
      },
    ];

    expect(getMinPrice(ticketTypes)).toEqual(20);
  });
});

describe("getAudioUrl", () => {
  it(`Given spotify or apple audio
    Then return url string`, () => {
    const spotify = [
      {
        preview_url: "spotifyUrl",
      },
    ];
    const apple = [];
    expect(getAudioUrl(spotify, apple)).toEqual("spotifyUrl");
  });

  it(`Given no spotify or apple audio
    Then return undefined`, () => {
    const spotify = [];
    const apple = [];
    expect(getAudioUrl(spotify, apple)).toEqual(undefined);
  });

  it(`Given both spotify and apple audio
    Then return first url string`, () => {
    const spotify = [
      {
        preview_url: "spotifyUrl",
      },
    ];
    const apple = [
      {
        preview_url: "appleUrl",
      },
    ];
    expect(getAudioUrl(spotify, apple)).toEqual("spotifyUrl");
  });
});
