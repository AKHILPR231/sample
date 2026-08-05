# VIA Outlets — Management Portal (Admin Panel)

A standalone **React + TypeScript** web app (built with **Vite**) for administering
the VIA Outlets mobile app. This is a separate project from the mobile app.

It currently includes:

- A two-panel **Sign-in** page.
- Clicking **Sign in with Microsoft Entra ID** signs in (mocked) and navigates
  to the admin panel.
- The **admin shell**: header (top bar), sidebar, and footer (bottom bar).
- The data **table area is intentionally left as a placeholder** — to be built later.

---

## Prerequisites

- **Node.js 18 or newer** (check with `node -v`)
- npm (bundled with Node) — or yarn/pnpm if you prefer

## 1. Create / open the project

You already have this folder. From a terminal:

```bash
cd via-outlets-admin
```

> Starting from scratch instead? The equivalent scaffold is:
> `npm create vite@latest via-outlets-admin -- --template react-ts`
> then `npm i react-router-dom`. The files in this repo already replace the
> generated ones, so you don't need to do this.

## 2. Install dependencies

```bash
npm install
```

## 3. Run in development

```bash
npm run dev
```

Vite prints a local URL (default **http://localhost:5173**) and opens it
automatically. The dev server hot-reloads on save.

**Try the flow:** the app opens on the sign-in page → click
**SIGN IN WITH MICROSOFT ENTRA ID** → you land on the admin panel
(`/admin`) with the header, sidebar (Outlet Config / Services / Brands),
and footer. **Sign out** (bottom of the sidebar) returns you to sign-in.

## 4. Production build & preview

```bash
npm run build      # type-checks (tsc) then bundles to dist/
npm run preview    # serves the built dist/ locally to verify
```

---

## Project structure

```
via-outlets-admin/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts            # @ → ./src alias, dev server on :5173
└── src/
    ├── main.tsx              # entry: Router + AuthProvider + App
    ├── App.tsx               # routes
    ├── lib/
    │   └── auth.tsx          # auth context (MOCK sign-in — swap for MSAL)
    ├── components/
    │   ├── Logo.tsx
    │   └── icons.tsx         # inline SVG icon set
    ├── layouts/
    │   ├── AdminLayout.tsx    # grid shell + route guard
    │   ├── AdminHeader.tsx    # top bar
    │   ├── AdminSidebar.tsx   # side bar
    │   ├── AdminFooter.tsx    # bottom bar
    │   └── navItems.tsx
    ├── pages/
    │   ├── LoginPage.tsx      # two-panel sign-in
    │   ├── OutletConfigPage.tsx  # tabs + TABLE PLACEHOLDER
    │   └── PlaceholderPage.tsx
    ├── theme/tokens.ts        # design tokens (also mirrored as CSS vars)
    └── styles/global.css      # CSS variables + resets
```

## Routing

| Path              | Screen                                  |
| ----------------- | --------------------------------------- |
| `/`               | Sign-in page                            |
| `/admin`          | Admin shell → Outlet Configuration      |
| `/admin/services` | Admin shell → Services (placeholder)    |
| `/admin/brands`   | Admin shell → Brands (placeholder)      |

`/admin/*` is guarded: without an authenticated session it redirects to `/`.

---

## Wiring real Microsoft Entra ID (later)

Auth is mocked in `src/lib/auth.tsx` so the flow is clickable. To use real SSO:

```bash
npm i @azure/msal-browser @azure/msal-react
```

Then replace the body of `signIn()` in `src/lib/auth.tsx` with an MSAL
`loginPopup` / `loginRedirect`, and populate the user from the returned account.
Nothing else in the app needs to change — pages read the user through `useAuth()`.
