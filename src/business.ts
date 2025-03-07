import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * Fetches the business ID associated with a given phone number.
 *
 * @param {number} businessPhone - The phone number of the business to retrieve.
 * @returns {Promise<number>} A promise that resolves to the business ID if found, or 0 if not found.
 */
export async function getBusinessIdByPhoneNumber(
    supabase: SupabaseClient,
    businessPhone: string
): Promise<number> { // i probably break something
    let { data, error } = await supabase
        .from("business")
        .select("id")
        .eq("phone", businessPhone)
        .single()
    if (error) console.error('getBusinessIdByPhoneNumber', error)
    if (!data || data == null) return 0

    console.log('getBusinessIdByPhone', data)

    return data && data.id as number
}