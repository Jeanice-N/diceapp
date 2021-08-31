import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react";
import Events from "../../events/components/Events";

jest.mock("../../events/components/EventsResult", () => () => (
  <div data-testid="mockEventsResult" />
));

describe("<Events/>", () => {
  let setup;

  beforeEach(() => {
    setup = () => {
      const component = () => <Events />;
      return render(component());
    };
  });

  afterEach(jest.resetAllMocks);

  it("should render without crashing", () => {
    const { container } = setup();
    expect(container).toBeTruthy();
  });

  it("should render search bar", () => {
    const { container } = setup();
    const textField = container.querySelector("input");

    expect(textField).toBeTruthy();
  });

  it("should display Venue text", () => {
    const { getAllByText } = setup();

    expect(getAllByText("Venue")).toBeTruthy();
  });

  it(`Given I enter a venue
        And there are events
        When I click Search
        Then I should see EventResults`, async () => {
    const { container, getByText, getByTestId } = setup();
    const searchField = container.querySelector("input");
    const searchButton = getByText("Search");

    fireEvent.change(searchField, { target: { value: "Roundhouse" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByTestId("mockEventsResult")).toBeTruthy();
    });
  });

  it(`Given I see EventsResult
        When I click the clear button
        Then search field should be cleared
        And EventsResults should not display`, async () => {
    const { container, getByText, getByTestId } = setup();

    const searchField = container.querySelector("input");
    const searchButton = getByText("Search");
    const clearButton = getByTestId("clearBtn");

    fireEvent.change(searchField, { target: { value: "Roundhouse" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByTestId("mockEventsResult")).toBeTruthy();
    });

    fireEvent.click(clearButton);

    expect(() => getByTestId("mockEventsResult")).toThrowError();
    expect(() => getByText("Roundhouse")).toThrowError();
  });

  it(`Given I did not enter a venue
        When I click search button
        Then I should get validation error`, async () => {
    const { getByText } = setup();

    const searchButton = getByText("Search");

    fireEvent.click(searchButton);

    expect(getByText("Venue name is required")).toBeTruthy();
  });

  it(`Given I entered a venue
        And there are no events
        Then No Results should display`, async () => {
    const { container, getByText } = setup();
    const searchField = container.querySelector("input");
    const searchButton = getByText("Search");

    fireEvent.change(searchField, { target: { value: "Invalid venue" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByText("No results")).toBeTruthy();
    });
  });

  it(`Given I see EventsResult
        And there are more results
        Then Load more button should display`, async () => {
    const { container, getByText, getByTestId } = setup();

    const searchField = container.querySelector("input");
    const searchButton = getByText("Search");

    fireEvent.change(searchField, { target: { value: "Roundhouse" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getByTestId("mockEventsResult")).toBeTruthy();
      expect(getByText("Load More")).toBeTruthy();
    });
  });
});
