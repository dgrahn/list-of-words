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

    expect(screen.getByText("A List of")).toBeInTheDocument()
    expect(screen.getByText("Extraordinary")).toBeInTheDocument()
    expect(screen.getByText("Words")).toBeInTheDocument()
    expect(screen.getByText("by Dan Grahn & Co.")).toBeInTheDocument()
  })

  it("categorizes and displays words by letter", () => {
    render(<IndexPage data={mockData} />)

    // Check for category dividers
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()

    // Check for words
    expect(screen.getByText("apple")).toBeInTheDocument()
    expect(screen.getByText("apricot")).toBeInTheDocument()
    expect(screen.getByText("banana")).toBeInTheDocument()
    expect(screen.getByText("cherry")).toBeInTheDocument()
  })

  it("displays the correct wiktionary links", () => {
    render(<IndexPage data={mockData} />)

    const appleLink = screen.getByText("apple").closest("a")
    expect(appleLink).toHaveAttribute("href", "http://en.wiktionary.org/wiki/apple")

    const cherryLink = screen.getByText("cherry").closest("a")
    expect(cherryLink).toHaveAttribute("href", "http://en.wiktionary.org/wiki/cherry")
  })

  it("displays the copyright and build time in the footer", () => {
    render(<IndexPage data={mockData} />)

    expect(screen.getByText(/© Dan Grahn | 2023-10-27/)).toBeInTheDocument()
  })
})
