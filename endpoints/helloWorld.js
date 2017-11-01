const mongoose = require('mongoose');
mongoose.Promise = Promise;
const hitCount = new mongoose.Schema({});
const Hit = mongoose.model('Hit', hitCount);

/*
 * This is a simple build demo to show a connection to a database
 *
 * Each time the service is called, it creates a new `hit`, then
 * returns with a total count of hits stored in the database.
 *
 * @returns {number} Number of times this service has been called
 */
module.exports = (data, api) => {
  mongoose.connect('mongodb://localhost/build-test', { useMongoClient: true });
  const hit = new Hit();
  hit.save().then(() => {
    Hit.count({}).then(count => {
      api.success(count);
      mongoose.disconnect();
    })
  });
};
