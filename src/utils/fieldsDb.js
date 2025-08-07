import { createStore, set, get, del, keys } from "idb-keyval";

// 1. IDB Store anlegen
const vivanoStore = createStore('vivano-db', 'fields');

// 2. Methoden – überall den Store als letzten Parameter!
export const saveField = async (field) => set(`field-${field.id}`, field, vivanoStore);
export const loadField = async (id) => get(`field-${id}`, vivanoStore);
export const deleteField = async (id) => del(`field-${id}`, vivanoStore);
export const listFields = async () => {
  const allKeys = await keys(vivanoStore); // Beachte store!
  const fieldKeys = allKeys.filter(key => typeof key === "string" && key.startsWith("field-"));
  return Promise.all(fieldKeys.map(key => get(key, vivanoStore)));
}
