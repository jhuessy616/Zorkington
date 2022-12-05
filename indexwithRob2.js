let Room = require("./roomswithRob2.js");
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

let foyer = new Room({
  name: "foyer",
  inventory: [
    {
      item: "note",
      message: "You picked up the note and it says the following...",
    },
    {
      item: "key",
      message: "You picked the key and can be used in the kitchen",
      moveable: false,
    },
  ],
  description: "You are currently in the foyer and you see a note a key",
  people: ["John", "Peggy"],
  requiredKey: false,
  possibleRooms: ["hallway", "kitchen"],
});
let kitchen = new Room({
  name: "kitchen",
  inventory: [],
  description: "You are currently in the kitchen it is empty",
  people: [],
  requiredKey: true,
  possibleRooms: ["foyer"],
});

// console.log(foyer.inventory);

let state = {
  foyer: foyer,
  kitchen: kitchen,
};

let currentLocation = "foyer";
async function start() {
  const welcomeMessage = `182 Main St.
You are standing on Main Street between Church and South Winooski.
There is a door here. A keypad sits on the handle.
On the door is a handwritten sign.`;

  let answer;
  console.log(state[currentLocation].description);
  while (answer !== "quit") {
    answer = await ask(">_");
    evaluateAnswer(answer);
  }
  process.exit();
}

start();
let commands = {
  movement: ["move", "enter", "walk", "go", "move to"],
  pickup: ["pick", "grab", "take", "pickup"],
  drop: ["drop", "discard"],
  examine: ["read", "look", "examine", "inspect", "study"],
  talkTo: ["ask", "speak", "question", "talk"],
  help: ["help"],
  inventory: ["inventory"],
  unlock: ["unlock", "open"],
  solve: ["solve"],
  room: ["room"],
  view: ["view", "look", "see", "read"],
};
function evaluateAnswer(answer) {
  // let action = answer[0];
  // let target = answer.slice(1).join(" ");

  let [action, target] = answer.split(" ");
//   console.log(action, target);
  // if (commands.view.includes(action)) {
  //   if (target == "inventory") {
  //     state[currentLocation].viewRoomInventory();
  //   }
  // }
  //  Viewing and Inventory
  if (commands.view.includes(action) && target == "inventory") {
    state[currentLocation].viewRoomInventory();
  }
  // Picking up Items
  if (commands.pickup.includes(action)) {
    if (
      state[currentLocation].inventory
        .map((inventory) => inventory.item)
        .includes(target)
    ) {
      state[currentLocation].removeInventory(target);
    } else {
      console.log("There is not an item named " + target + " in the room");
    }
  }
    //  Move locations

  if (commands.movement.includes(action)) {
    let currentPossibleRooms = state[currentLocation].possibleRooms;

    if (currentPossibleRooms.includes(target)) {
      if (state[target].isDoorLocked === false) {
        currentLocation = target;
        console.log(state[currentLocation].description);
        // You need to set the isDoorLocked = true
        state[currentLocation].isDoorLocked = false
      } else {
        console.log("Door is locked");
      }
    } else {
      // NOT A ROOM
      console.log("You cannot get to that room from here");
    }
  }

  // Use an key
  // if (commands.view.includes(action) && target == "inventory") {
  //   state[currentLocation].viewRoomInventory();
  // } else if (
  //   commands.pickup.includes(action) &&
  //   state[currentLocation].inventory
  //     .map((inventory) => inventory.item)
  //     .includes(target)
  // ) {
  //   state[currentLocation].removeInventory(target);
  // } else {
  //   console.log("There is not an item named " + target + " in the room");
  // }
}
