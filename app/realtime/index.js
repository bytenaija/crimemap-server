const UserLocation = require("../models/userLocation");
const Crimes = require("../models/crime");

module.exports = io => {
  io.on("connection", socket => {
    console.log("connected");

    socket.emit("connected", { userId: socket.id });

    socket.on("update-location", async data => {
      const userLocation = await UserLocation.findOne({ userId: data.userId });
      console.log(data);
      if (!userLocation) {
        await UserLocation.create({
          userId: data.userId,
          latitude: data.latitude,
          longitude: data.longitude
        });
      } else {
        userLocation.latitude = data.latitude;
        userLocation.longitude = data.longitude;
        userLocation.save();
      }

      try {
        let crimes = await Crimes.find({
          location: {
            $near: {
              $maxDistance: 100000,
              $geometry: {
                type: "Point",
                coordinates: [data.latitude, data.longitude]
              }
            }
          }
        });

        socket.emit("alarm", { crimes });
      } catch (err) {}
      //   .find((error, results) => {
      //   if (error) console.log(error);

      //   console.log(JSON.stringify(results, 0, 2));
      //   socket.emit('')
      // });
    });

    socket.on("disconnect", data => {});
  });
};
