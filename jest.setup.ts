import "@testing-library/jest-dom";

// Extend the expect interface to properly type the custom matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string, options?: { exact: boolean }): R;
      toHaveStyle(css: Record<string, any>): R;
    }
  }
}
