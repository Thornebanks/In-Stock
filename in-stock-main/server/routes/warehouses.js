const router = require("express").Router();
const { readData, writeData, removeItem } = require("../utilities/utilities");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const warehouseData = require('../data/warehouses.json');

router.put("/:id", async (req, res) => {
  const warehouseInfo = req.body;
  console.log(warehouseInfo);
  const warehouseId = req.params.id;
  console.log(warehouseId);

  const warehouseVar = await readData("warehouses.json");
  console.log(warehouseVar); // reading and turning into an array
  //loops through if id matches it returns the object
  const warehouse = warehouseVar.find((w) => w.id === req.params.id);
  warehouse.name = req.body.name
  warehouse.address = req.body.address
  warehouse.city = req.body.city
  warehouse.country = req.body.country
  warehouse.contact.name = req.body.contactName
  warehouse.contact.position = req.body.position
  warehouse.contact.phone = req.body.number
  warehouse.contact.email = req.body.email

  await writeData("warehouses.json", warehouseVar);

  res.send("this has been sent!");
});

// Gets list of warehouses
async function getWarehouseList() {
  return await readData("warehouses.json");
}

// deletes and returns then warehouse with the given id from warehouses.json
// also deletes all warehouse inventory from inventories.json
async function deleteWarehouseItem(id) {
  // read the file and remove the item
  const warehouses = await readData("warehouses.json");
  const item = removeItem(warehouses, (i) => i.id === id);

  if (item) {
    // if a warehouse was removed then update the file
    await writeData("warehouses.json", warehouses);

    // also remove any inventory associated with that warehouse
    const inventory = await readData("inventories.json");
    await writeData(
      "inventories.json",
      inventory.filter((i) => i.warehouseID !== id)
    );
  }

  return item;
}

// finds and returns the a warehouse with the given id, returns undefined if not found
async function getWarehouseItem(id) {
  return (await readData("warehouses.json")).find((w) => w.id === id);
}

// handles get request at /warehouses
router.get("/", async (req, res) => {
  const warehouses = await getWarehouseList();
  res.json(warehouses);
});

// handles get requests at /warehouses/:id
router.get("/:id", async (req, res) => {
  const warehouse = await getWarehouseItem(req.params.id);

  // if no warehouse was found then the given id is not valid, send 404 response
  if (!warehouse)
    res.status(404).json({ message: "No warehouse with that id exists" });
  // respond with the warehouse
  else res.json(warehouse);
});

// handles delete requests at /warehouses/:id
router.delete("/:id", async (req, res) => {
  // delete the item
  const data = await deleteWarehouseItem(req.params.id);

  // if no warehouse was deleted then the given id is not valid, send 404 response
  if (!data)
    res.status(404).json({ message: "No warehouse with that id exists" });
  // respond with the deleted warehouse
  else res.json(data);
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { name, address, city, country, position, contactName, phone, email } = req.body;
  fs.readFile("./data/warehouses.json", (err, Newwarehouse) => {
    if (err) {
      console.log(err);
    } else {
      const newWarehouse = JSON.parse(Newwarehouse);
      newWarehouse.push({
        id: uuidv4(),
        name,
        address,
        city,
        country,
        contact: {
          name:contactName,
          position,
          phone,
          email
        }
      });
      fs.writeFileSync("./data/warehouses.json", JSON.stringify(newWarehouse));
      res.json(newWarehouse);
    }
  });
});

router.get('/:id/inventories', async (req, res) => {
    const inventories = await readData('inventories.json')
    res.json(inventories.filter(i => i.warehouseID === req.params.id))
})

module.exports = router;
