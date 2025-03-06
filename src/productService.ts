import { supabase } from "./supabaseClient";

export async function getProducts(businessPhone: string): Promise<Product[] | null> {
    try {
        const businessId = await getBusinessIdByPhoneNumber(businessPhone);

        if (!businessId) return null;

        const { data, error } = await supabase.from("products").select("_").eq("business_id", businessId).limit(5);

        if (error) throw new Error(error.message);

        return data;
    } catch (error) {
        console.error('getProducts', error);
        return null;
    }
}