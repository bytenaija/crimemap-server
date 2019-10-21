const requestIp = require("request-ip");
const Crime = require('../models/crime');
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");
const geoip = require("geoip-lite");

module.exports = {

  findAll : async (req, res) => {
    console.log("getting crimesss");
    try {
      const crimes = await Crime.find({}).populate({ path: 'userId', select: '_id username'})
      res.json({ crimes })
    } catch (err) {
      console.log(err)
      res.status(500).json({err})
    }
  },

  //adding crime to the database
  addCrime : (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
      if (err) {
        res.status(403).json(err);
      } else {
        req.body.userId = authData.user.id;
        console.log(req.body)
        Crime.create(req.body, function (err, crime) {
          if (err) {
            console.dir(err);
          } else {
            res.status(200).json({
              message: "Crime added",
              crime
            });
          }
        });
      }
    });
  },

  //finding and returning one crime
  findOne : (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
      if (err) {
        res.status(403).json(err);
      } else {
        const id = req.params.crimeId;
        const clientIp = requestIp.getClientIp(req); 
        console.log("Client IP", clientIp)
        const geo = geoip.lookup(clientIp);
        const browser = require("ua-parser").parse(req.headers["user-agent"]);
        console.log(browser)
        Crime
          .findById(id).populate({ path: 'userId', select: "_id username" })
          .then(crimes => {
            res.status(200).json({ crimes });
          });
      }
    });
  },

  //editing crime
  editCrime : (req, res, next) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
      if (err) {
        res.status(403).json(err);
      } else {
        Crime.findOneAndUpdate({ _id: req.params.crimeId }, { $set: req.body })
          .exec()
          .then(result => {
            Crime.find()
              .exec()
              .then(results => {
                res.status(200).json({
                  message: "Crime updated",
                  results
                });
              });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    });
  },

  //deleting crime
  delete : (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
      if (err) {
        res.status(403).json(err);
      } else {
        Crime.findOneAndRemove({ _id: req.params.crimeId })
          .exec()
          .then(result => {
            res.status(200).json({
              message: "Crime deleted",
              results: result
            });
          });
      }
    });
  },
}
