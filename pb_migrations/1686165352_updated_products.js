migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("17r5jt9vpvl4jsb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sw7zbtxo",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("17r5jt9vpvl4jsb")

  // remove
  collection.schema.removeField("sw7zbtxo")

  return dao.saveCollection(collection)
})
