\# IoT Sensor Dashboard



# IoT Sensor Dashboard

A full-stack IoT monitoring dashboard that streams live temperature and humidity telemetry from an ESP32 sensor node using MQTT and visualizes it in real time through a responsive React dashboard.

The project was built as a practical end-to-end implementation of event-driven IoT communication, combining embedded firmware, backend telemetry processing, WebSocket streaming, and frontend visualization.



This project streams live temperature and humidity readings from an ESP32 sensor node, persists telemetry in MongoDB, evaluates alert thresholds server-side, and pushes updates instantly to a responsive web dashboard.



It was built to simulate a lightweight production IoT monitoring pipeline rather than a basic academic prototype.



\---



\## Features



\- Real-time sensor telemetry streaming

\- MQTT-based device communication

\- WebSocket live dashboard updates

\- Historical sensor trend visualization

\- Configurable temperature/humidity alert thresholds

\- Device online/offline heartbeat detection

\- MongoDB telemetry persistence

\- Responsive dashboard UI

\- ESP32 firmware with auto reconnect logic

\- Modular backend service architecture



\---


## Project Highlights

- Built modular backend architecture using controller-service separation
- Implemented MQTT-based telemetry ingestion for IoT communication
- Added WebSocket streaming for real-time dashboard updates
- Persisted historical telemetry in MongoDB
- Implemented threshold-based alert evaluation
- Added heartbeat-based device online/offline monitoring
- Structured codebase for maintainability and future multi-device scaling
\## Tech Stack



\### Embedded / IoT

\- ESP32

\- DHT11 / DHT22

\- MQTT



\### Backend

\- Node.js

\- Express

\- Socket.IO

\- MongoDB

\- Mongoose



\### Frontend

\- React

\- Vite

\- Tailwind CSS

\- Chart.js

\- Axios



\---



\## System Architecture



```text

ESP32 Sensor Node

&#x20;  |

&#x20;  | MQTT Publish

&#x20;  v

MQTT Broker

&#x20;  |

&#x20;  | MQTT Subscribe

&#x20;  v

Node.js Backend

&#x20;  |

&#x20;  | Store telemetry

&#x20;  v

MongoDB



Node.js Backend

&#x20;  |

&#x20;  | WebSocket push

&#x20;  v

React Dashboard

```



\---



\## Project Structure



```text

iot-sensor-dashboard/

├── backend/

├── frontend/

├── esp32/

├── docs/

└── README.md

```



Detailed architecture:



\### Backend

\- config → infrastructure setup

\- models → MongoDB schemas

\- services → business logic

\- controllers → request handlers

\- routes → API endpoints

\- socket → websocket integration



\### Frontend

\- components → reusable UI

\- hooks → socket abstraction

\- api → backend communication

\- pages → page-level composition

\- utils → formatting helpers



\---



\## API Endpoints



\### Health Check



```http

GET /api/health

```



\---



\### Sensor History



```http

GET /api/sensors/history

```



Optional:



```http

GET /api/sensors/history?limit=100

```



\---



\### Fetch Alert Configuration



```http

GET /api/sensors/alerts

```



\---



\### Update Alert Configuration



```http

PUT /api/sensors/alerts

```



Body:



```json

{

&#x20; "maxTemperature": 40,

&#x20; "minTemperature": 15,

&#x20; "maxHumidity": 75,

&#x20; "minHumidity": 30

}

```



\---



\## MQTT Payload Format



Topic:



```text

iot/demo/sensor-data

```



Payload:



```json

{

&#x20; "deviceId": "esp32-room-01",

&#x20; "temperature": 27.4,

&#x20; "humidity": 58.1

}

```



\---



\## Local Setup



\### Clone repository



```bash

git clone https://github.com/your-username/iot-sensor-dashboard.git

cd iot-sensor-dashboard

```



\---



\### Backend setup



```bash

cd backend

npm install

cp .env.example .env

npm run dev

```



\---



\### Frontend setup



```bash

cd frontend

npm install

cp .env.example .env

npm run dev

```



\---



\### ESP32 setup



1\. Open Arduino IDE

2\. Install required libraries:

&#x20;  - PubSubClient

&#x20;  - DHT sensor library

&#x20;  - Adafruit Unified Sensor

3\. Update WiFi credentials

4\. Upload firmware



\---



\## Environment Variables



\### Backend



```env

PORT=5000

MONGODB\_URI=mongodb://localhost:27017/iot\_dashboard

MQTT\_BROKER\_URL=mqtt://broker.hivemq.com

MQTT\_TOPIC=iot/demo/sensor-data

FRONTEND\_URL=http://localhost:5173

```



\### Frontend



```env

VITE\_API\_BASE\_URL=http://localhost:5000/api

VITE\_SOCKET\_URL=http://localhost:5000

```



\---



\## Reliability Considerations



Implemented protections:



\- MQTT reconnect handling

\- WiFi reconnect handling

\- malformed payload rejection

\- sensor value validation

\- bounded dashboard memory usage

\- offline device heartbeat detection

\- backend threshold validation

\- query limit sanitization



\---



\## Future Improvements



Potential production upgrades:



\- user authentication

\- multiple device support

\- Redis pub/sub scaling

\- Docker deployment

\- MQTT authentication

\- role-based access control

\- historical analytics dashboards

\- email / SMS alerting

\- device registration flow



\---



## Screenshots

### Dashboard Preview

![Dashboard Preview](docs/screenshots/dashboard-preview.png)

### System Architecture

![Architecture](docs/architecture.png)


\---



\## Why This Project?



This project demonstrates:



\- IoT communication

\- real-time systems

\- event-driven backend architecture

\- WebSocket integration

\- full-stack engineering

\- telemetry persistence

\- production-minded validation patterns



\---



\## License



MIT

