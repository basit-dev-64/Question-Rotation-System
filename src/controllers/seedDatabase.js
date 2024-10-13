const Question = require("../models/question.model");
const Region = require("../models/region.model");
const User = require("../models/user.model");

const addQuestions = async (req,res)=>{
    try {
        const questionsArray = req.body.questions;
        if (!questionsArray || questionsArray.length === 0) {
          return res.status(400).json({ message: "No questions provided." });
        }
        const bulkOps = questionsArray.map(question => ({
          insertOne: {
            document: {
              question: question.question,
              region: question.region,
              assigned: question.assigned || false,
            }
          }
        }));
    
        const result = await Question.bulkWrite(bulkOps);
        res.status(200).json({
          message: 'Questions inserted successfully',
          result
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
}
const addUsers = async (req,res)=>{
    try {
        const users = req.body.users;
        if (!users || users.length === 0) {
          return res.status(400).json({ message: "No regions provided." });
        }
        const bulkOps = users.map(user => ({
          insertOne: {
            document: {
              name: user.name,
              userName:user.userName,
              region:user.region
            }
          }
        }));
    
        const result = await User.bulkWrite(bulkOps);
        res.status(200).json({
          message: 'Users inserted successfully',
          result
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
}
const addRegions = async (req,res)=>{
    try {
        const regions = req.body.regions;
        if (!regions || regions.length === 0) {
          return res.status(400).json({ message: "No regions provided." });
        }
        const bulkOps = regions.map(region => ({
          insertOne: {
            document: {
              name: region.name
            }
          }
        }));
    
        const result = await Region.bulkWrite(bulkOps);
        res.status(200).json({
          message: 'Regions inserted successfully',
          result
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({error})
    }
}
module.exports = {addQuestions,addRegions,addUsers}
