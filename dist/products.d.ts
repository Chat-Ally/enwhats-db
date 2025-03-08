import type { SupabaseClient } from "@supabase/supabase-js";
/**
 * Retrieves a single product from the database based on a business phone number and product name.
 *
 * @param {number} businessPhone - The phone number of the business associated with the product.
 * @param {string} productName - The name of the product to retrieve.
 * @returns {(Promise<Product | null>)} A promise that resolves to a Product object or null if an error occurs.
 */
export declare function getProduct(supabase: SupabaseClient, businessPhone: string, productName: string): Promise<any>;
/**
* Retrieves products from the database based on a business phone number.
*
* @param {number} businessPhone - The phone number of the business associated with the products.
* @returns {(Promise<Product[] | null>)} A promise that resolves to an array of Product objects or null if an error occurs.
*/
export declare function getProducts(supabase: SupabaseClient, businessPhone: string): Promise<any[]>;
