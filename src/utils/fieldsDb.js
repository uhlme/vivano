import { set, get, del, keys } from "idb-keyval";

// Save a field
export const saveField = async (field) => set(`field-${field.id}`, field);

// Load a single field
export const loadField = async (id) => get(`field-${id}`);

// Delete a field
export const deleteField = async (id) => del(`field-${id}`);

// List all fields
export const listFields = async () => {
  const allKeys = await keys();
  const fieldKeys = allKeys.filter(key => typeof key === "string" && key.startsWith("field-"));
  return Promise.all(fieldKeys.map(get));
}
