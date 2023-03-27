# Table of Contents
1. [About Project](#about-project)
    - [Running demo of Project](#running-demo-of-project)
2. [Systems architecture (High Level)](#systems-architecture)
3. [Running Project](#running-project)



# **About Project**

It is real-time dashboard. It uses kafka to produce dummy temperature, humiditiy and system usage data. This data is saved in database and view real-time in web-browser with charts.

## **Running demo of project**


https://user-images.githubusercontent.com/72183120/226206505-4ff3e4e2-496e-471d-8c62-d14fce9080cd.mp4


| ![Dashboard Snapshot](./assets/dashboard.png) | 
|:--:| 
| *Dashboard Snapshot* |


# **Systems architecture**

Each Producer produces messages to its own topic.

Each consumer consumes those message does 2 opertions:
- Inserts data in QuestDB
- Sends the same message to node.js server via. web-sockets.

Browser : It gets real-time data from node.js server through web-sockets. For inital loading of page uses API to get values from Databases

| ![System architecture](./assets/system-architecture.png) | 
|:--:| 
| *System architecture* |


# **Running Project**

1. Create Docker container by running `docker-compose up`. Make sure this container is running in background.
2. To Run Producers : Navigate to folder `cd kafka-producer-consumer`
3. Install dependencies: `npm install`
4. Run Admin file in order to create topics `node admin.js`
5. Run the producers. 
**Note:** All the producer must be running as seperate process and in the background.
```
node producer.js temperature
node producer.js humidity
node producer.js systemusage
```
6. Run all the Consumers likewise Producer as 3 different node process.
```
node consumer.js temperature
node consumer.js humidity
node consumer.js systemusage
```
7. In order to run dashboard navigate to `cd dashboard`
8. Install dependencies `npm install`
9. Run web-server by `node server.js`. You will able view dashboard by visiting http://localhost:3001/
