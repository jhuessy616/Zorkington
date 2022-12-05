const { Console } = require("console");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

// ----------------------------------------------------------------------------
// ! -------------------------- Classes ---------------------------------------

class Room {
  constructor({
    name,
    description,
    inventory,
    people,
      requiredKey,
    isRoomLocked,
    possibleRooms,
  }) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.people = people;
    this.requiredKey = requiredKey;
      this.isRoomLocked = isRoomLocked;
    this.possibleRooms = possibleRooms;
  }

  addInventory(inventoryItem) {
    this.inventory.push(inventoryItem);
    return this.inventory;
  }

  removeInventory(itemToBeRemoved) {
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory !== itemToBeRemoved
    );
  }
  viewRoomInventory() {
    return console.log(
      `This room has the following items: ` + this.inventory.join(", ")
    );
  }
}

class Item {
  constructor({ name, description, inventory, moveable, isLocked, lockedMessage, requiredKey }) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
    this.moveable = moveable;
      this.isLocked = isLocked;
      this.lockedMessage = lockedMessage
      this.requiredKey= requiredKey
  }
}
class Player {
  constructor(inventory) {
    this.inventory = inventory;
  }
  addInventory(inventoryItem) {
    this.inventory.push(inventoryItem);
    return this.inventory;
  }
  removeInventory(itemToBeRemoved) {
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory.item !== itemToBeRemoved
    );
  }

  doesPlayerHaveCorrectItem(item) {
    return this.inventory.includes(item);
  }
}
// ! ROOMS----------------------
// Julia's room 
let player = new Player([]);
let playerInventory = player.inventory;

let kitchen = new Room({
  name: "Julia's kitchen",
  inventory: ["clock", "wardrobe"],
  description:
    "You are at Julia’s grandmother’s also known as Homeplace, a sign in the kitchen says ‘There’s no place like Homeplace’ and you can’t decide if it’s sweet or menacing.What kind of secrets do these walls hold? Elena has come for a potluck and the table is flipped and food is all over the floor.You wonder italics Would Elena have kidnapped Rob to take over his job, is this an attempt to move up the corporate ladder by taking out her direct superior? Julia is in the corner looking distraught. Julia, who is always talking… has it all been a cover to hide the truth? A large grandfather clock [clock] chimes 10 oclock  and you notice a wardrobe large enough to store a body in the corner of the room. There's also a door to Jonas’s lair and a door marked with a large A [doorA].",
  people: ["julia", "elena"],
    requiredKey: false,
  isRoomLocked: false,
  possibleRooms: ["lair", "doora"],
});

//  Jonas's Lair 
let lair = new Room({
  name: "Jonas' Lair",
  inventory: ["NES"],
  description: "You are now in Jonas’ Lair. We never get to see much of his space from his camera view, and you wonder, italics Is it because he’s hiding something? End italics.  Rob is always making jokes about Jonas’ age and pointing out how young he is. Italics Did it push Jonas to the edge, was he sick of being reminded daily that he can’t drink and he’s barely an adult? End italics Jonas sits at his workspace, his large monitors glowing as he plays Name OF GAME JONAS LIKES. You notice a Nintendo Entertainment System (NES) sitting on a bookshelf. Italics That’s odd, Jonas wasn’t even alive when NES was released, how did he ever get his hands on one? End Italics You see the door that you just came through from Julia’s home, but don’t see any other doors out of here. Italics Could this be a dead end?",  
  people: ["jonas"],
    requiredKey: false,
  isRoomLocked: false,
  possibleRooms: ["kitchen"],
});

//  ALice's Room ------------------------
let bedroom = new Room({
  name: "Alice's Bedroom",
  inventory: ["guitar", "pick"],
  description: "bla bla bla ",  
  people: ["alice"],
    requiredKey: "letter",
  isRoomLocked: true,
  possibleRooms: ["kitchen"],
});

// ! ALL ITEMS ------------------

//  ITEMS  In Julia's kitchen ______________
let wardrobe = new Item({
  name: "wardrobe",
  description:
    "The wardrobe opens, the scent of pine and fresh air wafts over you./nYou are now standing inside the wardrobe. Italics Have you found a secret door to Narnia? End italics  you wonder. You are absolutely giddy with excitement. You feel around in the dark, you find something and you pick it up.  You use the flashlight of your phone to illuminate the object. It’s a, it’s a, IT’s A royal pine car air freshener. Well that explains the smell, you quickly flash your flashlight all around you, just knowing this must be a secret portal. Nope, you’re just standing in an empty dark wardrobe looking like an idiot.",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "The wardrobe is locked, but an odd H is etched into the wood just above the keyhole.",
  requiredKey: "key",
});


let key = new Item({
  name: "key",
  description: "H key",
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});

let clock = new Item({
  name: "clock",
  description:
    "This grandfather clock is from pre WWII germany and it was clearly recently wound. You notice something strange. The hour hand looks like a key, wait a second, it is a key! Not just any key but a key with a strange H, that you’ve only seen when Julia signs her last name, Huessy. The family symbol! The Huessy H!",
  inventory: ["key"],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});

let julia = new Item({
  name: "Julia",
  description:
    "'I don’t know what happened!  Rob was here and I stepped out to buy a keg of Heady Topper because after this week of learning about promises from Paul I knew we were all going to need a lot more to drink. When I came back, Rob was gone and the house was in disarray'./n You think to yourself, she’s not wrong about Paul, I still feel like I’m lost in a rabbit hole after this week’s lessons. I could really go for a drink. You stop yourself. Eyes on the prize, no time for drinking we have to find Rob.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: [], 
});
let elena = new Item({
  name: "Elena",
  description:
    "“Rob was having a great time. I swear I don’t know what happened! He was telling me one of his famous dad jokes and then out of nowhere he stood up suddenly, causing the table to flip over and ran out of the room. I was so preoccupied with the flipping table that I didn’t see which way he went.” Italics Likely story you think... We all know kidnappers are almost always those who are closest to the victim.end italics  Elena is the last one to have seen Rob and is now our number one suspect.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [], 
  requiredKey:[]
});

