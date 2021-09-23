// Parses JSON files
const fs = require("fs");
const items = JSON.parse(fs.readFileSync("data/items.json"));

// Error Handler
const { Error404 } = require("./ErrorHandler");

// Inventory Check Middleware
const inventoryCheck = async (req, res, next) => {
    // req.body in this case should be an array from localStorage Cart
    const cart = req.body;

    try {
        let inventoryArray = [];
        let isInventoryMismatched = false;
        // Iterates through cart to ensure inventory has enough in stock to process transaction
        cart.forEach(cartItem => {
            items.forEach(inventory => {
                if (cartItem._id === inventory._id) {
                    if (cartItem.quantity > inventory.numInStock) {
                        isInventoryMismatched = true;
                    }
                    inventoryArray.push({
                        _id: inventory._id,
                        name: inventory.name,
                        quantity: cartItem.quantity,
                        numInStock: inventory.numInStock,
                    });
                }
            })
        })
        // Returns an error if indicated quantity exceeds number of items in stock.
        if (isInventoryMismatched) {
            return res.status(400).json({
                status: 400,
                message: "Error! One or more items in your cart has more quantity than the available number of items in stock.",
                data: inventoryArray,
            })
        }
    }
    catch (err) {
        console.log("inventoryCheck Error:", err);
    }
    next();
    // Once all checks are passed, middleware is complete and moves on to the "next" handler: purchaseHandle
};

// Purchase Handle
const purchaseHandle = async (req, res) => {
    // req.body in this case should be an array from localStorage Cart
    const cart = req.body;

    try {
        let inventoryArray = [];
        // forEach iterates through each item in cart
        cart.forEach(cartItem => {
            // forEach iterates through each item in inventory for the cartItem
            items.forEach(inventory => {
                // Once cartItem has been found in inventory, inventory numInStock is updated based on the purchase quantity of each cartItem
                if (cartItem._id === inventory._id) {
                    inventory.numInStock -= cartItem.quantity;
                    inventoryArray.push(inventory);
                }
            })
        });

        // Once inventory is updated, a thank you message is returned. **IMPORTANT: AS LOCALSTORAGE IS A FRONT-END OBJECT, REMOVING THE ITEMS FROM LOCAL STORAGE IS IMPORTANT, BUT MUST BE DONE ON FRONT-END AFTER THIS FETCH REQUEST IS COMPLETED!!!**
        return res.status(200).json({
            status: 204,
            message: `Thank you for your purchase. Your order is now sent for processing.`,
            data: inventoryArray,
        })
    }
    catch (err) { // Error Catch
        console.log("updateProductPurchase Error:", err);
    }
};

// Module Exports
module.exports = { inventoryCheck, purchaseHandle };