import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("error retrieving data from cabins table");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // create a random prefix and remove all forward slashes
  const imageName =  `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // if an id is not present then create the new cabin with a cabin image
  // building the query string for doing a create or an update
  if (!id) {
   query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
   query =  query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  // upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // rollback update if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
