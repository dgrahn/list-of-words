import * as React from "react"
import { render, screen } from "@testing-library/react"
import NotFoundPage from "./404"

// Mock gatsby
jest.mock("gatsby", () => {
  const React = require("react")
  return {
    ...jest.requireActual("gatsby"),
    Link: jest.fn().mockImplementation(({ to, ...rest }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
    ),
  }
})

describe("NotFoundPage", () => {
  it("renders correctly", () => {
    render(<NotFoundPage />)

    expect(screen.getByText("Page not found")).toBeInTheDocument()
    expect(screen.getByLabelText("Pensive emoji")).toBeInTheDocument()
    expect(screen.getByText("Go home")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute("href", "/")
  })

  it("shows development message only in development environment", () => {
    const originalEnv = process.env.NODE_ENV

    // Test production
    process.env.NODE_ENV = "production"
    const { rerender } = render(<NotFoundPage />)
    expect(screen.queryByText(/Try creating a page in/)).not.toBeInTheDocument()

    // Test development
    process.env.NODE_ENV = "development"
    rerender(<NotFoundPage />)
    expect(screen.getByText(/Try creating a page in/)).toBeInTheDocument()
    expect(screen.getByText("src/pages/")).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
})
