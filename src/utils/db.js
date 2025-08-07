import { set, get, del, keys } from "idb-keyval";

export const saveField = async (field) => set(`field-${field.id}`, field);
export const loadField = async (id) => get(`field-${id}`);
export const deleteField = async (id) => del(`field-${id}`);
export const listFields = async () => {
  const allKeys = await keys();
  const fieldKeys = allKeys.filter((key) => key.startsWith("field-"));
  return Promise.all(fieldKeys.map((key) => get(key)));
}
