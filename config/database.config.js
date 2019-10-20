module.exports = {
  url:
    process.env.NODE_ENV === "production"
      ? "mongodb://root:rootaccess1@ds237868.mlab.com:37868/crimemap"
      : "mongodb://localhost:27017/crimemap"
};
