import supabase from "./superbase";

export async function getCabins(){

    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if (error){
        console.error(error);
        throw new Error("error retrieving data from cabins table");
    }
    return data;
    

}