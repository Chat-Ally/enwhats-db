import type { UUID } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
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
export declare function createOrder(supabase: SupabaseClient, chat_id: UUID, total: number, subtotal: number, products: number[]): Promise<any>;
export declare function createProductOrder(supabase: SupabaseClient, products: number[], orderId: number): Promise<any>;
