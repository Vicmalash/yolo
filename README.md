# E-commerce Application Deployment – Stages 1 & 2: Ansible Instrumentation

## Overview
This project automates the deployment of a containerized e-commerce web application using **Ansible** and **Docker** on a Vagrant Ubuntu virtual machine. It combines:

- Stage 1: VM provisioning, Docker setup, containerized frontend, backend, and database deployment.
- Stage 2: Modular Ansible playbooks and roles for server configuration and application orchestration.

The deployment ensures the application can be cloned from GitHub and run automatically in the VM.

### Features
- Backend container (Node.js + Express)
- Frontend container (React)
- MongoDB container
- Custom Docker network for container communication
- Automated GitHub repository clone
- Environment variable management via `.env` file

---

## Prerequisites
- Vagrant installed on the host machine
- VirtualBox or compatible VM provider
- Ansible >= 2.9 installed on VM or host
- Docker & Docker Compose installed on VM
- Internet connection to clone GitHub repository

---

## Project Structure

project-root/
├── README.md
├── ansible.cfg
├── inventory.ini
├── playbook.yml
├── vars/
│ └── main.yml
├── roles/
│ ├── common/
│ ├── repo_clone/
│ ├── backend/
│ ├── frontend/
│ ├── mongo/
│ └── network/
└── .env

yaml
Copy code

### Roles & Responsibilities
| Role | Description |
|------|-------------|
| `common` | Installs Docker, Docker Compose, and basic dependencies. Ensures Docker service is running. |
| `repo_clone` | Clones the GitHub repository into the VM. |
| `mongo` | Builds and runs MongoDB container. Must run before backend. |
| `backend` | Builds and runs backend container, configured via `.env` file. |
| `frontend` | Builds and runs frontend container, connected to backend. |
| `network` | Creates custom Docker network for inter-container communication. |

---

## Variables
All configurable variables are stored in `vars/main.yml`:

```yaml
app_dir: /vagrant/gallery
app_repo: https://github.com/Vicmalash/gallery.git
app_branch: master

frontend_container_name: gallery_frontend
frontend_port: 3000

backend_container_name: gallery_backend
backend_port: 5000

database_container_name: gallery_db
database_port: 27017
Variables control paths, container names, exposed ports, and repository details.

Usage
Start the VM:

bash
Copy code
vagrant up
vagrant ssh
Run the Ansible playbook (full deployment):

bash
Copy code
ansible-playbook -i inventory.ini playbook.yml
Run specific roles using tags:

bash
Copy code
# Clone repository only
ansible-playbook -i inventory.ini playbook.yml --tags repo

# Build and run backend
ansible-playbook -i inventory.ini playbook.yml --tags backend

# Build and run frontend
ansible-playbook -i inventory.ini playbook.yml --tags frontend
Verify deployment:

bash
Copy code
docker ps
Backend: http://<VM_IP>:5000

Frontend: http://<VM_IP>:3000

MongoDB: port 27017

