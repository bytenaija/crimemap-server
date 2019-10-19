var path = require("path");

const crimes = require("../models/crime");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");

//finding and returning all the crimes in the database
exports.findAll = async (req, res) => {
    console.log("getting crimesss");
    try {
        const crimes = await crimes.find({});
        res.json(crimes)
    } catch (err) {
        res.status(e.status).json({})
    }
};

//adding crime to the database
exports.addCrime = (req, res) => {
  jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      req.body.userId = authData.user.userId;
      crimes.create(req.body, function(err, small) {
        if (err) {
          console.dir(err);
        } else {
          res.status(200).json({
            message: "Crime added",
            results: small,
            authData
          });
        }
      });
    }
  });
};

//finding and returning one crime
exports.findOne = (req, res) => {
  jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      const id = req.params.crimeId;

      crimes
        .findById(id)
        .exec()
        .then(result => {
          res.status(200).json({ result, authData });
        });
    }
  });
};

//editing crime
exports.editCrime = (req, res, next) => {
  jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      crimes
        .findOneAndUpdate({ _id: req.params.crimeId }, { $set: req.body })
        .exec()
        .then(result => {
          crimes
            .find()
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
};

//deleting crime
exports.delete = (req, res) => {
  jwt.verify(req.token, jwtConfig.secret, (err, authData) => {
    if (err) {
      res.status(403).json(err);
    } else {
      crimes
        .findOneAndRemove({ _id: req.params.crimeId })
        .exec()
        .then(result => {
          res.status(200).json({
            message: "Crime deleted",
            results: result
          });
        });
    }
  });
};
