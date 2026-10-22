const { homeContent, aboutContent } = require('../data/contentData');

const getDashboardSummary = (req, res) => {
  res.status(200).json({
    success: true,
    summary: {
      totalSections: 2,
      homeContentStatus: "Active",
      aboutContentStatus: "Active",
      lastUpdated: new Date()
    }
  });
};

module.exports = { getDashboardSummary };