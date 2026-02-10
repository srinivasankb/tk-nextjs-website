# techKoodaram Website (Next.js Migration)

This project has been migrated from Vite to Next.js 14.

## Prerequisites
- Node.js (v18 or higher recommended)
- npm

## Getting Started

1.  **Install Dependencies**
    You must install the dependencies first, as they are not included in this folder.
    ```bash
    npm install
    ```

2.  **Build the Project**
    This compiles the application for production.
    ```bash
    npm run build
    ```

3.  **Start the Server**
    This starts the production server.
    ```bash
    npm run start
    ```

    The application will be available at [http://localhost:3000](http://localhost:3000).

## Development
To run the development server with hot-reload:
```bash
npm run dev
```

## Notes
- **"use client"**: All interactive components (using hooks like `useState`, `useEffect`) must have `"use client";` at the top of the file.
- **Dependencies**: React is pinned to version 18.x and Next.js to 14.x to ensure compatibility with UI libraries.
