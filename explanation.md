## **explanation.md**

```markdown
# Explanation of Ansible Playbook – Stages 1 & 2

## Overview
The playbook provisions the server, installs Docker, configures the environment, and deploys the e-commerce application containers. Stage 1 focused on basic VM provisioning and container orchestration, while Stage 2 introduced modular roles for easier maintenance, automation, and scalability.

---

## Roles & Execution Order

1. **common**
   - Installs Docker, Docker Compose, and system dependencies.
   - Ensures Docker service is running.
   - Must execute first for other roles to use Docker features.

2. **repo_clone**
   - Clones the application repository from GitHub.
   - Provides the source code for backend and frontend containers.

3. **mongo**
   - Builds and runs the MongoDB container.
   - Must run before backend to ensure database availability.
   - Configured to run on a custom Docker network.

4. **backend**
   - Builds and runs the backend container (Node.js + Express).
   - Reads `.env` for configuration.
   - Depends on MongoDB being operational.

5. **frontend**
   - Builds and runs the frontend container (React).
   - Connects to the backend service.
   - Can execute after backend is running.

6. **network**
   - Configures Docker network to ensure inter-container communication.
   - Ensures all services can resolve each other by name.

---

## Key Decisions & Best Practices

- **Modularity**: Separate roles for common setup, repo cloning, backend, frontend, and database.
- **Dependencies**: Sequential execution ensures services start in the correct order (Mongo → Backend → Frontend).
- **Docker Modules**: Used `docker_container` and `docker_image` modules instead of shell commands.
- **Environment Variables**: `.env` file used to manage secrets and configuration, preventing hardcoding.
- **Idempotence**: Playbooks are safe to rerun without breaking deployment.
- **Network**: Custom Docker bridge network ensures reliable service discovery.

---

## Running the Playbook

```bash
ansible-playbook -i inventory.ini playbook.yml
Check container status:

bash
Copy code
docker ps
Verify functionality:

Add products through the frontend

Check persistence in MongoDB
