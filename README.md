# Flip Cards

An interview prep flash card app, built with a React TypeScript frontend and an ASP.NET Core Web API backend.

## Features

- **Flip animation** — click any card to reveal the answer
- **Tagging** — mark cards as Technical, Behavioural, or both
- **Tech Stack** — label cards by technology (C#, React, SQL, etc.)
- **Filter bar** — filter by tech stack, category, or keyword search
- **Shuffle** — randomise card order
- **Full CRUD** — add, edit, and delete cards via modal form

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript (Vite) |
| Backend | ASP.NET Core Web API (.NET 10) |
| ORM | Entity Framework Core 10 |
| Database | SQLite |

## DB Schema

Table: `Cards`

| Column | Type | Notes |
|---|---|---|
| `Id` | int | Primary key, auto-increment |
| `Question` | string | Required |
| `Answer` | string | Required |
| `Technical` | bool | Category flag |
| `Behavioural` | bool | Category flag |
| `TechStack` | string | e.g. "C#", "React", "SQL" |

## Getting Started

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org) (v18+)

### Run locally

**Backend** (runs on port 5104):

```bash
cd backend
dotnet run
```

The database file (`flipcards.db`) is created automatically on first run via EF migrations.

**Frontend** (runs on port 5173):

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
Flip-Card/
├── backend/
│   ├── Controllers/
│   │   └── CardsController.cs   # REST API (CRUD + filtering)
│   ├── Data/
│   │   └── AppDbContext.cs      # EF DbContext
│   ├── Migrations/              # EF migration files
│   ├── Models/
│   │   └── Card.cs              # Card entity
│   ├── appsettings.json
│   └── Program.cs
└── frontend/
    ├── public/
    │   └── favicon.svg
    └── src/
        ├── components/
        │   ├── CardForm.tsx     # Add / edit modal
        │   ├── CardMenu.tsx     # Kebab menu (edit / delete)
        │   ├── FilterBar.tsx    # Search, stack filter, checkboxes
        │   └── FlipCard.tsx     # Flip card with 3D animation
        ├── api.ts               # Fetch helpers
        ├── types.ts             # Shared TypeScript types
        ├── App.tsx              # Root component + state
        └── main.tsx
```
