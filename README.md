# tavern-php-template

A full-stack web application template pairing a **React + TypeScript** frontend with a **PHP (Slim 4)** backend API. Vite proxies all `/api` requests to the PHP built-in server during development, so both halves run as a single dev experience.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| UI | HeroUI, TailwindCSS, Framer Motion |
| Routing (client) | React Router 7 |
| Backend | PHP, Slim 4 (PSR-7) |
| Package manager | pnpm |

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| PHP | 8.x | Must be on `PATH` |
| Composer | 2.x | [getcomposer.org](https://getcomposer.org) |
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| pnpm | 10+ | `npm install -g pnpm` |
| just | any | Optional — [just.systems](https://just.systems) |

---

## Getting Started

### With `just` (recommended)

```sh
# Install all dependencies (composer + pnpm) and start dev servers
just dev
```

### Without `just`

```sh
# 1. Install dependencies
composer install
pnpm install

# 2. Start both servers concurrently
pnpm dev
```

This starts:
- React/Vite frontend at `http://localhost:3000`
- PHP API server at `http://localhost:8000`

Vite proxies all `/api/*` requests to the PHP server automatically.

---

## Project Structure

```
tavern-php-template/
├── api/
│   ├── index.php          # Slim app entry point
│   └── routes/            # Route classes (PSR-4: routes\)
│       └── TestRoute.php
├── src/
│   ├── components/        # Shared React components
│   │   └── Navigation.tsx
│   ├── pages/             # Page-level components
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── providers/         # React context providers
│   │   └── ThemeProvider.tsx
│   ├── css/
│   └── main.tsx           # App entry point + router
├── composer.json
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── Justfile
```

---

## Adding a Page

1. Create `src/pages/MyPage.tsx`.
2. Add a route in `src/main.tsx`:
   ```tsx
   <Route path="/my-page" element={<MyPage />} />
   ```
3. Add a nav link in `src/components/Navigation.tsx`:
   ```ts
   const pages = {
       "Home": "/",
       "About": "/about",
       "My Page": "/my-page",
   };
   ```

---

## Adding an API Endpoint

1. Create `api/routes/MyRoute.php`:
   ```php
   <?php
   namespace routes;

   use Slim\App;
   use Slim\Psr7\Request;
   use Slim\Psr7\Response;
   use Slim\Routing\RouteCollectorProxy;

   class MyRoute
   {
       static function index(Request $request, Response $response, $args): Response
       {
           $response->getBody()->write(json_encode(["message" => "Hello"]));
           return $response->withStatus(200)->withHeader('Content-Type', 'application/json');
       }

       static function configure(App $app): void
       {
           $app->group("/my-route", function (RouteCollectorProxy $group) {
               $group->get("/", [self::class, 'index']);
           });
       }
   }
   ```
2. Register it in `api/index.php`:
   ```php
   MyRoute::configure($app);
   ```
3. Call it from React at `/api/my-route/`.

---

## Building for Production

### With `just`

```sh
just build
```

### Without `just`

```sh
pnpm run build
# Then copy the api/ directory into dist/
```

The build output lands in `dist/`. The `api/` directory and `.env` file are copied alongside the compiled frontend assets.

### Deploying with Apache

An `.htaccess` file is included at the project root. It handles:

- Routing `/api/*` requests to `api/index.php`
- Falling back to `index.html` for all other routes (React Router)
- Blocking direct access to `.env`

Requires `mod_rewrite` to be enabled.

### Deploying with nginx

An `nginx.conf` is included at the project root. Copy the `server {}` block into your site config, adjusting `root` and `server_name` for your environment:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    ...
}
```

The config handles the same rules as the `.htaccess`: API routing via PHP-FPM, React Router fallback, and `.env` protection.

---

## Available `just` Recipes

```
just           # List all recipes
just install   # Install composer + pnpm dependencies
just dev       # Install then start dev servers
just build     # Install then build for production
```

---

## License

GPL-3.0-or-later
