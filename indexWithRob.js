let Room = require("./room.js");
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
  inventory: ["note", "key"],
  description: "You are currently in the foyer and you see a note a key",
  people: ["John", "Peggy"],
  requiredKey: false,
  possibleRooms: ["hallway", "kitchen"],
});

console.log(foyer.inventory);

let state = {
  foyer: foyer,
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
  }
  process.exit();
}

start();

let commands = {
  movement: ["move", "enter", "walk", "go"],
  pickup: ["pick", "grab", "take"],
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
  answer = answer.split(" ");
  console.log(answer);
  // let action = answer[0];
  // let target = answer.slice(1).join(" ");
  let [action, target] = answer.split(" ");
  console.log(action, target);

  //  if (action == "view" && target == "inventory") {
  //    state[currentLocation].viewRoomInventory();
  // }
  
  if (commands.view.includes(action) && target == "inventory") {
    state[currentLocation].viewRoomInventory();
  }

  if (
    commands.pickup.includes(action) &&
    state[currentLocation].inventory
      .map((inventory) => inventory.item)
      .includes(target)
  ) {
    state[currentLocation].removeInventory(target);
  } else {
    console.log("There is not an item named " + target + " in the room");
  }
}