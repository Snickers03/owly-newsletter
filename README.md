# 📬 Owly Newsletter

**Create and schedule your very own custom newsletters with weather updates, crypto prices, and daily quotes.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Scripts](#️-scripts-reference) • [Environment Variables](#-environment-variables)

## 🚀 Features

|                                                                                                                                            |                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **🌤️ Weather Forecasts** <br> Get current weather and forecasts from [OpenWeatherMap](https://openweathermap.org/) (or your favorite API). | **💰 Crypto Prices** <br> Fetch real-time data for Bitcoin, Ethereum, and other top cryptocurrencies via CoinMarketCap. |
| **💬 Daily Quotes** <br> Spice up your day with inspiring, funny, or thought-provoking quotes.                                             | **⏱️ Custom Intervals** <br> Schedule newsletters hourly, daily, or weekly—tailor the frequency to your needs.          |
| **🔐 User Authentication** <br> Secure signup, login, and session management with Prisma and Argon2.                                       | **🔄 Drag‑and-Drop Layout** <br> Use `@dnd-kit` to reorder modules (weather, crypto, quotes) with ease.                 |
| **📧 Rich Templating** <br> Build email layouts with `@react-email/components` and send via Resend.                                        | **📊 Analytics** <br> Track opens, clicks, and user behavior with PostHog.                                              |
| **🖼️ Image Uploads** <br> Attach images to your newsletter modules using UploadThing.                                                      |                                                                                                                         |

## 📦 Tech Stack

| Area        | Tools                                 |
| ----------- | ------------------------------------- |
| Framework   | Next.js 15 + Turbopack                |
| Styling     | Tailwind CSS + sonner, tw-animate-css |
| Forms       | React Hook Form + Zod                 |
| State Mgmt  | Zustand & React Query                 |
| Auth        | tRPC + Prisma + Argon2                |
| DB          | PostgreSQL (NeonDB)                   |
| Email       | React Email + Resend                  |
| API Clients | CoinMarketCap, OpenWeatherMap         |
| Uploads     | UploadThing + @uploadthing/react      |
| Analytics   | PostHog                               |

## 🎯 Getting Started

\`\`\`bash
git clone https://github.com/snickers03/owly-newsletter.git
cd owly-newsletter
\`\`\`

\`\`\`bash
pnpm install
\`\`\`

\`\`\`bash
cp .env.example .env.local
\`\`\`

\`\`\`bash
npx prisma db push
\`\`\`

\`\`\`bash
pnpm dev
\`\`\`

## ⚙️ Scripts Reference

| Command         | Description                     |
| --------------- | ------------------------------- |
| dev             | Start dev server with Turbopack |
| build           | Build for production            |
| start           | Start production server         |
| lint            | Run ESLint                      |
| test            | Run Jest tests                  |
| test:watch      | Run tests in watch mode         |
| email:dev       | Start React Email dev server    |
| prisma:studio   | Open Prisma Studio              |
| prisma:generate | Generate Prisma client          |
| prisma:push     | Push schema changes             |

## 🔐 Environment Variables

\`\`\`
NEXT_PUBLIC_BASE_URL=
DATABASE_URL=
\`\`\`

---

&copy; 2025 Owly Newsletter • MIT License
\`\`\`

The README.md file has been properly formatted with Markdown syntax. I've:

1. Converted the HTML structure to Markdown
2. Maintained all the content and sections
3. Properly formatted the tables using Markdown syntax
4. Removed HTML-specific elements like scripts and divs
5. Preserved all links and formatting
6. Formatted code blocks with appropriate syntax highlighting

<Actions>
  <Action name="Add more environment variables" description="Add additional environment variables needed for the project" />
  <Action name="Create a contributing guide" description="Add a CONTRIBUTING.md file with guidelines for contributors" />
  <Action name="Add installation instructions" description="Expand the getting started section with more detailed instructions" />
  <Action name="Create a license file" description="Add a LICENSE file to the project" />
  <Action name="Add screenshots" description="Include screenshots of the application in the README" />
</Actions>

\`\`\`
