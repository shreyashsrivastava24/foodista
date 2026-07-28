import Shop from "../models/shop.model.js"
import Order from "../models/order.model.js"

export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body
        if (cartItems.length == 0 || !cartItems) {
            return res.status(400).json({ message: "Cart is empty" })
        }
        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: "Send complete delivery address" })
        }
        //key value pair shopId->item(s)
        const groupItemsByShop = {}
        cartItems.forEach(item => {
            const shopId = item.shopId || item.shop
            if (!shopId) {
                return
            }
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = []
            }
            groupItemsByShop[shopId].push(item)
        });

        // Object.keys(groupItemsByShop)....sirf keys milengi i.e,shopId
        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner")
            if (!shop) {
                return res.status(400).json({ message: "shop not found" })
            }
            const items = groupItemsByShop[shopId]
            const subtotal = items.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0)
            return {
                shop: shop._id,
                owner: shop.owner._id,
                subtotal,
                shopOrderItems: items.map((i) => ({
                    item: i.id,
                    price: i.price,
                    quantity: i.quantity,
                    name: i.name
                }))
            }
        }
        ))

        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrders
        })

        return res.status(201).json(newOrder)

    } catch (error) {
        return res.status(500).json({ message: `error occured while placing order ${error}` })
    }
}