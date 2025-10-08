## YOLO E-Commerce Containerization Project

This project demonstrates full Docker containerization of a **React + Node.js + MongoDB** web application.  
It includes **multi-service orchestration**, **data persistence**, and **versioned image deployment** on DockerHub.

## Project Overview

**Services:**
- **Frontend:** React app (Node 22.19.0-slim)  
- **Backend:** Node.js API (Node 22.19.0-alpine)  
- **Database:** MongoDB (official image)

**Goal:**  
Run all components as Docker containers connected via a custom bridge network with persistent MongoDB storage.

## Technologies & Setup

**Base Images Used**
- `node:22.19.0-slim` → lightweight React build stage  
- `alpine:3.16.7` → minimal runtime for frontend  
- `node:22.19.0-alpine` → efficient Node backend  
- `mongo:latest` → official MongoDB database

**Network & Ports**
 Service | Host Port | Container Port 
 Client   | 3000     | 3000 
 Backend  | 5000     | 5000
 MongoDB  | 27017    | 27017 

**Persistent Volume**

[
    {
        "CreatedAt": "2025-10-08T19:16:12Z",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "yolo",
            "com.docker.compose.version": "2.0.0",
            "com.docker.compose.volume": "app-mongo-data"
        },
        "Mountpoint": "/var/lib/docker/volumes/yolo_app-mongo-data/_data",
        "Name": "yolo_app-mongo-data",
        "Options": null,
        "Scope": "local"
    }
]
````
## Commands

```bash
# Build and start all containers
docker compose up -d --build

# Stop and clean up
docker compose down --rmi all --volumes
````

## Things to note

* Multi-stage Docker builds for smaller images
* Custom bridge network `app-net` for inter-container communication
* Persistent MongoDB volume for stored products
* Semantic image versioning (`v1.0.0`)
* Clean image naming (`vicmalash/yolo-client`, `vicmalash/yolo-backend`)


## Docker Images

 Service  | Image Name             | Version  |

 Frontend | vicmalash/yolo-client  | v1.0.0 |
 Backend  | vicmalash/yolo-backend | v1.0.0 |

## Screenshots included in /screenshots:

* yolo-client.png
* yolo-backend.png

## Status

*  Containers built successfully
*  Application running at `http://localhost:3000`
*  Data persistence confirmed
*  Images pushed to DockerHub



