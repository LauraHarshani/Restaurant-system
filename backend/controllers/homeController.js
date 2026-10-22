let { homeContent } = require('../data/contentData');

const getHomeContent = (req, res) => {
  res.status(200).json({ success: true, data: homeContent });
};

const updateHomeContent = (req, res) => {
  homeContent = { ...homeContent, ...req.body };
  res.status(200).json({
    success: true,
    message: "Home content updated successfully",
    data: homeContent
  });
};

module.exports = {
  getHomeContent,
  updateHomeContent
};