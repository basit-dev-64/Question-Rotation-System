require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
const { connectToDB } = require('./services/database-connection');
const { scheduleAssignment } = require('./controllers/Question-Rotation /question-rotation.cron');

const app = express();

const corsOptions = {
  origin: true, 
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(indexRouter)

connectToDB();
scheduleAssignment();

const PORT = process.env.PORT || 5676;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
