import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Hero from "../Landing_page/home/Hero";

test("Hero component renders", () => {
  render(<Hero />);

  expect(document.body).toBeInTheDocument();
});