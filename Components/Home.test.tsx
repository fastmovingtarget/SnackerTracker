//2025-06-03 : Creating file and initialising a basic render
import React from "react";
import { render } from "@testing-library/react-native";
import Home from "./Home";

describe("Home Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Welcome to the Home Screen!")).toBeTruthy();
  });
});