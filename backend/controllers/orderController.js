const { prisma } = require("../lib/prisma.ts");
const { randomUUID } = require("crypto");

//Create a customer order
const createOrder = async (req, res) => {
    try{
        const { customer, phone, address, type, note, items } = req.body;

        //validate customer details
        if(!customer?.trim() || !phone?.trim() || !type?.trim()){
            return res.status(400).json({
                success: false,
                message: "Customer name, phone, and order type are required."
            });
        }

        if(type.toLowerCase() === "delivery" && !address?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Delivery address is required for delivery orders."
            });
        }

        if(!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please add at least one item to your order."
            });
        }

        //Validate item IDs and quantities
        for(const item of items){
            if(!Number.isInteger(Number(item.menuItemId)) || Number(item.menuItemId) <=0 || !Number.isInteger(item.qty) || item.qty <= 0){
                return res.status(400).json({
                    success: false,
                    message: "Each item must have a valid menuItemId and positive integer quantity."
                });
            }
        }

         //Fetch actual menu items and prices from SQLite
        const menuIds = [...new Set(items.map(item => Number(item.menuItemId)))];

         const menuItems = await prisma.menuItem.findMany({
            where: {
                id: {in: menuIds},
                available: true,
            },
        });

        if(menuItems.length !== menuIds.length){
            return res.status(400).json({
                success: false,
                message: "One or more menu items do not exist or are unavailable."
            });
        }

        const menuMap = new Map(menuItems.map(item => [item.id, item]));

        //Calculate subtotal using database prices
        const orderItems = items.map(item => {
            const menuItem = menuMap.get(Number(item.menuItemId));

            return{
                name: menuItem.name,
                qty: item.qty,
                price: menuItem.price,
            };
        });

        const subtotal = Math.round(orderItems.reduce((sum,item) => sum+ item.price * item.qty, 0) * 100) /100;

        // Configure DELIVERY_FEE in backend/.env.
        const configuredFee = Number(process.env.DELIVERY_FEE ?? 0);

        if(!Number.isFinite(configuredFee) || configuredFee < 0){
            return res.status(500).json({
                success: false,
                message: "Delivery fee configuration is invalid."
            });
        }

        const deliveryFee = type.toLowerCase() === "delivery" ? configuredFee : 0;

        const total = Math.round((subtotal + deliveryFee) *100)/100;

        //Save the order and its items atomically
        const order = await prisma.order.create({
            data: {
                id: randomUUID(),
                customer: customer.trim(),
                phone: phone.trim(),
                address: address?.trim() || "",
                type: type.trim(),
                note: note?.trim() || null,
                subtotal,
                deliveryFee,
                total,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: true,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Order created successfully.",
            order,
        });

    }catch (error) {
        console.error("Create order error: ", error);

        return res.status(500).json({
            success: false,
            message: error.message || String(error),
            code: error.code || null,
        });
    }
};

//get all order details
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve orders.",
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders
};