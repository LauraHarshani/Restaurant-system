const { prisma } = require('../lib/prisma');

const getDashboardStats = async (req, res) => {
  try {
    // 1. Fetch Orders Summary
    const totalOrders = await prisma.order.count();
    const pendingOrders = await prisma.order.count({
      where: { status: { in: ['PENDING', 'NEW', 'PREPARING'] } },
    });
    const completedOrders = await prisma.order.count({
      where: { status: { in: ['COMPLETED', 'DELIVERED'] } },
    });

    // 2. Fetch Recent 5 Orders (Removed 'user: true' to prevent schema error)
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
      },
    });

    // 3. Fetch Messages Summary & Recent 4 Messages
    const totalMessages = await prisma.contactMessage.count();
    const unreadMessages = await prisma.contactMessage.count({
      where: { isRead: false },
    });

    const recentMessages = await prisma.contactMessage.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
    });

    // 4. Content Status Summary
    const totalMenuItems = await prisma.menuItem.count();
    const totalChefs = await prisma.chef.count();
    const totalCategories = await prisma.category.count();

    return res.status(200).json({
      success: true,
      data: {
        stats: {
          orders: {
            totalToday: totalOrders,
            active: pendingOrders,
            completed: completedOrders,
          },
          menu: {
            totalItems: totalMenuItems,
            totalCategories: totalCategories,
          },
          chefs: {
            onDuty: totalChefs,
            total: totalChefs,
          },
          messages: {
            total: totalMessages,
            unread: unreadMessages,
          },
        },
        contentStatus: {
          banners: totalMenuItems > 0 ? 'Live' : 'Inactive',
          about: 'Synced',
          menuStatus: totalMenuItems > 0 ? 'Active' : 'Empty',
          chefStatus: totalChefs > 0 ? 'Current' : 'Offline',
        },
        recentMessages: recentMessages.map((msg) => ({
          id: msg.id,
          name: msg.name,
          email: msg.email,
          subject: msg.subject || 'General Inquiry',
          message: msg.message,
          createdAt: msg.createdAt,
          isRead: msg.isRead,
        })),
        recentOrders: recentOrders.map((ord) => ({
          id: ord.id || `FC-${ord.orderNumber || '1049'}`,
          time: new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          customer: ord.customerName || 'Guest Customer',
          details: ord.orderType || 'Pickup',
          items: `${ord.items?.length || 1} item${(ord.items?.length || 1) > 1 ? 's' : ''}`,
          total: `Rs. ${ord.totalAmount || ord.total || 0}.00`,
          status: ord.status || 'New',
        })),
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