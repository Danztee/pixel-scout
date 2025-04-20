import { render, screen } from "@testing-library/react";
import Header from "@/components/header";

// Mock the Navbar component since we just want to test Header
jest.mock("@/components/navbar", () => {
  return function MockNavbar() {
    return <div data-testid="navbar-mock">Navbar Mock</div>;
  };
});

// Mock the background image
jest.mock("@/public/background.png", () => ({
  src: "/mocked-background.png",
}));

describe("Header Component", () => {
  it("renders the Header with children", () => {
    render(
      <Header>
        <div data-testid="test-child">Test Child Content</div>
      </Header>
    );

    // Check if the child content is rendered
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();

    // Check if the navbar is rendered
    expect(screen.getByTestId("navbar-mock")).toBeInTheDocument();
  });

  it("has the correct background style", () => {
    render(
      <Header>
        <div>Test Content</div>
      </Header>
    );

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveStyle({
      backgroundImage: "url(/mocked-background.png)",
      backgroundSize: "cover",
      backgroundPosition: "bottom",
      height: "100%",
    });
  });
});
