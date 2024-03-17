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


async function fetchDataFromAPI(tiploc) {

  if (!tiploc) {
    tiploc = "DONC"; // Default value
  }
  console.log("tip:" + tiploc)

  //get the current date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  // LEEDS,YORK,HULL,KNGX,NWCSTLE,SKPT,DONC
  //AIzaSyDUQBtCGL6_KtW0FJrCtCmfr_P7R0C-7T0


  var date = today.toString()
  console.log(today.toString());
  try {
    const response = await fetch(
      `https://traindata-stag-api.railsmart.io/api/trains/tiploc/${tiploc}/${date} 00:00:00/${date} 23:59:59`,
      {
        headers: {
          "X-ApiVersion": process.env.API_VERSION,
          "X-ApiKey": process.env.API_KEY,
        },
      }
    );
    const data = await response.json();

    //const initialData = JSON.stringify(data)
    // console.log(data);
    const ids = [];

    // Keep track of encountered pairs of activationId and scheduleId
    const encounteredPairs = {};

    data.forEach((item) => {
      const { originLocation, destinationLocation, scheduledDeparture, scheduledArrival, activationId, scheduleId, trainId, toc_Name, cancelled, lastReportedDelay, lastReportedType } = item;
      const key = `${activationId}-${scheduleId}`;

      if (encounteredPairs[key]) {
        // If pair already encountered, add toc_Name to existing object in ids array
        const existingItem = ids.find((el) => el.activationId === activationId && el.scheduleId === scheduleId);
        if (existingItem) {
          existingItem.toc_Name.push(toc_Name);
        }
      } else {
        // If pair not encountered yet, add new object to ids array
        ids.push({ originLocation, destinationLocation, scheduledDeparture, scheduledArrival, activationId, scheduleId, trainId, toc_Name: [toc_Name], cancelled, lastReportedDelay, lastReportedType });
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
    // console.log(allTrainMovement);

    const processedTrainMovement = [];

    allTrainMovement.forEach((item) => {
      const trainMovements = [];
      item.forEach((movement) => {
        // Destructure movement object
        const { location, eventType, planned, actual, latLong } = movement;
        // Check if location exists, skip to the next iteration if not
        if (!location) return;

        // Find index of existing location in the array
        const existingLocationIndex = trainMovements.findIndex((elem) => elem.location === location);

        // If location exists in the array, add the new eventType to it
        if (existingLocationIndex !== -1) {
          trainMovements[existingLocationIndex].eventTypes.push(eventType);
        } else {
          // If location doesn't exist, create a new entry
          trainMovements.push({
            location,
            eventTypes: [eventType],
            planned,
            actual,
            latLong
          });
        }
      });

      // Push the processed movements for the current item
      processedTrainMovement.push(trainMovements);
    });

    console.log(processedTrainMovement);


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


    return { processedTrainMovement, ids, allTrainMovement, allTrainSchedule };

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

let tiploc;

// Function to periodically fetch data from the API and emit updates
const fetchDataAndUpdate = async () => {
  try {
    const data = await fetchDataFromAPI(tiploc);
    io.emit("dataUpdate", data); // Emit to all connected clients
  } catch (error) {
    console.error("Error fetching and emitting data:", error);
    // Optionally, emit an error to all clients
    io.emit("dataError", "Failed to fetch data.");
  }
};

// Initial call to fetchDataAndUpdate
fetchDataAndUpdate();

//Set up the setInterval to periodically call fetchDataAndUpdate
setInterval(async () => {
  await fetchDataAndUpdate()
}, 120000); // 5000 milliseconds = 5 seconds

// Listen for tiplocSelected event
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("tiplocSelected", async (data) => {
    const { tiploc: newTiploc } = data;
    console.log(`Tiploc selected: ${newTiploc}`);
    tiploc = newTiploc; // Update the tiploc value

    try {
      fetchDataFromAPI(tiploc).then((data) => {
        socket.emit("dataUpdate", data);
      });

      const data = await fetchDataFromAPI(tiploc); // Correctly wait for the data
      io.emit("dataUpdate", data); // Emit to the specific socket/client that requested it
    } catch (error) {
      console.error("Error fetching and emitting data:", error);
      // Optionally, emit an error to the client
      socket.emit("dataError", "Failed to fetch data.");
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Listening for requests
server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
