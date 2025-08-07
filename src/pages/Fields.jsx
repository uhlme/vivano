import React, { useState } from "react";
import { useFields } from "../context/FieldsContext";
import {
  Box, Typography, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, List, ListItem, ListItemText
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from 'uuid';

function FieldForm({ open, onClose, onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [crop, setCrop] = useState(initial?.crop || "");
  const [area, setArea] = useState(initial?.area || "");
  const [note, setNote] = useState(initial?.note || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: initial?.id || uuidv4(),
      name,
      crop,
      area,
      note
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initial ? "Edit Field" : "Add Field"}</DialogTitle>
      <DialogContent>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth margin="dense" />
        <TextField label="Crop" value={crop} onChange={e => setCrop(e.target.value)} fullWidth margin="dense" />
        <TextField label="Area (ha)" value={area} onChange={e => setArea(e.target.value)} fullWidth margin="dense" type="number" />
        <TextField label="Note" value={note} onChange={e => setNote(e.target.value)} fullWidth margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Fields() {
  const { fields, upsertField, removeField } = useFields();
  const [formOpen, setFormOpen] = useState(false);
  const [editField, setEditField] = useState(null);

  return (
    <Box sx={{ p: 2, pb: 8 }}>
      <Typography variant="h5" mb={2}>Fields</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setEditField(null); setFormOpen(true); }}>
        Add
      </Button>
      <List>
        {fields.map(field =>
          <ListItem key={field.id}
            secondaryAction={
              <>
                <IconButton onClick={() => { setEditField(field); setFormOpen(true); }}>
                  Edit
                </IconButton>
                <IconButton onClick={() => removeField(field.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={`${field.name} – ${field.crop}`} secondary={`Area: ${field.area} ha`} />
          </ListItem>
        )}
      </List>
      <FieldForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={upsertField}
        initial={editField}
      />
    </Box>
  );
}
