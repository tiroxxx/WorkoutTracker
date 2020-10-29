const router = require("express").Router();
const Workout = require("../models/workout");


module.exports = function (app) {
    // router.get("/api/workouts", (req, res) => {
    //     Workout.find
    // })

    router.post("/api/workouts", (req, res) => {
        Workout.create({})
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    })

    router.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(params.id,
            {
                $push: {
                    exercises: body
                }
            },
            {
                new: true,
                runValidators: true
            })
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    })
}
