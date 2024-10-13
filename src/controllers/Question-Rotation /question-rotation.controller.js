const  mongoose  = require("mongoose")
const Region = require("../../models/region.model")
const moment = require('moment-timezone'); 

const updateCycleDuration = async (req, res) => {
    try {
        const { region, cycleDuration } = req.body;
        const regionData = await Region.findById(region);
        let nextCycleDate;
        const currentDateInSGT = moment.tz('Asia/Singapore');
        const nextCycleDateInSGT = moment.tz('Asia/Singapore').set({ hour: 7, minute: 0, second: 0, millisecond: 0 });

        if (!regionData.nextCycleStartDate) {
            nextCycleDate = nextCycleDateInSGT.add(cycleDuration, 'days').toDate();
        } else {
            const daysRemainingforPreviousCycleDuration = moment.tz(regionData.nextCycleStartDate, 'Asia/Singapore').diff(currentDateInSGT, 'days');
            const daysRemainingForNewCycleDuration = cycleDuration - (regionData.cycleDuration - daysRemainingforPreviousCycleDuration);
            nextCycleDate = nextCycleDateInSGT.add(daysRemainingForNewCycleDuration, 'days').toDate();
        }

        const updatedCycleDuration = await Region.findOneAndUpdate(
            { _id: region },
            { $set: { cycleDuration: cycleDuration, nextCycleStartDate: nextCycleDate } },
            { new: true }
        );

        res.status(200).send({ updatedCycleDuration });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
};

const getCurrentQuestion = async (req, res) => {
    try {
        const { region } = req.query
        const data = await Region.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(region) }
            },
            {
                $lookup: {
                    from: "questions",
                    localField: "currentQuestion",
                    foreignField: "_id",
                    as: "questionDetails"
                }
            },
            {
                $project:{
                    questionDetails:1,
                    _id:0
                }
            }
        ])
        res.status(200).json({question:data[0]?.questionDetails[0]})
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
}

module.exports = { updateCycleDuration, getCurrentQuestion }