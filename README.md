# China Tea Shop

A full-stack web application for a Chinese tea store, built with a focus on clean DevOps, backend, and frontend separation.  
**Roles:**  
- **DevOps:** Containerization, CI/CD, orchestration (done)
- **Backend:** Flask API, database models, business logic
- **Frontend:** React UI, user experience

---

## Project Structure

```
china-tea-shop/
│
├── backend/         # Flask API, database, models, tests
│   ├── main.py
│   ├── models.py
│   ├── config.py
│   ├── requirements.txt
│   └── ...
│
├── frontend/        # React app, static files, nginx config
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── ...
│
├── docker-compose.yml
├── Jenkinsfile
└── README.md
```

---

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- (Optional for local dev) Python 3.11+, Node.js 18+

---

### Quick Start (Recommended)

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd china-tea-shop
   ```

2. **Build and start all services:**
   ```sh
   docker compose up --build
   ```
   - Backend: [http://localhost:5000](http://localhost:5000)
   - Frontend: [http://localhost:3000](http://localhost:3000)

3. **Run tests (backend):**
   ```sh
   docker compose exec backend pytest
   ```

---

## Development

### Backend

- **Location:** `backend/`
- **Tech:** Python, Flask, SQLAlchemy, SQLite
- **Run locally:**
  ```sh
  cd backend
  python -m venv venv && source venv/bin/activate
  pip install -r requirements.txt
  python main.py
  ```
- **API Docs:** See `main.py` for available endpoints.

---

### API Examples

#### Get all teas

**Request:**
```http
GET /api/teas
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Longjing",
    "type": "Green",
    "price": 12.5
  },
  {
    "id": 2,
    "name": "Pu-erh",
    "type": "Dark",
    "price": 18.0
  }
]
```

#### Add a new tea

**Request:**
```http
POST /api/teas
Content-Type: application/json

{
  "name": "Tieguanyin",
  "type": "Oolong",
  "price": 15.0
}
```

**Response:**
```json
{
  "id": 3,
  "name": "Tieguanyin",
  "type": "Oolong",
  "price": 15.0
}
```

> For more endpoints and details, see the Flask code in `backend/main.py`.

---

### Frontend

- **Location:** `frontend/`
- **Tech:** React, Axios, Nginx (for production)
- **Run locally:**
  ```sh
  cd frontend
  npm install
  npm start
  ```
  - App runs at [http://localhost:3000](http://localhost:3000)

---

## CI/CD & DevOps

- **Jenkinsfile:** Defines build, test, and push stages.
- **Jenkins:** Used for automating CI/CD pipelines. The Jenkinsfile in this repo configures the pipeline to build Docker images, run backend tests, and push images to Docker Hub on the `main` branch.  
  - To use: Set up a Jenkins server with Docker and connect your repository.  
  - Ensure you have a Docker Hub credential (`docker-token`) configured in Jenkins for image pushes.
- **Docker Compose:** Orchestrates backend and frontend containers.
- **Images:** Built and pushed to Docker Hub (see `docker-compose.yml`).

---

## Useful Commands

- **Stop all containers:**
  ```sh
  docker compose down
  ```
- **Rebuild images:**
  ```sh
  docker compose build
  ```
- **View logs:**
  ```sh
  docker compose logs -f
  ```

---

## Contribution

- **DevOps:** Maintain CI/CD, Dockerfiles, deployment scripts.
- **Backend:** Implement/extend API, models, and tests.
- **Frontend:** Build UI, connect to API, improve UX.

---

## Contact

For questions, reach out to the team on Discord or via email.

---
