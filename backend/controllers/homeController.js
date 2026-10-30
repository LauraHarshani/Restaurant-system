const prismaModule = require('../lib/prisma');
const prisma = prismaModule.prisma || prismaModule.default || prismaModule;

/**
 * @desc    Get Home page content from the database
 * @route   GET /api/home
 * @access  Public
 */
const getHomeContent = async (req, res) => {
  try {
    // Fetch all home page content records from the database
    const homeContents = await prisma.pageContent.findMany({
      where: { page: 'home' }
    });

    const contentMap = {};
    
    // Map database records into a key-value object and safely parse JSON strings (like featuredDishes array)
    homeContents.forEach(item => {
      try {
        contentMap[item.key] = JSON.parse(item.content);
      } catch (e) {
        contentMap[item.key] = item.content;
      }
    });

    // Return the fetched content or fallback to default data if empty
    return res.status(200).json({ 
      success: true, 
      data: Object.keys(contentMap).length > 0 ? contentMap : {
        mainHeadline: "Flame & Crust",
        tagline: "Where urban fire meets gourmet craft. Burgers seared over open flame, pizzas born in 900-degree ovens, and loaded fries that redefine indulgence.",
        cta1Label: "Reserve a Table",
        cta1Url: "/contact",
        cta2Label: "Explore Menu",
        cta2Url: "/menu",
        highlight1Title: "Customer Rating",
        highlight1Value: "4.9",
        highlight2Title: "Open Daily",
        highlight2Value: "12pm - 12am",
        highlight3Title: "Open-Flame",
        highlight3Value: "100%",
        promoActive: "true",
        promoHeadline: "20% off your first online order",
        promoCode: "GLOW20",
        promoDescription: "Use code GLOW20 at checkout. Valid through the end of the month.",
        promoCta: "Claim Offer",
        bottomHeading: "READY FOR THE WOOD-FIRED EXPERIENCE?",
        bottomSubtext: "Reserve your spot or order online now. Every dish is a masterpiece born in the fire."
      } 
    });
  } catch (error) {
    console.error("Error fetching home content:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error while retrieving home content" 
    });
  }
};

/**
 * @desc    Update or create Home page content key-value pairs (supports arrays & objects like featuredDishes)
 * @route   PUT /api/home
 * @access  Private / Admin
 */
const updateHomeContent = async (req, res) => {
  try {
    const updates = req.body;

    // Loop through each update item sent from the admin panel
    for (const [key, value] of Object.entries(updates)) {
      // Check if the content key already exists in the database
      const existingRecord = await prisma.pageContent.findFirst({
        where: { page: 'home', key: key }
      });

      // Convert objects or arrays (like featuredDishes) to JSON string before storing
      const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

      if (existingRecord) {
        // Update existing record
        await prisma.pageContent.update({
          where: { id: existingRecord.id },
          data: { content: stringValue }
        });
      } else {
        // Create new record if it doesn't exist
        await prisma.pageContent.create({
          data: { page: 'home', key: key, content: stringValue }
        });
      }
    }

    return res.status(200).json({ 
      success: true, 
      message: "Home content updated successfully", 
      data: updates 
    });
  } catch (error) {
    console.error("Error updating home content:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error while updating home content" 
    });
  }
};

module.exports = {
  getHomeContent,
  updateHomeContent
};