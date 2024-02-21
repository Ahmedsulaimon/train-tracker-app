require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

//express app
const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    method: ["GET", "POST"],
  },
});


async function fetchDataFromAPI() {
  //get the current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  var TIPLOCS = "LEEDS,YORK"
  var date = today.toString()
  console.log(today.toString());
  try {
    const response = await fetch(
      `https://traindata-stag-api.railsmart.io/api/trains/tiploc/${TIPLOCS}/${date} 00:00:00/${date} 23:59:59`,
      {
        headers: {
          "X-ApiVersion": process.env.API_VERSION,
          "X-ApiKey": process.env.API_KEY,
        },
      }
    );
    const data = await response.json();

    //const initialData = JSON.stringify(data)
    console.log(data.length);
    const ids = [];

    // Keep track of encountered pairs of activationId and scheduleId
    const encounteredPairs = {};

    data.forEach((item) => {
      const { originTiploc, destinationTiploc, scheduledDeparture, scheduledArrival, activationId, scheduleId, trainId, toc_Name, cancelled } = item;
      const key = `${activationId}-${scheduleId}`;

      if (encounteredPairs[key]) {
        // If pair already encountered, add toc_Name to existing object in ids array
        const existingItem = ids.find((el) => el.activationId === activationId && el.scheduleId === scheduleId);
        if (existingItem) {
          existingItem.toc_Name.push(toc_Name);
        }
      } else {
        // If pair not encountered yet, add new object to ids array
        ids.push({ originTiploc, destinationTiploc, scheduledDeparture, scheduledArrival, activationId, scheduleId, trainId, toc_Name: [toc_Name], cancelled });
        encounteredPairs[key] = true;
      }
    });

    console.log(ids)
    const promises = ids.map(async (item) => {
      const movement = await fetch(
        `https://traindata-stag-api.railsmart.io/api/ifmtrains/movement/${item.activationId}/${item.scheduleId}`,
        {
          headers: {
            "X-ApiVersion": process.env.API_VERSION,
            "X-ApiKey": process.env.API_KEY,
          },
        }
      );
      const trainMovement = await movement.json();
      // var trainMovementData = JSON.stringify(trainMovement)
      return trainMovement;
    });

    const allTrainMovement = await Promise.all(promises);
    console.log(allTrainMovement.length);


    const promisesSchedule = ids.map(async (item) => {
      const schedule = await fetch(
        `https://traindata-stag-api.railsmart.io/api/ifmtrains/schedule/${item.activationId}/${item.scheduleId}`,
        {
          headers: {
            "X-ApiVersion": process.env.API_VERSION,
            "X-ApiKey": process.env.API_KEY,
          },
        }
      );
      const trainSchedule = await schedule.json();
      // var trainScheduleData = JSON.stringify(trainSchedule)
      return trainSchedule;
    });

    const allTrainSchedule = await Promise.all(promisesSchedule);
    // console.log(allTrainSchedule);


    return { ids, allTrainMovement, allTrainSchedule };

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.get("/", (req, res) => {
  res.json({ mssg: "welcome to the app" });
});
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Emit data to this specific client immediately upon connection
  fetchDataFromAPI().then((data) => {
    socket.emit("dataUpdate", data);
  });
});

// Emit data to all clients every 5 seconds
setInterval(async () => {
  const data = await fetchDataFromAPI();
  io.emit("dataUpdate", data);
}, 500000); // 5000 milliseconds = 5 seconds

//listening for requests
server.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT} `);
});
