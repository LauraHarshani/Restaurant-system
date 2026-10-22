let { aboutContent } = require('../data/contentData');

const getAboutContent = (req, res) => {
  res.status(200).json({ success: true, data: aboutContent });
};

const updateAboutContent = (req, res) => {
  aboutContent = { ...aboutContent, ...req.body };
  res.status(200).json({ success: true, message: "About content updated", data: aboutContent });
};

module.exports = { getAboutContent, updateAboutContent };