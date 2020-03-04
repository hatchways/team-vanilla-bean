const express = require("express");
const router = express.Router();
const checkToken = require("../auth/validateToken");

// Models;
const Calendar = require("../models/Calendar");

router.put(
  "/:dashboardId/columns/:columnId/tasks/:taskId",
  checkToken,
  async (req, res) => {
    try {
      const { dashboardId, columnId, taskId } = req.params;
      const { title, deadline } = req.body;

      const task = await Calendar.findOne({ "deadlines.task": taskId });
      let calendar = await Calendar.findOne({ dashboard: dashboardId });
      let result = null;

      if (task && calendar) {
        result = await Calendar.findOneAndUpdate(
          { dashboard: dashboardId, "deadlines.task": taskId },
          {
            $set: {
              "deadlines.$.title": title,
              "deadlines.$.deadline": deadline
            }
          },
          { new: true }
        );
      } else if (calendar) {
        calendar.deadlines.push({
          deadline,
          column: columnId,
          title,
          task: taskId
        });
        result = await calendar.save();
      } else {
        const newCalendar = new Calendar({
          dashboard: dashboardId,
          deadlines: [{ deadline, column: columnId, task: taskId, title }]
        });

        result = await newCalendar.save();
      }

      res.status(200).json({ result });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "Failed to update calendar" });
    }
  }
);

router.get("/:dashboardId", checkToken, async (req, res) => {
  try {
    const { dashboardId } = req.params;
    const result = await Calendar.findOne({ dashboard: dashboardId });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Failed to update calendar" });
  }
});
module.exports = router;
