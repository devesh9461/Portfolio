# Portfolio Backend (Node.js)

This backend powers dynamic portfolio content and forms with local JSON persistence.

## Setup

```bash
cd Backend
npm install
copy .env.example .env
```

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Default server URL: `http://localhost:5000`

## Frontend Connection

- Local frontend can call `/api/*` through Vite proxy.
- For deployed frontend, set `VITE_API_BASE_URL` to your backend URL.
- Backend CORS origins are controlled by `FRONTEND_URLS` (comma-separated).

## API Endpoints

- `GET /api/health`
- `GET /api/content`
- `PUT /api/content`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/contact`
- `POST /api/contact`

## Dynamic Content Workflow

1. Update section text/config in `src/data/portfolioContent.json`, or call `PUT /api/content`.
2. Add new projects through `POST /api/projects` (or edit `src/data/projects.json` directly).
3. Frontend fetches `/api/content` and renders updated sections automatically.

### `POST /api/projects` body

```json
{
  "title": "My New Project",
  "description": "What it does and why it matters",
  "image": "https://example.com/project-cover.jpg",
  "tags": ["React", "Node.js", "MongoDB"],
  "github": "https://github.com/username/repo",
  "live": "https://example.com",
  "featured": true
}
```

### `PUT /api/content` body

Send any top-level sections you want to replace, for example:

```json
{
  "hero": {
    "title": "Backend Engineer Building Practical Products",
    "highlightedText": "clean. reliable."
  }
}
```

## Notes

- Data files are stored in `src/data`.
- For production, replace JSON storage with a real database and add auth for write routes.
