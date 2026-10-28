const prismaModule = require('../lib/prisma');
const prisma = prismaModule.prisma || prismaModule.default || prismaModule;

/**
 * @desc    Get About page content
 * @route   GET /api/content/about
 * @access  Public
 */
const getAboutContent = async (req, res) => {
    try {
        const aboutContents = await prisma.pageContent.findMany({
            where: { page: 'about' }
        });

        const contentMap = {};
        aboutContents.forEach(item => {
            contentMap[item.key] = item.content;
        });

        return res.status(200).json({
            success: true,
            data: Object.keys(contentMap).length > 0 ? contentMap : {
                historyTitle: "Our Story & History",
                historyText: "Founded with a passion for exceptional culinary experiences...",
                missionText: "To bring authentic flavors and quality dining to our community.",
                locationTitle: "Visit Us",
                locationAddress: "Galle Road, Colombo 03, Sri Lanka",
                openingHours: "Mon - Sun: 10:00 AM - 11:00 PM"
            }
        });
    } catch (error) {
        console.error("Error fetching about content:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching about content"
        });
    }
};

/**
 * @desc    Update About page content
 * @route   PUT /api/content/about
 * @access  Admin
 */
const updateAboutContent = async (req, res) => {
    try {
        const updates = req.body; // Expecting an object or key-value pairs

        for (const [key, value] of Object.entries(updates)) {
            await prisma.pageContent.upsert({
                where: {
                    page_key: {
                        page: 'about',
                        key: key
                    }
                },
                update: { content: String(value) },
                create: {
                    page: 'about',
                    key: key,
                    content: String(value)
                }
            });
        }

        return res.status(200).json({
            success: true,
            message: "About content updated successfully"
        });
    } catch (error) {
        console.error("Error updating about content:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while updating about content"
        });
    }
};

module.exports = {
    getAboutContent,
    updateAboutContent
};