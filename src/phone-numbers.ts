import type { SupabaseClient } from "@supabase/supabase-js";
import type PhoneNumber from "./dto/phone-number.js";

/** 
 * Save a number to the database.
 *
 * @param {string} customerPhone - A phone number from a customer.
*/
export async function getOrCreatePhoneNumber(
    supabase: SupabaseClient,
    customerPhone: string
): Promise<PhoneNumber | undefined> {
    try {
        const { data, error } = await supabase
            .from("phones")
            .select("*")
            .eq("number", customerPhone)
            .single();
        if (error) console.error(error.message);
        if (data) return data;

        const { data: upsertData, error: upsertError } = await supabase
            .from("phones")
            .upsert([{ number: customerPhone }]);
        if (upsertData) return upsertData[0];
        if (upsertError) console.error(upsertError)

    } catch (error) {
        console.error('getOrCreatePhoneNumber', error);
        return undefined;
    }
}

export async function getPhoneIdByNumber(supabase: SupabaseClient, phoneNumber: string): Promise<number | null> {
    let { data, error } = await supabase
        .from("phones")
        .select("*")
        .eq("number", phoneNumber)
        .single()
    if (error) console.error('getPhoneIdByNumber', error)

    return data.id
}