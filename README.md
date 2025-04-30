<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Owly Newsletter</title>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --primary: #4f46e5;
      --bg: #f9fafb;
      --text: #374151;
      --code-bg: #1e293b;
      --code-text: #f8fafc;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    header {
      text-align: center;
      padding: 4rem 1rem;
      background-color: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    header h1 {
      font-size: 2.5rem;
      color: var(--primary);
    }
    header p {
      margin-top: 0.5rem;
      font-size: 1.1rem;
    }
    nav {
      margin-top: 1rem;
    }
    nav a {
      margin: 0 0.5rem;
      color: var(--primary);
      text-decoration: none;
      font-weight: 600;
    }
    .container {
      max-width: 960px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .feature, .tech {
      background: #fff;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    code {
      background: #e5e7eb;
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
      font-family: 'Source Code Pro', monospace;
    }
    pre {
      position: relative;
      background: var(--code-bg);
      color: var(--code-text);
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin-bottom: 2rem;
    }
    .copy-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--primary);
      border: none;
      color: #fff;
      padding: 0.3rem 0.6rem;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .copy-btn:active {
      transform: scale(0.95);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 2rem;
      background: #fff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    th, td {
      padding: 0.75rem 1rem;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    th {
      background: #f3f4f6;
      color: var(--text);
    }
    .footer {
      text-align: center;
      padding: 2rem 1rem;
      font-size: 0.9rem;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <header>
    <h1>📬 Owly Newsletter</h1>
    <p>Create and schedule your custom newsletters with weather updates, crypto prices, and daily quotes.</p>
    <nav>
      <a href="#features">Features</a>
      <a href="#tech-stack">Tech Stack</a>
      <a href="#getting-started">Getting Started</a>
      <a href="#scripts-reference">Scripts</a>
      <a href="#environment-variables">Env Vars</a>
    </nav>
  </header>

  <section id="features" class="container">
    <h2>🚀 Features</h2>
    <div class="grid-2">
      <div class="feature">
        <h3>🌤️ Weather Forecasts</h3>
        <p>Get current weather and forecasts from <a href="https://openweathermap.org/" target="_blank">OpenWeatherMap</a>.</p>
      </div>
      <div class="feature">
        <h3>💰 Crypto Prices</h3>
        <p>Fetch real-time data for Bitcoin, Ethereum, and more via CoinMarketCap.</p>
      </div>
      <div class="feature">
        <h3>💬 Daily Quotes</h3>
        <p>Spice up your day with inspiring or funny quotes.</p>
      </div>
      <div class="feature">
        <h3>⏱️ Custom Intervals</h3>
        <p>Schedule newsletters hourly, daily, or weekly.</p>
      </div>
      <div class="feature">
        <h3>🔐 User Auth</h3>
        <p>Secure signup, login, and session management with Prisma & Argon2.</p>
      </div>
      <div class="feature">
        <h3>🔄 Drag-and-Drop Layout</h3>
        <p>Reorder modules with <code>@dnd-kit</code>.</p>
      </div>
      <div class="feature">
        <h3>📧 Rich Templating</h3>
        <p>Build email layouts with <code>@react-email/components</code> and Resend.</p>
      </div>
      <div class="feature">
        <h3>📊 Analytics</h3>
        <p>Track opens, clicks, and behavior with PostHog.</p>
      </div>
      <div class="feature" style="grid-column: span 2;">
        <h3>🖼️ Image Uploads</h3>
        <p>Attach images using UploadThing.</p>
      </div>
    </div>
  </section>

  <section id="tech-stack" class="container">
    <h2>📦 Tech Stack</h2>
    <table>
      <tr><th>Area</th><th>Tools</th></tr>
      <tr><td>Framework</td><td>Next.js 15 + Turbopack</td></tr>
      <tr><td>Styling</td><td>Tailwind CSS + sonner, tw-animate-css</td></tr>
      <tr><td>Forms</td><td>React Hook Form + Zod</td></tr>
      <tr><td>State Mgmt</td><td>Zustand & React Query</td></tr>
      <tr><td>Auth</td><td>tRPC + Prisma + Argon2</td></tr>
      <tr><td>DB</td><td>PostgreSQL (NeonDB)</td></tr>
      <tr><td>Email</td><td>React Email + Resend</td></tr>
      <tr><td>API Clients</td><td>CoinMarketCap, OpenWeatherMap</td></tr>
      <tr><td>Uploads</td><td>UploadThing + @uploadthing/react</td></tr>
      <tr><td>Analytics</td><td>PostHog</td></tr>
    </table>
  </section>

  <section id="getting-started" class="container">
    <h2>🎯 Getting Started</h2>
    <pre><button class="copy-btn">Copy</button><code>git clone https://github.com/your-username/owly-newsletter.git
cd owly-newsletter</code></pre>
    <pre><button class="copy-btn">Copy</button><code>npm install
# or yarn install
# or pnpm install</code></pre>
    <pre><button class="copy-btn">Copy</button><code>cp .env.example .env.local
# then fill in your values</code></pre>
    <pre><button class="copy-btn">Copy</button><code>npx prisma db push
# npx prisma db seed</code></pre>
    <pre><button class="copy-btn">Copy</button><code>npm run dev
# or yarn dev
# or pnpm dev</code></pre>
  </section>

  <section id="scripts-reference" class="container">
    <h2>⚙️ Scripts Reference</h2>
    <table>
      <tr><th>Command</th><th>Description</th></tr>
      <tr><td>dev</td><td>Start dev server with Turbopack</td></tr>
      <tr><td>build</td><td>Build for production</td></tr>
      <tr><td>start</td><td>Start production server</td></tr>
      <tr><td>lint</td><td>Run ESLint</td></tr>
      <tr><td>test</td><td>Run Jest tests</td></tr>
      <tr><td>test:watch</td><td>Run tests in watch mode</td></tr>
      <tr><td>email:dev</td><td>Start React Email dev server</td></tr>
      <tr><td>prisma:studio</td><td>Open Prisma Studio</td></tr>
      <tr><td>prisma:generate</td><td>Generate Prisma client</td></tr>
      <tr><td>prisma:push</td><td>Push schema changes</td></tr>
    </table>
  </section>

  <section id="environment-variables" class="container">
    <h2>🔐 Environment Variables</h2>
    <pre><button class="copy-btn">Copy</button><code>### App
NEXT_PUBLIC_BASE_URL=

### Database

DATABASE_URL=

### Emails

RESEND_API_KEY=

### Uploads

UPLOADTHING_TOKEN=

### API KEYS

COINMARKET_API_KEY=
WEATHER_API_KEY=

### Analytics

NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=</code></pre>

  </section>

  <footer class="footer">
    &copy; 2025 Owly Newsletter • MIT License
  </footer>

  <script>
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.nextElementSibling.textContent;
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        });
      });
    });
  </script>
</body>
</html>
