# Task Tracker API

## Setup

1. Install dependencies:

```bash
npm install
```
2. Run Application:
```bash
node src/app.js
```



Create Task
```bash
curl --location --request POST 'http://localhost:3000/api/tasks' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "Task Title",
  "status": "open"
}'
```
Update Task
```bash
curl --location --request PUT 'http://localhost:3000/api/tasks/1' \
--header 'Content-Type: application/json' \
--data-raw '{
  "title": "Updated Task Title",
  "status": "inprogress"
}
'
```
Get All Tasks (Paginated)
```bash
curl --location --request GET 'http://localhost:3000/api/tasks' \
--data-raw ''
```
Get Task Metrics
```bash
curl --location --request GET 'http://localhost:3000/api/task-metrics' \
--data-raw ''
