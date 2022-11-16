// import fs that uses promises instead of callbacks
const fs = require('fs').promises;

/*
 * Reads and parses the file with the given filename and returns the entire file as a JS object
 *
 * filename: name of the file, either 'inventories.json' or 'warehouses.json'
 *
 * returns a promise which resolves into a JS object
 *
 * usage: readData('inventories.json').then(inventoryData => {
 *          do something with inventoryData
 *        })
 */
const readData = async (filename) => JSON.parse(await fs.readFile(`./data/${filename}`, 'utf8'));

/*
 * Converts the data object into JSON and saves it a file called filename, any existing contents of filename will be
 * overwritten
 *
 * filename: name of the file, either 'inventories.json' or 'warehouses.json'
 *
 * returns a promise
 *
 * usage: writeData('inventories.json', data).then(() => {
 *          do something after data is saved at 'inventories.json'
 *        })
 */
const writeData = async (filename, data) => fs.writeFile(`./data/${filename}`, JSON.stringify(data), 'utf8');


/*
 * Removes and returns the first item in arr that satisfies the testing function
 *
 * arr: an array
 * fn: a function, similar to what you use in filter, find, etc.
 *
 * returns the removed item, or undefined if no item was found
 */
function removeItem(arr, fn) {
    const index = arr.findIndex(fn);
    if (index > -1) return arr.splice(index, 1)[0];
    return undefined;
}

module.exports = {readData, writeData, removeItem};