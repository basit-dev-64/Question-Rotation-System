const Question = require('../../models/question.model');
const Region = require('../../models/region.model');
const moment = require('moment-timezone'); 
const cron = require('node-cron');

const  assignQuestionToRegion = async ({regionId,cycleDuration})=> {
  try {
    let availableQuestions = await Question.find({
      region: regionId,
      assigned: false
    });

    if (availableQuestions.length === 1) {
      await Question.updateMany({region:regionId},{$set:{assigned:false}})
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    await Question.updateOne(
      { _id: selectedQuestion._id },
      { $set: { assigned: true } }
    );

    const nextCycleDate = moment.tz("Asia/Singapore").add(cycleDuration, 'days').toDate();
    await Region.updateOne(
        { _id: regionId },
        {
          $set: {
            currentQuestion: selectedQuestion._id,
            nextCycleStartDate: nextCycleDate 
          }
        }
      );
    console.log(`Assigned question ${selectedQuestion._id} to region ${regionId}`);
  } catch (error) {
    console.error(`Error assigning question to region ${regionId}:`, error);
  }
}


const assignQuestionsToAllRegions = async () => {
  try {
    const currentSGT = moment.tz("Asia/Singapore").startOf('hour'); 
    const regions = await Region.find({
        $or: [
          { nextCycleDate: { $lte: currentSGT } },  
          { nextCycleDate: { $exists: false } },    
          { nextCycleDate: null }                   
        ]
      });

    if (regions.length === 0) {
      console.log('No regions need question assignments at this time.');
      return;
    }

    await Promise.all(regions.map(region => assignQuestionToRegion({regionId:region._id,cycleDuration:region.cycleDuration})));

    console.log('All regions  have been assigned questions.');
  } catch (error) {
    console.error('Error assigning questions :', error);
  }
};

const scheduleAssignment = () => {
    cron.schedule('0 7 * * 1', async () => {
      console.log('Starting weekly question assignment...');
      await assignQuestionsToAllRegions();
    });
  };

module.exports = {scheduleAssignment}
