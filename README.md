# Vank API

API Rest in NodeJS with express, express-cache and MySQL 10.0

# Cron Job
Cron to daily update the Invoices table based on a CSV file by external url, configured in the .env environment variables
The cron is executed every 2 hours from 5:00 to 11:00, validating if the synchronization of the day has already been carried out.

## Install
1. Install Docker & Docker Compose (Dev).
2. Clone repository.
3. Copy .env.example file to .env and edit database credentials there

---

## Run in development with Docker
1. Run in cmd:
```x-sh
    docker compose up --build -d
```
2.  [Enter here](http://localhost:3000/)

---

## Run in development without Docker
1. Run in cmd:
```x-sh
    npm install sequelize-cli -g
    npm install
    sequelize db:migrate
    npm run dev
```
2.  [Enter here](http://localhost:3000/)

---

## Documentation API
1. Run api
2. [Documentation](http://localhost:3000/documentation)

---

# Database

## Models

### Clients

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| id | integer | yes | primary key |
| name | String | yes | Name of client |
| internalCode | integer | yes | Internal code of client |
| taxId | integer | yes | Tax id of client |
| currency  | String | yes | Client's currency (USD, EUR or CLP) |
| quota | integer | yes | Limit quota of request |
| bankRegisters | Array[integer] | yes | Array with list bankId |

### Invoice

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| id | integer | yes | primary key |
| vendorId | integer | yes | Vendor id |
| number | String | yes | Invoice number |
| date | Date | yes | date |
| total | decimal | yes | total |
| paymentTotal | decimal | yes | Payment total |
| creditTotal | decimal | yes | Credit total |
| bankId | id | yes | Bank id |
| dueDate | Date | no | Due date |
| paymentDate | Date | yes | Payment date |
| currency | string | yes | Invoice currency |

### SequelizeMeta

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| name | String | yes | Name of migrate file |