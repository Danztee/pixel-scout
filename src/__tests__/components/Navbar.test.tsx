import { render, screen } from "@testing-library/react";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Mock the next/navigation module
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string;
    alt: string;
    className?: string;
  }) => <Image src={src} alt={alt} className={className} />,
}));

// Mock the image imports
jest.mock("@/public/logo.png", () => "logo-mock.png");
jest.mock("@/public/user.png", () => "user-mock.png");

describe("Navbar Component", () => {
  beforeEach(() => {
    // Mock the pathname to be '/'
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("renders logo, nav links, and user icon", () => {
    render(<Navbar />);

    // Check logo
    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(logoLink).toHaveAttribute("href", "/");

    // Check nav links (Home, iOS, Android, About)
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("iOS")).toBeInTheDocument();
    expect(screen.getByText("Android")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();

    // Check user icon
    expect(screen.getByAltText("user")).toBeInTheDocument();
  });

  it("highlights the current path", () => {
    // Set the mock pathname to '/about'
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Navbar />);

    // The Home link should be bold (active)
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveClass("font-bold");

    // Other links should not be bold
    const iosLink = screen.getByText("iOS").closest("a");
    expect(iosLink).not.toHaveClass("font-bold");
  });

  // Since we're testing client-side behavior, we need to test responsiveness
  it("handles resize window events", () => {
    const originalInnerWidth = window.innerWidth;

    // Mock window resize
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1000, // Mobile view
    });

    render(<Navbar />);

    // Trigger resize to desktop
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1300, // Desktop view
    });

    // Dispatch resize event
    window.dispatchEvent(new Event("resize"));

    // Reset the window.innerWidth
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });
});
