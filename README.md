# 📤 Upload Widget Server

> A robust, high-performance Node.js API for seamless file management, powered by Fastify, Drizzle ORM, and Cloudflare R2.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-blue?style=for-the-badge)

---

## 📖 About The Project

**Upload Widget Server** is a backend solution designed to handle file uploads efficiently and securely. It solves the complexity of managing file storage, metadata, and retrieval by providing a clean API interface that integrates directly with **Cloudflare R2** (S3-compatible storage) and **PostgreSQL**.

Whether you are building a dashboard, a social platform, or a content management system, this server provides the essential plumbing for your media assets.

### ✨ Key Features

*   **🚀 High-Performance Uploads:** Optimized handling of multipart/form-data using Fastify.
*   **☁️ Cloud Storage Integration:** Native support for Cloudflare R2 (via AWS SDK).
*   **🗄️ Robust Data Management:** PostgreSQL database with Drizzle ORM for type-safe queries.
*   **🔍 Advanced Search & Filtering:** Built-in pagination, sorting, and text search capabilities.
*   **📊 Data Export:** Generate CSV reports of your uploaded assets on the fly.
*   **🛡️ Type Safety:** End-to-end type validation with Zod and TypeScript.
*   **🐳 Docker Ready:** Containerized environment for easy deployment and development.

---

## 🛠️ Tech Stack

### Core
*   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white) **Node.js** - Runtime environment
*   ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white) **TypeScript** - Static typing
*   ![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=flat-square&logo=fastify&logoColor=white) **Fastify** - Web framework

### Data & Storage
*   ![PostgreSQL](https://img.shields.io/badge/postgresql-4169e1?style=flat-square&logo=postgresql&logoColor=white) **PostgreSQL** - Relational database
*   ![Drizzle](https://img.shields.io/badge/drizzle-C5F74F?style=flat-square&logo=drizzle&logoColor=black) **Drizzle ORM** - TypeScript ORM
*   ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&logo=Cloudflare&logoColor=white) **Cloudflare R2** - Object storage

### Tools & DevOps
*   ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white) **Docker** - Containerization
*   ![Zod](https://img.shields.io/badge/zod-3E67B1?style=flat-square&logo=zod&logoColor=white) **Zod** - Schema validation
*   ![Vitest](https://img.shields.io/badge/vitest-%2344a833.svg?style=flat-square&logo=vitest&logoColor=white) **Vitest** - Testing framework
*   ![Biome](https://img.shields.io/badge/biome-%2360a5fa.svg?style=flat-square&logo=biome&logoColor=white) **Biome** - Linting & Formatting

---

## 🚀 Getting Started

Follow these steps to get your development environment running in less than 5 minutes.

### Prerequisites

*   **Node.js** (v20+ recommended)
*   **pnpm** (Package Manager)
*   **Docker** & **Docker Compose**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/upload-widget-server.git
    cd upload-widget-server
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Configure Environment Variables**
    Copy the example file and fill in your credentials (especially Cloudflare R2 details).
    ```bash
    cp .env.example .env
    ```

4.  **Start Database (Docker)**
    Run the PostgreSQL container in the background.
    ```bash
    docker-compose up -d
    ```

5.  **Run Migrations**
    Apply the database schema.
    ```bash
    pnpm db:migrate
    ```

---

## 🎮 Usage

### Development Server
Start the server in watch mode:
```bash
pnpm dev
```
The server will start at `http://localhost:3333`.

### API Documentation
Access the interactive Swagger/OpenAPI documentation at:
```
http://localhost:3333/docs
```

### Key Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the development server with hot-reload |
| `pnpm build` | Builds the project for production |
| `pnpm test` | Runs the test suite with Vitest |
| `pnpm db:generate` | Generates SQL migrations from Drizzle schema |
| `pnpm db:studio` | Opens Drizzle Studio to view/edit data |

### Example Request

**Upload an Image:**

```bash
curl -X POST http://localhost:3333/uploads \
  -F "file=@/path/to/your/image.png"
```

**Response (201 Created):**
```json
// No content (201)
```

---

## 📂 Project Structure

```text
.
├── 📁 docker/               # Docker configuration and init scripts
├── 📁 src/
│   ├── 📁 app/              # Business logic & Use Cases
│   │   └── 📁 functions/    # Core functionality (upload, get, export)
│   ├── 📁 infra/            # Infrastructure layer
│   │   ├── 📁 db/           # Database setup (Drizzle schemas, migrations)
│   │   ├── 📁 http/         # HTTP server (Fastify routes, server setup)
│   │   └── 📁 storage/      # Storage implementation (S3/R2 client)
│   ├── 📁 shared/           # Shared utilities (Either pattern, types)
│   └── 📄 env.ts            # Environment variable validation
├── 📄 .env.example          # Environment variables template
├── 📄 docker-compose.yml    # Docker services
├── 📄 package.json          # Project dependencies
└── 📄 drizzle.config.ts     # Drizzle ORM config
```

---

## 🗺️ Roadmap

Based on the current codebase, here are some suggested improvements:

*   [ ] **Authentication:** Add JWT or API Key authentication to protect endpoints.
*   [ ] **File Validation:** Expand support for other file types (PDF, Docs) and add virus scanning.
*   [ ] **CDN Integration:** Directly expose public URLs via a configured CDN domain.

---

<div align="center">
  <sub>Built with ❤️ by ChristopherLDO</sub>
</div>
