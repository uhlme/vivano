import React, { createContext, useContext, useEffect, useState } from "react";
import { listFields, saveField, deleteField } from "../utils/fieldsDb";

const FieldsContext = createContext();

export function useFields() {
  return useContext(FieldsContext);
}

export function FieldsProvider({ children }) {
  const [fields, setFields] = useState([]);

  // Load from IndexedDB on mount
  useEffect(() => {
    listFields().then(setFields);
  }, []);

  // Add or update a field
  const upsertField = async (field) => {
    await saveField(field);
    setFields((prev) => {
      const idx = prev.findIndex(f => f.id === field.id);
      if (idx === -1) return [...prev, field];
      const next = [...prev];
      next[idx] = field;
      return next;
    });
  };

  // Delete a field
  const removeField = async (id) => {
    await deleteField(id);
    setFields(prev => prev.filter(f => f.id !== id));
  };

  return (
    <FieldsContext.Provider value={{ fields, upsertField, removeField }}>
      {children}
    </FieldsContext.Provider>
  );
}
