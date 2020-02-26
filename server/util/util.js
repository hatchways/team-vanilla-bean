const updateData = async (Model, dashBoardId, updateCond) => {
  const result = await Model.findOneAndUpdate({ _id: dashBoardId }, updateCond, { new: true });
  return result;
};

module.exports = updateData;
