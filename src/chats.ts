import { supabase } from "./supabaseClient";
import { getOrCreatePhoneNumber, getPhoneIdByNumber } from "./phone-numbers";
import { getBusinessIdByPhoneNumber } from "./business";

/**
 * Saves a chat to the database.
 *
 * @param {string} businessId - The ID of the business associated with the chat.
 * @param {string} customerPhone - The phone number of the customer associated with the chat.
 */
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

export async function getChatByClientAndBusinessPhone(
    customerPhone: string,
    businessPhone: string
): Promise<any> {
    let customerPhoneId = await getPhoneIdByNumber(customerPhone)
    let businesId = await getBusinessIdByPhoneNumber(businessPhone)

    let { data: chats, error: chatsError } = await supabase
        .from("chats")
        .select("*")
        .eq("customer_phone_id", String(customerPhoneId),)
        .eq("business_id", String(businesId),)
        .single()

    if (chatsError) console.error('getChatByClientAndBusinessPhone', chatsError)

    return chats
}

export async function getChatId(businessId: number, customerPhoneId: number | null) {
    const { data, error } = await supabase
        .from("chats")
        .select("id")
        .eq("business_id", businessId)
        .eq("customer_phone_id", customerPhoneId)
        .single()

    if (error) console.error('getChatId', error)

    return data?.id
}

export async function getChats() {
    const { data, error } = await supabase
        .from("chats")
        .select("*")
        .limit(10)

    if (error) console.error('getChats', error)

    return data
}