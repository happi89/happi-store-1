migrate((db) => {
  const collection = new Collection({
    "id": "950sak4rdmrgpzz",
    "created": "2023-06-05 22:57:07.866Z",
    "updated": "2023-06-05 22:57:07.866Z",
    "name": "carts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ox0yucsi",
        "name": "field",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "dpjzeyk4",
        "name": "cart",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("950sak4rdmrgpzz");

  return dao.deleteCollection(collection);
})
