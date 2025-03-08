/**
 * Save a number to the database.
 *
 * @param {string} customerPhone - A phone number from a customer.
*/
export async function getOrCreatePhoneNumber(supabase, customerPhone) {
    try {
        const { data, error } = await supabase
            .from("phones")
            .select("*")
            .eq("number", customerPhone)
            .single();
        if (error)
            console.error(error.message);
        if (data)
            return data;
        const { data: upsertData, error: upsertError } = await supabase
            .from("phones")
            .upsert([{ number: customerPhone }]);
        if (upsertData)
            return upsertData[0];
        if (upsertError)
            console.error(upsertError);
    }
    catch (error) {
        console.error('getOrCreatePhoneNumber', error);
        return undefined;
    }
}
export async function getPhoneIdByNumber(supabase, phoneNumber) {
    let { data, error } = await supabase
        .from("phones")
        .select("*")
        .eq("number", phoneNumber)
        .single();
    if (error)
        console.error('getPhoneIdByNumber', error);
    return data.id;
}
