const express = require("express");
const { addQuestions, addRegions, addUsers } = require("../controllers/seedDatabase");
const { updateCycleDuration, getCurrentQuestion } = require("../controllers/Question-Rotation /question-rotation.controller");
const router = new express.Router();

// HealthCheck
router.get("/stroll",(req,res)=>{
    res.send("App running")
})

router.post("/stroll/seed-questions",addQuestions)
router.post("/stroll/seed-regions",addRegions)
router.post("/stroll/seed-users",addUsers)

router.patch("/stroll/update-cycle-duration",updateCycleDuration)
router.get("/stroll/question",getCurrentQuestion)


module.exports = router