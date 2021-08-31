import React from "react";

import { render } from "@testing-library/react";
import EventsResult from "../../events/components/EventsResult";

jest.mock("../../events/components/Event", () => () => (
  <div data-testid="mockEvent" />
));

describe("<EventsResult/>", () => {
  let setup;
  const props = {
    venue: "Roundhouse",
    events: [
      {
        id: 1,
        name: "Event A",
      },
      {
        id: 2,
        name: "Event B",
      },
    ],
  };

  beforeEach(() => {
    setup = () => {
      const component = () => <EventsResult {...props} />;
      return render(component());
    };
  });

  afterEach(jest.resetAllMocks);

  it("should render without crashing", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it("should display venue name", () => {
    const { getByText } = setup();
    expect(getByText("Upcoming events at Roundhouse")).toBeTruthy();
  });

  it("should display events", () => {
    const { getAllByTestId } = setup();
    expect(getAllByTestId("mockEvent")).toBeTruthy();
    expect(getAllByTestId("mockEvent").length).toBe(2);
  });
});
