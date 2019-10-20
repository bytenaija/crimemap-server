const UserLocation = require("../models/userLocation");
const Crimes = require("../models/crime");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("update-location", async data => {
      console.log("datatatata", data);
      const userLocation = await UserLocation.findOne({ userId: data.userId });
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
        const date = new Date();
        date.setMinutes(date.getMinutes() - 30);
        console.log(date)
        let crimes = await Crimes.find({
          date:{$gte: date},
          location: {
            $near: {
              $maxDistance: 10000,
              $geometry: {
                type: "Point",
                coordinates: [data.longitude, data.latitude]
              }
            }
          }
        });
        if(crimes.length > 0) socket.emit("alarm", { crimes });
      } catch (err) {
        console.log(err)
      }
 
    });

    socket.on("disconnect", data => {});
  });
};
