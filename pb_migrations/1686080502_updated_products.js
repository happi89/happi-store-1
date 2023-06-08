migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("17r5jt9vpvl4jsb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvpzxwya",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("17r5jt9vpvl4jsb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pvpzxwya",
    "name": "image",
    "type": "file",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": true
    }
  }))

  return dao.saveCollection(collection)
})
