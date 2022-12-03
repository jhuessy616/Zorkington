class Room {
  constructor({
    name,
    description,
    inventory,
    people,
    requiredKey,
    possibleRooms,
  }) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.people = people;
      this.requiredKey = requiredKey;
        this.isRoomLocked = requiredKey ? true : false
    this.possibleRooms = possibleRooms;
  }

  addInventory(inventoryItem) {
    this.inventory.push(inventoryItem);
    return this.inventory;
  }

 removeInventory(itemToBeRemoved) {
    if (this.inventory.length == 0) {
      return console.log(`The ${this.name} has no inventory to remove`);
    }
    let message = this.inventory.filter(
      (currentInventory) => currentInventory.item == itemToBeRemoved
    )[0].message;
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory.item !== itemToBeRemoved
    );
    console.log(message);
  }

  viewRoomInventory() {
    return console.log(
      `This room has the following items: ` +
        this.inventory.map((inventory) => inventory.item).join(", ")
    );
  }
}

module.exports = Room;
