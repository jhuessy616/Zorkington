class Room {
  constructor({
    name,
    description,
    specialMessage,
    inventory,
    people,
    requiredKey,
    possibleRooms,
  }) {
    this.name = name;
    this.description = description;
    this.specialMessage = specialMessage;
    this.inventory = inventory;
    this.people = people;
    this.requiredKey = requiredKey;
    this.possibleRooms = possibleRooms;
  }

  addInventory(inventoryItem) {
    this.inventory.push(inventoryItem);
    return this.inventory;
  }

    removeInventory(itemToBeRemoved) {
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory.item !== itemToBeRemoved
    );
    console.log("You picked up the " + itemToBeRemoved);
  }

  viewRoomInventory() {
    return console.log(
      `This room has the following items: ` + this.inventory.join(", ")
    );
  }
}

module.exports = Room;