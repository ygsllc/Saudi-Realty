# My Replit to Coolify Workflow

This document outlines the standard process for taking a project from Replit, testing it locally, and deploying it to Coolify. Following these steps ensures that local development port conflicts are avoided while production deployments work seamlessly.

## The Problem: Port Conflicts

My local machine often has services (like Apple's Control Center) running on common development ports like `5000`. This prevents applications from starting locally. However, production environments like Docker and Coolify are clean and expect the application to use its standard port (`5000`).

## The Solution: Environment Variables in Scripts

We will configure our applications to use an environment variable (`PORT`) to decide which port to listen on. The most reliable way to do this is by setting the variable directly in the `dev` script in `package.json`.

-   **Locally:** The `dev` script will set `PORT=5555`.
-   **In Production (Docker/Coolify):** The `start` script (used by the Dockerfile) will not set a `PORT`, so the application will default to `5000`.

---

## Step-by-Step Workflow for Any New Project

### 1. Initial Project Setup

After downloading your project from Replit and opening it in Cursor, install the dependencies:
```bash
npm install
```

### 2. Configure Your Server for Environment Variables

Modify your main server file (e.g., `server/index.ts`, `index.js`) to read the port from `process.env.PORT`.

**Find the line where the port is defined, which usually looks like this:**
`const port = 5000;`

**Replace it with this code:**
```javascript
const port = process.env.PORT || 5000;

// Make sure your server listen logic uses this port variable
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```
*(Note: Unlike the previous method, you do not need to install or import `dotenv`)*

### 3. Configure `package.json` for Local Development

Open your `package.json` file and find the `scripts` section. Modify the `dev` script to set the port for local development.

**Find the `dev` script, which usually looks like this:**
`"dev": "NODE_ENV=development tsx server/index.ts"`

**Change it to this, adding `PORT=5555` at the beginning:**
`"dev": "PORT=5555 NODE_ENV=development tsx server/index.ts"`

### 4. Run and Deploy

a. **Run Locally:**
Now, when you run `npm run dev`, the application will automatically start on port **5555** every time.
```bash
npm run dev
```

b. **Deploying with Docker:**
Your `Dockerfile` should use the `npm start` command. Since the `start` script does not set the `PORT` variable, the application will correctly default to `5000` inside the container, making it ready for Coolify.

---
This updated workflow is simpler, more reliable, and avoids potential issues with module loading order. 