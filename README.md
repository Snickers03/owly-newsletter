<!DOCTYPE html>
<html lang="en">
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
