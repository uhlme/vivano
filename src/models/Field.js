export default class Field {
  constructor(id, name, crop, area, geometry = null, note = "") {
    this.id = id; // e.g. uuid
    this.name = name;
    this.crop = crop;
    this.area = area; // numeric (ha)
    this.geometry = geometry; // e.g. GeoJSON or null
    this.note = note;
  }
}
