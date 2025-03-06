import type PhoneNumber from "./dto/phone-number";
import { supabase } from "./supabaseClient";

/** 
 * Save a number to the database.
 *
 * @param {string} customerPhone - A phone number from a customer.
*/
export async function getOrCreatePhoneNumber(customerPhone: string): Promise<PhoneNumber | undefined> {
    try {
        const { data, error } = await supabase.from("phones").select("*").eq("number", customerPhone).single();

        if (error) throw new Error(error.message);

        if (data) return data;

        const { data: upsertData } = await supabase.from("phones").upsert([{ number: customerPhone }]);
        return upsertData[0];
    } catch (error) {
        console.error('getOrCreatePhoneNumber', error);
        return undefined;
    }
}

export async function getPhoneIdByNumber(phoneNumber: string): Promise<number | null> {
    let { data, error } = await supabase
        .from("phones")
        .select("*")
        .eq("number", phoneNumber)
        .single()
    if (error) console.error('getPhoneIdByNumber', error)

    return data.id
}