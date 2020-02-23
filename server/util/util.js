const jwt = require("jsonwebtoken");

const updateData = async (Model, dashBoardId, updateCond) => {
  const result = await Model.findOneAndUpdate({ _id: dashBoardId }, updateCond, { new: true });
  return result;
};

const decodeToken = async token => {
  let user = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  let userId = user.id;
  return userId;
};

module.exports = { updateData, decodeToken };
