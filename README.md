# Business Registration Portal

A Next.js application for streamlined business registration process.

## Features

- Multi-step business registration flow
- Modern UI components with shadcn/ui
- TypeScript for type safety


## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components


## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── register/          # Registration flow
│   │   ├── [step]/       # Dynamic step pages
│   │   └── page.tsx      # Main registration page
│   └── dashboard/        # Dashboard view
├── components/            # React components
│   ├── forms/            # Form components
│   ├── modals/           # Modal dialogs
│   ├── cards/            # Card components
│   └── founders/         # Founder-related components
└── lib/                  # Utility functions and types
    ├── validators/       # Form validation schemas
    ├── helpers/          # Helper functions
    └── types/            # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd business-registration
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Adding New Components

To add a new shadcn component:

```bash
npx shadcn add <component-name>
```

### File Structure Conventions

- Place page components in the appropriate directory under `src/app`
- Add reusable components in `src/components`
- Keep form validation schemas in `src/lib/validators`
- Add TypeScript interfaces in `src/lib/types`
- Place utility functions in `src/lib/helpers`

### Code Style

- Use TypeScript for all new files
- Follow the existing project structure
- Use meaningful component and function names
- Add JSDoc comments for complex functions
- Keep components focused and modular

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Write meaningful commit messages
- Update documentation for significant changes
- Add tests for new features
- Follow the existing code style
- Keep pull requests focused and atomic


## Support

For support, please open an issue in the repository.
