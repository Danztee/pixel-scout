# Pixel Scout 🎨

A curated collection of app UI screenshots to inspire designers and developers. Pixel Scout helps you level up your designs with handpicked UI references from top iOS and Android applications.

![Pixel Scout](https://via.placeholder.com/800x400?text=Pixel+Scout)

## 🚀 Features

- **Curated UI Screenshots**: Handpicked collection of beautiful UI designs
- **Platform Filtering**: Browse designs specifically for iOS or Android
- **Modern Interface**: Clean, responsive UI built with Next.js and Tailwind CSS
- **Open Source**: Freely available to use, modify, and contribute

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Lenis for smooth scrolling
- **UI Components**: Built with Radix UI primitives and Shadcn UI
- **API Routes**: Next.js API routes
- **Authentication**: Auth.js (NextAuth)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Testing**: Jest and React Testing Library

## 📋 Prerequisites

- Node.js 18.0 or later
- pnpm (required)

## 🔧 Installation

1. Clone the repository

```bash
git clone https://github.com/opendesigners/pixel-scout.git
cd pixel-scout
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧩 Project Structure

```
pixel-scout/
├── public/         # Static assets like images and icons
├── src/
│   ├── app/        # Next.js app directory containing routes
│   ├── components/ # Reusable React components
│   ├── lib/        # Utility functions and shared code
│   ├── db/         # Database schema
│   └── __tests__/  # Test files for components and functionality
├── .env            # Environment variables (create from .env.example)
└── ...            # Config files
```

## 🧪 Testing

The project uses Jest and React Testing Library for testing UI components and functionality.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode (useful during development)
pnpm test:watch
```

### Writing Tests

Tests are located in the `src/__tests__/` directory and follow the naming convention of `ComponentName.test.tsx`.

Example test structure:

```tsx
import { render, screen } from "@testing-library/react";
import Component from "@/components/Component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("Some text")).toBeInTheDocument();
  });
});
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/) format (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Acknowledgments

- [Next.js](https://nextjs.org) - The React Framework for the Web
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) - Unstyled, accessible UI components
- [Drizzle ORM](https://orm.drizzle.team) - TypeScript ORM for SQL databases
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - React DOM testing utilities

---

Made with ❤️ by [Open Designers](https://github.com/open-designers)
