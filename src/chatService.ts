import { supabase } from "./supabaseClient";
import { getOrCreatePhoneNumber } from "./phoneNumberService";

export async function saveChatToDB(businessId: number, customerPhone: string, chatId: string): Promise<void> {
    console.log("saveChatToDB");

    const phoneNumber = await getOrCreatePhoneNumber(customerPhone);
    if (phoneNumber) {
        try {
            const { data } = await supabase
                .from("chats")
                .insert([{ id: chatId, business_id: businessId, customer_phone_id: phoneNumber.id }]);

            console.log(data);
        } catch (error) {
            console.error('saveChatToDB', error);
        }
    }
}