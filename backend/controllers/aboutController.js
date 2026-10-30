const prismaModule = require('../lib/prisma');
const prisma = prismaModule.prisma || prismaModule.default || prismaModule;

/**
 * @desc    Get About page content
 * @route   GET /api/content/about
 * @access  Public
 */
const getAboutContent = async (req, res) => {
    try {
        // Fetch all about page records from database
        const aboutContents = await prisma.pageContent.findMany({
            where: { page: 'about' }
        });

        const contentMap = {};
        aboutContents.forEach(item => {
            try {
                // Parse JSON strings back to objects/arrays (like hours)
                contentMap[item.key] = JSON.parse(item.content);
            } catch (e) {
                contentMap[item.key] = item.content;
            }
        });

        return res.status(200).json({
            success: true,
            data: Object.keys(contentMap).length > 0 ? contentMap : {
                heroTitle: 'OUR STORY',
                subtitle: 'Discover the journey behind our wood-fired perfection',
                storyText: 'Born from a passion for authentic open-flame cooking, Flame & Crust began as a single wood-fired oven in a quiet urban corner. We believe fire is not just a method — it is the soul of every dish. Each pizza, each grill mark, each wisp of smoke carries the character of the flame that shaped it.\n\nOur chefs source heritage grains, seasonal produce, and aged woods — oak, hickory, and cherry — to craft flavors that can only exist when heat, smoke, and patience meet.',
                stat1Label: 'Years of Fire',
                stat1Value: '12',
                stat2Label: 'Wood Varieties',
                stat2Value: '48',
                stat3Label: 'Oven Heat',
                stat3Value: '900°F',
                pillar1Title: 'Open-Flame Craft',
                pillar1Desc: 'Every dish is kissed by live fire. Our ovens run at 900°F, searing flavor into every crust and cut in under 90 seconds.',
                pillar2Title: 'Sourced with Intent',
                pillar2Desc: 'Heritage grains, heirloom tomatoes, and farm-direct produce. We partner with growers who share our obsession with quality.',
                pillar3Title: 'No Shortcuts',
                pillar3Desc: 'Dough ferments for 48 hours. Woods are aged for seasons. Sauces are built from scratch. Excellence cannot be rushed.',
                streetAddress: '123 Road , Colombo 03',
                mapUrl: 'https://',
                hours: [
                    { day: 'Monday', time: '12:00 PM – 11:00 PM', active: true },
                    { day: 'Tuesday', time: '12:00 PM – 11:00 PM', active: true },
                    { day: 'Wednesday', time: '12:00 PM – 11:00 PM', active: true },
                    { day: 'Thursday', time: '12:00 PM – 11:30 PM', active: true },
                    { day: 'Friday', time: '12:00 PM – 12:30 AM', active: true },
                    { day: 'Saturday', time: '11:30 AM – 12:30 AM', active: true },
                    { day: 'Sunday', time: '11:30 AM – 10:30 PM', active: true }
                ]
            }
        });
    } catch (error) {
        console.error("Error fetching about content:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while fetching about content"
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
        const updates = req.body; // Expecting key-value pairs from admin form

        for (const [key, value] of Object.entries(updates)) {
            if (value === undefined || value === null) continue;

            // Convert objects or arrays to JSON string before storing
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

            // Check if record exists using findFirst to avoid compound unique key errors
            const existingRecord = await prisma.pageContent.findFirst({
                where: {
                    page: 'about',
                    key: key
                }
            });

            if (existingRecord) {
                // Update existing record
                await prisma.pageContent.update({
                    where: { id: existingRecord.id },
                    data: { content: stringValue }
                });
            } else {
                // Create new record if it does not exist
                await prisma.pageContent.create({
                    data: {
                        page: 'about',
                        key: key,
                        content: stringValue
                    }
                });
            }
        }

        return res.status(200).json({
            success: true,
            message: "About content updated successfully"
        });
    } catch (error) {
        console.error("Error updating about content:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error while updating about content"
        });
    }
};

module.exports = {
    getAboutContent,
    updateAboutContent
};