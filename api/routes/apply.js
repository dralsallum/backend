const router = require("express").Router();
const User = require("../models/User");
const Apply = require("../models/Apply");

//Create Apply
router.post("/", async (req, res) => {
  const newApply = new Apply(req.body);
  try {
    const savedApply = await newApply.save();
    res.status(200).json(savedApply);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Apply
router.put("/:id", async (req, res) => {
  try {
    const apply = await Apply.findById(req.params.id);
    if (apply.username === req.body.username) {
      try {
        const updatedApply = await Apply.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedApply);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE Delete
router.delete("/:id", async (req, res) => {
  try {
    const apply = await Apply.findById(req.params.id);
    // Check if the post was found
    if (!apply) {
      return res.status(404).json("Apply not found");
    }

    // Check if the request user is the same as the post's user
    if (apply.username !== req.body.username) {
      return res.status(401).json("You can delete only your apply!");
    }

    // Delete the post
    await apply.deleteOne(); // use deleteOne instead of delete
    res.status(200).json("Apply has been deleted...");
  } catch (err) {
    // It's helpful to log the error for debugging purposes
    console.error(err);
    res.status(500).json("Error deleting apply: " + err.message);
  }
});

//GET Apply
router.get("/:id", async (req, res) => {
  try {
    const apply = await Apply.findById(req.params.id);
    res.status(200).json(apply);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let applies;
    if (username) {
      applies = await Apply.find({ username });
    } else if (catName) {
      applies = await Apply.find({
        profession: {
          $in: [catName],
        },
      });
    } else {
      applies = await Apply.find();
    }
    res.status(200).json(applys);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
