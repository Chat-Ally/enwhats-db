/**
 * Creates a new order in the database.
 *
 * This function inserts a new record into the 'orders' table using the specified
 * `chat_id`, `total`, and `subtotal`. The function returns an array of inserted records
 * or undefined if there's an error during insertion.
 *
 * @param {string} chat_id - A unique identifier for the chat session associated with the order. It includes both the business and the client, split by an @.
 * @param {number} total - The total amount of the order, including any taxes and fees.
 * @param {number} subtotal - The base price of the goods/services ordered, before tax or additional fees are applied.
 * @param {number[]} products - The list product ids that the user added to his order.
 *
 * @returns {Promise<any[]> | undefined} An array containing the newly inserted record(s) upon successful insertion.
 * If an error occurs during the database operation, it logs the error to the console and returns `undefined`.
 */
export async function createOrder(supabase, chat_id, total, subtotal, products) {
    const { data, error } = await supabase
        .from('orders')
        .insert([
        {
            chat_id: chat_id,
            total: total,
            subtotal: subtotal
        },
    ])
        .select();
    if (error)
        console.error('createOrder', error);
    if (data) {
        console.log("createOrder", data);
        console.log("createOrder products", products);
        createProductOrder(supabase, products, data[0].id);
    }
    return data;
}
export async function createProductOrder(supabase, products, orderId) {
    const inserts = products.map(num => ({
        product_id: num,
        order_id: orderId,
        quantity: 0
    }));
    const { data, error } = await supabase
        .from('product_order')
        .insert(inserts)
        .select();
    if (error)
        console.error('createProductOrder', error);
    return data;
}
