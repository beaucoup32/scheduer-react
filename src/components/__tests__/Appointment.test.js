import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment/index";

afterEach(cleanup);

describe("Appointment Component", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("doesnt call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });

   it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
   });
});
