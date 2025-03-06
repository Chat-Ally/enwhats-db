import type PhoneNumber from "./dto/phone-number";
import { supabase } from "./supabaseClient";

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