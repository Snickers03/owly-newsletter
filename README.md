<!DOCTYPE html>
<html lang="en">
<body>
  <div align="center">

# 📬 Owly Newsletter

**Create and schedule your very own custom newsletters with weather updates, crypto prices, and daily quotes.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables)

</div>

## 🚀 Features

<table>
  <tr>
    <td width="50%">
      <h3>🌤️ Weather Forecasts</h3>
      <p>Get current weather and forecasts from <a href="https://openweathermap.org/">OpenWeatherMap</a> (or your favorite API).</p>
    </td>
    <td width="50%">
      <h3>💰 Crypto Prices</h3>
      <p>Fetch real-time data for Bitcoin, Ethereum, and other top cryptocurrencies via <a href="https://coinmarketcap.com/api/">CoinMarketCap</a>.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>💬 Daily Quotes</h3>
      <p>Spice up your day with inspiring, funny, or thought-provoking quotes.</p>
    </td>
    <td width="50%">
      <h3>⏱️ Custom Intervals</h3>
      <p>Schedule newsletters hourly, daily, or weekly—tailor the frequency to your needs.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔐 User Authentication</h3>
      <p>Secure signup, login, and session management with Prisma and Argon2.</p>
    </td>
    <td width="50%">
      <h3>🔄 Drag‑and-Drop Layout</h3>
      <p>Use <code>@dnd-kit</code> to reorder modules (weather, crypto, quotes) with ease.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>📧 Rich Templating</h3>
      <p>Build email layouts with <code>@react-email/components</code> and send via Resend.</p>
    </td>
    <td width="50%">
      <h3>📊 Analytics</h3>
      <p>Track opens, clicks, and user behavior with PostHog.</p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <h3>🖼️ Image Uploads</h3>
      <p>Attach images to your newsletter modules using UploadThing.</p>
    </td>
  </tr>
</table>

  <section id="tech-stack" class="container">
    <h2>📦 Tech Stack</h2>
    <table>
      <tr><th>Area</th><th>Tools</th></tr>
      <tr><td>Framework</td><td>Next.js 15</td></tr>
      <tr><td>Styling</td><td>Tailwind CSS + shadncn</td></tr>
      <tr><td>Forms</td><td>React Hook Form + Zod</td></tr>
      <tr><td>State Mgmt</td><td>Zustand & React Query</td></tr>
      <tr><td>DB</td><td>PostgreSQL</td></tr>
      <tr><td>Email</td><td>React Email + Resend</td></tr>
      <tr><td>API Clients</td><td>CoinMarketCap, OpenWeatherMap</td></tr>
      <tr><td>Uploads</td><td>UploadThing</td></tr>
      <tr><td>Analytics</td><td>PostHog</td></tr>
    </table>
  </section>

  <section id="getting-started">
    <h2>🎯 Getting Started</h2>
    <pre><code>git clone https://github.com/snickers03/owly-newsletter.git
cd owly-newsletter</code></pre>
    <pre><code>pnpm install</code></pre>
    <pre><code>cp .env.example .env.local</code></pre>
    <pre><code>npx prisma db push</code></pre>
    <pre><code>pnpm dev</code></pre>
  </section> 
  
  
  <section id="environment-variables">
    <h2>🔐 Environement Variables</h2>
    <pre><code>NEXT_PUBLIC_BASE_URL=
DATABASE_URL=
RESEND_API_KEY=
UPLOADTHING_TOKEN=
COINMARKET_API_KEY=
WEATHER_API_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=</code></pre>
  </section>

  <div align="center">
    &copy; 2025 Owly Newsletter • MIT License
  </div>
</body>
</html>
