import { getOrCreatePhoneNumber, getPhoneIdByNumber } from "./phone-numbers.js";
import { getBusinessIdByPhoneNumber } from "./business.js";
/**
 * Saves a chat to the database.
 *
 * @param {string} businessId - The ID of the business associated with the chat.
 * @param {string} customerPhone - The phone number of the customer associated with the chat.
 */
export async function saveChatToDB(supabase, businessId, customerPhone, chatId) {
    console.log("saveChatToDB");
    const phoneNumber = await getOrCreatePhoneNumber(supabase, customerPhone);
    if (phoneNumber) {
        try {
            const { data } = await supabase
                .from("chats")
                .insert([{ id: chatId, business_id: businessId, customer_phone_id: phoneNumber.id }]);
            console.log(data);
        }
        catch (error) {
            console.error('saveChatToDB', error);
        }
    }
}
export async function getChatByClientAndBusinessPhone(supabase, customerPhone, businessPhone) {
    let customerPhoneId = await getPhoneIdByNumber(supabase, customerPhone);
    let businesId = await getBusinessIdByPhoneNumber(supabase, businessPhone);
    let { data: chats, error: chatsError } = await supabase
        .from("chats")
        .select("*")
        .eq("customer_phone_id", String(customerPhoneId))
        .eq("business_id", String(businesId))
        .single();
    if (chatsError)
        console.error('getChatByClientAndBusinessPhone', chatsError);
    return chats;
}
export async function getChatId(supabase, businessId, customerPhoneId) {
    const { data, error } = await supabase
        .from("chats")
        .select("id")
        .eq("business_id", businessId)
        .eq("customer_phone_id", customerPhoneId)
        .single();
    if (error)
        console.error('getChatId', error);
    return data?.id;
}
export async function getChats(supabase) {
    const { data, error } = await supabase
        .from("chats")
        .select("*")
        .limit(10);
    if (error)
        console.error('getChats', error);
    return data;
}
