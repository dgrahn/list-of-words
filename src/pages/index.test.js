import React from "react"
import { render, screen } from "@testing-library/react"
import IndexPage from "./index"

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("IndexPage", () => {
  const mockData = {
    allWordDefinition: {
      nodes: [
        { word: "apple", partOfSpeech: "noun", definition: "A round fruit." },
        { word: "apricot", partOfSpeech: "noun", definition: "An orange fruit." },
        { word: "banana", partOfSpeech: "noun", definition: "A long yellow fruit." },
        { word: "cherry", partOfSpeech: "noun", definition: "A small red fruit." },
      ],
    },
    site: {
      buildTime: "2023-10-27",
    },
  }

  it("renders correctly with extraordinary words header", () => {
    render(<IndexPage data={mockData} />)

    expect(screen.getByText(/A list of/)).toBeInTheDocument()
    expect(screen.getByText(/Extraordinary/)).toBeInTheDocument()
    expect(screen.getByText(/Words/)).toBeInTheDocument()
    expect(screen.getByText(/By Dan Grahn & Company/)).toBeInTheDocument()
  })

  it("categorizes and displays words by letter", () => {
    render(<IndexPage data={mockData} />)

    // Check for category headers
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
    expect(screen.getByText("C")).toBeInTheDocument()

    // Check for words
    expect(screen.getByText("apple")).toBeInTheDocument()
    expect(screen.getByText("apricot")).toBeInTheDocument()
    expect(screen.getByText("banana")).toBeInTheDocument()
    expect(screen.getByText("cherry")).toBeInTheDocument()

    // Check for definitions
    expect(screen.getByText("A round fruit.")).toBeInTheDocument()
  })

  it("displays the copyright and build time in the footer", () => {
    render(<IndexPage data={mockData} />)

    expect(screen.getByText("© Dan Grahn")).toBeInTheDocument()
    expect(screen.getByText("2023-10-27")).toBeInTheDocument()
  })
})
