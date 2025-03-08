import type { SupabaseClient } from "@supabase/supabase-js";
import { getBusinessIdByPhoneNumber } from "./business.js";

/**
 * Retrieves a single product from the database based on a business phone number and product name.
 *
 * @param {number} businessPhone - The phone number of the business associated with the product.
 * @param {string} productName - The name of the product to retrieve.
 * @returns {(Promise<Product | null>)} A promise that resolves to a Product object or null if an error occurs.
 */
export async function getProduct(supabase: SupabaseClient, businessPhone: string, productName: string) {
    let businessId = await getBusinessIdByPhoneNumber(supabase, String(businessPhone))
    let { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessId)
        .ilike("name", `${productName}%`)
        .single()
    if (error) console.error('getProduct', error)
    console.log(data)
    return data
}

/**
* Retrieves products from the database based on a business phone number.
*
* @param {number} businessPhone - The phone number of the business associated with the products.
* @returns {(Promise<Product[] | null>)} A promise that resolves to an array of Product objects or null if an error occurs.
*/
export async function getProducts(supabase: SupabaseClient, businessPhone: string) {
    let businessId = await getBusinessIdByPhoneNumber(supabase, businessPhone)
    let { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessId)
        .limit(5)
    if (error) console.error('getProducts', error)
    return data
}