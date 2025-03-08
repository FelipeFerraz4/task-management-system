const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB_URL = process.env.MONGODB_WORKHUB_URL || process.env.DATABASE;
const PASSWORD =
  process.env.MONGODB_WORKHUB_PASSWORD || process.env.DATABASE_PASSWORD;

const DB = DB_URL.replace('<db_password>', PASSWORD);

mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
