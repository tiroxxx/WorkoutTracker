const router = require("express").Router();
const Workout = require("../models/workout");

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            const lastIndex = dbWorkout.length - 1
            console.log(dbWorkout[lastIndex]);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
})

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(dbWorkout => {
            console.log(dbWorkout);
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

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            console.log(dbWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        })
})

module.exports = router;
