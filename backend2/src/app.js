const express = require('express');
const morgan = require('morgan');
const taskRouter = require('./routes/taskRoutes');
const globalErrorHandler = require('./controllers/errorController');

// const tourRouter = require("./routes/tourRoutes");
// const userRouter = require("./routes/userRoutes");

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES
app.get('/', (req, res) => {
  res.send('Server is running!');
});
app.use('/api/v1/tasks', taskRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);


// app.get('/api/config', (req, res) => {
//   res.json({
//     port: process.env.PORT,
//     environment: process.env.NODE_ENV,
//     database: process.env.MONGODB_WORKHUB_URL || process.env.DATABASE,
//     password:
//       process.env.MONGODB_WORKHUB_PASSWORD || process.env.DATABASE_PASSWORD,
//   });
// });

// 3) ROUTES
// app.use("/api/v1/tours", tourRouter);
// app.use("/api/v1/users", userRouter);

module.exports = app;
