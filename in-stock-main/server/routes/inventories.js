const router = require("express").Router();
const { readData, writeData, removeItem } = require("../utilities/utilities");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

//API to POST/Create a new inventory item
router.post("/:id", async (req, res) => {
  console.log("this is the post call", req.body); // <-- works
  const inventoryVar = await readData("inventories.json");
  console.log("running inventory check", inventoryVar); // <-- works
  // add a new item for other call not replacing existing things
  const getItem = {
    id: uuidv4(),
    warehouseID: uuidv4(),
    warehouseName: req.body.warehouseName,
    itemName: req.body.itemName,
    description: req.body.description,
    category: req.body.category,
    status: req.body.status,
    quantity: req.body.quantity,
  };
  
  inventoryVar.push(getItem);

  await writeData("inventories.json", inventoryVar);

  res.send({ message: "inventory updated successfully!" });
});

//get all inventory items from all inventories
router.get("/", async (req, res) => {
  res.json(await readData("inventories.json"));
});

// finds and returns the a inventory with the given id, returns undefined if not found
async function getInventoryItem(id) {
  return (await readData("inventories.json")).find((w) => w.id === id);
}

// handles get requests at /inventory/:id
router.get("/:id", async (req, res) => {
  const inventory = await getInventoryItem(req.params.id);

  // if no inventory was found then the given id is not valid, send 404 response
  if (!inventory)
    res.status(404).json({ message: "No inventory with that id exists" });
  // respond with the inventory
  else res.json(inventory);
});

// deletes and returns then item with the given id from inventories.json
async function deleteInventoryItem(id) {
  // read the file and remove the item
  const inventory = await readData("inventories.json");
  const item = removeItem(inventory, (i) => i.id === id);

  // if an item was remove then update the file
  if (item) await writeData("inventories.json", inventory);

  return item;
}

// handles delete requests at /inventories/:id
router.delete("/:id", async (req, res) => {
  // delete the item
  const data = await deleteInventoryItem(req.params.id);

  // if no item was deleted then the given id is not valid, send 404 response
  if (!data) res.status(404).json({ message: "No item with that id exists" });
  // respond with the delete item
  else res.json(data);
});

router.put("/:id", async (req, res) => {
  const inventory = await readData("inventories.json");
  const item = inventory.find((item) => req.params.id === item.id)
  if (item){
    item.warehouseID = req.body.warehouseID
    item.warehouseName = req.body.warehouseName
    item.itemName = req.body.itemName
    item.description = req.body.description
    item.category = req.body.category
    item.status = req.body.status
    item.quantity = req.body.quantity
  }
  fs.writeFileSync('./data/inventories.json', JSON.stringify(inventory));
  res.json(inventory);
});

module.exports = router;
