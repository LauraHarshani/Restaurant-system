const { prisma } = require('../lib/prisma');

const getDashboardStats = async (req, res) => {
  try {
    // 1. Order Summary
    const totalOrders = await prisma.order.count();
    const pendingOrders = await prisma.order.count({
      where: { status: 'PENDING' },
    });
    const completedOrders = await prisma.order.count({
      where: { status: 'COMPLETED' },
    });

    // Total Revenue 
    const totalRevenueResult = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: 'COMPLETED',
      },
    });

    // 2. Message Summary
    const totalMessages = await prisma.contactMessage.count();
    const unreadMessages = await prisma.contactMessage.count({
      where: { isRead: false },
    });

    // 3. Content Status Summary
    const totalMenuItems = await prisma.menuItem.count();
    const totalChefs = await prisma.chef.count();
    const totalCategories = await prisma.category.count();

    return res.status(200).json({
      success: true,
      data: {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          completed: completedOrders,
          totalRevenue: totalRevenueResult._sum.total || 0,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
        },
        contentStatus: {
          menuItems: totalMenuItems,
          chefs: totalChefs,
          categories: totalCategories,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};