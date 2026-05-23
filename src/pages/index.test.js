import React from "react"
import { render, screen } from "@testing-library/react"
import IndexPage from "./index"

describe("IndexPage", () => {
  const mockData = {
    allWordsYaml: {
      nodes: [
        { word: "apple" },
        { word: "apricot" },
        { word: "banana" },
        { word: "cherry" },
      ],
    },
    site: {
      buildTime: "2023-10-27",
    },
  }

  it("renders correctly with extraordinary words header", () => {
    render(<IndexPage data={mockData} />)

    expect(screen.getByText(/A List Of/)).toBeInTheDocument()
    expect(screen.getByText(/Extraordinary/)).toBeInTheDocument()
    expect(screen.getByText(/Words/)).toBeInTheDocument()
    expect(screen.getByText(/BY DAN GRAHN/)).toBeInTheDocument()
    expect(screen.getByText(/& COMPANY/)).toBeInTheDocument()
  })

  it("categorizes and displays words by letter", () => {
    render(<IndexPage data={mockData} />)

    // Check for category dividers (h2)
    expect(screen.getByRole("heading", { name: "A", level: 2 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "B", level: 2 })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "C", level: 2 })).toBeInTheDocument()

    // Check for words
    expect(screen.getByText("apple")).toBeInTheDocument()
    expect(screen.getByText("apricot")).toBeInTheDocument()
    expect(screen.getByText("banana")).toBeInTheDocument()
    expect(screen.getByText("cherry")).toBeInTheDocument()
  })

  it("displays the copyright and build time in the footer", () => {
    render(<IndexPage data={mockData} />)

    expect(screen.getByText("© DAN GRAHN")).toBeInTheDocument()
    expect(screen.getByText("2023-10-27")).toBeInTheDocument()
  })
})