// -------------------Lookup tables -------------------
let roomLookUp = {
    kitchen: kitchen,
    lair: lair,
    doora: bedroom,
};

let itemLookUp = {
  clock: clock,
  wardrobe: wardrobe,
  julia: julia,
  elena: elena,
  key: key,
};

let interactionLookUp = {
  pickUp: ["key", "note", "pick"],
  talkTo: ["julia", "elena", "jonas"],
  rooms: ["kitchen", "lair", "tacoshop", "bedroom", "concert"],
};



let commandWords = {
  movement: ["move", "enter", "walk", "go", "move to", "go to"],
  pickup: ["pick", "grab", "take", "pickup"],
  drop: ["drop", "discard"],
  talk: ["ask", "speak", "question", "talk"],
  help: ["help"],
  inventory: ["inventory"],
  unlock: ["unlock", "open",],
  solve: ["solve"],
  room: ["room"],
  view: ["view", "look", "see", "read", "examine", "inspect", "study", "check"],
};
let currentLocation = "kitchen";

// ! FUNCTIONS -----------------------------------------------------------------

// view inventory

start();
async function start() {
    await ask(
        "You find yourself in great distress, your beloved instructor, Rob Vanarsdall, has been kidnapped! (* GASP*) Your classmates are beside themselves, but is it a coverup? Did one of them kidnap Rob to avoid completing their Zorkington project or are they truly innocent? It will be up to you to discover the truth. You are outside the Upright Mansion, where each door is a portal to another student's location. It is up to you to figure out who has kidnapped Rob and to return him to his beloved students. Press any key to enter."
    );

    console.log();
    console.log(roomLookUp[currentLocation].description);

    let answer;
    while (answer !== "quit") {
        let answer = (await ask(">_")).toLowerCase().trim().split(" ");
        let command = answer[0];
        let target = answer[answer.length - 1];
        let twoWordTarget = answer
            .slice(answer.length - 2, answer.length)
            .join(" ");
        console.log(answer);
        console.log(command, target);
        console.log(twoWordTarget);

        // !cool way jonas and I worked out, but hard to use look up table after
        // if (Object.keys(commands).includes(commandWords.includes(command))) {
        //     commands[command](target);
        // }

        //    ! ---------------View Room Inventory--------------------
        if (
            commandWords.view.includes(command) &&
            (twoWordTarget === "room inventory")
        ) {
            roomLookUp[currentLocation].viewRoomInventory();
        }

        //     //! View Player Inventory-------------------------
        else if (
            commandWords.view.includes(command) &&
            twoWordTarget == "player inventory"
        ) {
            console.log(
                "You have the following inventory:" + playerInventory.join(", ")
            );
        }

        //   ! ---------------- Pickup Item --------------------
        else if (commandWords.pickup.includes(command)) {
            let roomInventory = roomLookUp[currentLocation].inventory;
            let currentItem = itemLookUp[target];

            console.log(roomInventory);

            // If already in players inventory
            if (playerInventory.includes(target)) {
                console.log("You already have the " + target + " in your inventory");
                console.log(playerInventory.join(", "));
            } else if (
                roomInventory.includes(target) &&
                currentItem.moveable == true
            ) {
                player.addInventory(target);
                console.log("You picked up the " + target);
                roomLookUp[currentLocation].removeInventory(target);
            }
            else if ((clock).inventory.includes(target) && (roomLookUp[currentLocation].name === "Julia's kitchen")) {
                console.log("You have picked up the H Key!");
                player.addInventory(target);
            }
            else {
                console.log("You can't take that");
            }
        }
      
        //   ! Inspect an item in the room ----------------------- 
          
        else if (commandWords.view.includes(command)) {
            if (itemLookUp[target].isLocked === false && (roomLookUp[currentLocation].inventory.includes(target))) {
                console.log(itemLookUp[target].description);
            }

            else if (itemLookUp[target].isLocked === true && (roomLookUp[currentLocation].inventory.includes(target))) {
                console.log(itemLookUp[target].lockedMessage);
            }
          
        }

        //   ! OPEN DOOR 
        //   Have key 
        else if (commandWords.unlock.includes(command)) {
            if (playerInventory.includes(itemLookUp[target].requiredKey)) {
                console.log(itemLookUp[target].description);
                itemLookUp[target].isLocked = false;
            }
            else {
                console.log("You do not have the right key to open this.");
            }
        }
        //   ! Speak to ------------
        else if (commandWords.talk.includes(command)) {
            if (interactionLookUp.talkTo.includes(target) && roomLookUp[currentLocation].people.includes(target)) {
                console.log(itemLookUp[target].description);
            }
            else { console.log("You cannot speak to that person.") }
        }

        // ! MOVE -------------
        else if (commandWords.movement.includes(command)) {
           let currentPossibleRooms = roomLookUp[currentLocation].possibleRooms;
            if (currentPossibleRooms.includes(target)) {
        if (roomLookUp[target].isRoomLocked == false) {
            
        currentLocation = target;
        console.log(roomLookUp[currentLocation].description);
        // You need to set the isDoorLocked = true
      } else {
        console.log("This door is locked");
      }
    } else {
      // NOT A ROOM
      console.log("You cannot get to that room from here");
    }
  }

        }
    }

