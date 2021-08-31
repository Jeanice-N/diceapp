import React from "react";
import { render } from "@testing-library/react";
import Event from "../../events/components/Event";

describe("<Event/>", () => {
  let setup;
  let initialProps;

  beforeEach(() => {
    initialProps = {
      event: {
        event_images: {
          landscape: "landscape.jpg",
          square: "square.jpg",
        },
        date: "2021-01-29T12:00:00Z",
        name: "Event name",
        description: "Event desc",
        location: {
          city: "London",
          country: "England",
        },
        venue: "Roundhouse",
        lineup: [
          {
            details: "Artist",
            time: "7:00 PM",
          },
        ],
        ticket_types: [
          {
            id: 1,
            name: "GA",
            price: { total: 60 },
            sold_out: false,
          },
        ],
        sold_out: false,
        featured: true,
        sale_start_date: "2999-01-01T12:00:00Z",
        sale_end_date: "2021-01-28T12:00:00Z",
        spotify_tracks: [{ preview_url: "track.mp3" }],
        apple_music_tracks: [],
      },
    };

    setup = () => {
      const component = () => <Event {...initialProps} />;
      return { ...render(component()), props: initialProps };
    };
  });

  it("should render without crashing", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it(`Given event is featured
      Then should display featured badge`, () => {
    const { getByText } = setup();
    expect(getByText("FEATURED")).toBeTruthy();
  });

  it(`Given event is not on sale yet
      And event is not featured
      Then display On Sale badge`, () => {
    initialProps.event.featured = false;
    const { getByText } = setup();
    expect(getByText("On sale 1 Jan 12:00 PM")).toBeTruthy();
    expect(() => getByText("FEATURED")).toThrowError();
  });

  it(`Given event has audio
      Then play button should be displayed`, () => {
    const { getByTestId } = setup();
    expect(getByTestId("playBtn")).toBeTruthy();
  });

  it(`Given event has image
      Then should display thumbnail`, () => {
    const { container } = setup();
    expect(container.querySelector("img").src).toEqual(
      expect.stringContaining("landscape.jpg")
    );
  });

  it(`Given event 
      Then should display details`, () => {
    const { getByText } = setup();
    expect(getByText("Event name")).toBeTruthy();
    expect(getByText("Roundhouse")).toBeTruthy();
    expect(getByText("London, England")).toBeTruthy();
  });

  it(`Given event more info is expanded
    Then should display more info`, () => {
    const { getByText } = setup();
    expect(getByText("Event desc")).toBeTruthy();
    expect(getByText("Artist")).toBeTruthy();
    expect(getByText("— 7:00 PM")).toBeTruthy();
    expect(getByText("GA")).toBeTruthy();
    expect(getByText("— £60")).toBeTruthy();
  });

  it(`Given event is sold out
      Then should display sold out`, () => {
    initialProps.event.sold_out = true;
    const { getByText } = setup();
    expect(getByText("sold out")).toBeTruthy();
  });
});
