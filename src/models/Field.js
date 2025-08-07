// src/models/Field.js
export default class Field {
  constructor(id, name, crop, area, geometry) {
    this.id = id;
    this.name = name;
    this.crop = crop;
    this.area = area;
    this.geometry = geometry;
  }
}
