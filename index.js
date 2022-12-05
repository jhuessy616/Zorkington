let Room = require("./myrooms.js");
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
// Everything ypu can do in room 1 @ Julia's
let julia = new Room({
  name: "julia's dining room",
  inventory: [
    {
      item: "grandfather clock",
      removeable: false,
      isInventoryLocked: false,
      keyToUnlock: [],
      lockedMessage: [],
      message: "This grandfather clock is from pre WWII germany and it was clearly recently wound. You notice something strange. The hour hand looks like a key, wait a second, it is a key! Not just any key but a key with a strange H, that you’ve only seen when Julia signs her last name, Huessy. The family symbol! The Huessy H!",
      itemInventory: ["H key"]
    },

    {
      item: "wardrobe",
      removable: false, 
      isInventoryLocked: true,
      keyToUnlock: "H key",
      lockedMessage: "The wardrobe is locked, but an odd H is etched into the wood just above the keyhole.",
      message: "“The wardrobe opens, the scent of pine and fresh air wafts over you./nYou are now standing inside the wardrobe. Italics Have you found a secret door to Narnia? End italics  you wonder. You are absolutely giddy with excitement. You feel around in the dark, you find something and you pick it up.  You use the flashlight of your phone to illuminate the object. It’s a, it’s a, IT’s A royal pine car air freshener. Well that explains the smell, you quickly flash your flashlight all around you, just knowing this must be a secret portal. Nope, you’re just standing in an empty dark wardrobe looking like an idiot.'",
    },
  ],

  specialMessage: "The wardrobe is locked, but an odd H is etched into the wood just above the keyhole.",
  description: "You are at Julia’s grandmother’s also known as Homeplace, a sign in the dining room says ‘There’s no place like Homeplace’ and you can’t decide if it’s sweet or menacing.What kind of secrets do these walls hold? Elena has come for a potluck and the table is flipped and food is all over the floor.You wonder italics Would Elena have kidnapped Rob to take over his job, is this an attempt to move up the corporate ladder by taking out her direct superior? End italics.Julia is in the corner looking distraught.Italics Julia, who is always talking… has it all been a cover to hide the truth? A large grandfather clock chimes 10 oclock  and you notice a wardrobe large enough to store a body in the corner of the room. There's also a door to Jonas’s lair and a door marked with a large A [door A].",
  people: [{
    personsName: "Julia",
    text: "'I don’t know what happened!  Rob was here and I stepped out to buy a keg of Heady Topper because after this week of learning about promises from Paul I knew we were all going to need a lot more to drink. When I came back, Rob was gone and the house was in disarray'./n You think to yourself, she’s not wrong about Paul, I still feel like I’m lost in a rabbit hole after this week’s lessons. I could really go for a drink. You stop yourself. Eyes on the prize, no time for drinking we have to find Rob.",
  },
    {
      personsName: "Elena",
    text: "“Rob was having a great time. I swear I don’t know what happened! He was telling me one of his famous dad jokes and then out of nowhere he stood up suddenly, causing the table to flip over and ran out of the room. I was so preoccupied with the flipping table that I didn’t see which way he went.” Italics Likely story you think... We all know kidnappers are almost always those who are closest to the victim.end italics  Elena is the last one to have seen Rob and is now our number one suspect."}],
  requiredKey: false,
  possibleRooms: ["jonas's lair", "door A", "wardrobe"],
});

let wardrobe = new Room({
  name: "wardrobe",
  inventory: [],
specialMessage:[],
  description: "“The wardrobe opens, the scent of pine and fresh air wafts over you./nYou are now standing inside the wardrobe. Italics Have you found a secret door to Narnia? End italics  you wonder. You are absolutely giddy with excitement. You feel around in the dark, you find something and you pick it up.  You use the flashlight of your phone to illuminate the object. It’s a, it’s a, IT’s A royal pine car air freshener. Well that explains the smell, you quickly flash your flashlight all around you, just knowing this must be a secret portal. Nope, you’re just standing in an empty dark wardrobe looking like an idiot.",
  people: [],
  requiredKey: true,
  possibleRooms: ["julia's dining room"],
});

// console.log(foyer.inventory);

let state = {
  julia: julia,
  wardrobe: wardrobe,
};
  let commands = {
    movement: ["move", "enter", "walk", "go", "move to", "go to"],
    pickup: ["pick", "grab", "take", "pickup"],
    drop: ["drop", "discard"],
    talkTo: ["ask", "speak", "question", "talk"],
    help: ["help"],
    inventory: ["inventory"],
    unlock: ["unlock", "open"],
    solve: ["solve"],
    room: ["room"],
    view: ["view", "look", "see", "read", "examine", "inspect", "study"],
  };
let currentLocation = "julia";

start();

async function start() {
  const welcomeMessage = "You find yourself in great distress, your beloved instructor, Rob Vanarsdall, has been kidnapped! (* GASP*) Your classmates are beside themselves, but is it a coverup? Did one of them kidnap Rob to avoid completing their Zorkington project or are they truly innocent? It will be up to you to discover the truth. You are outside the Upright Mansion, where each door is a portal to another student's location. It is up to you to figure out who has kidnapped Rob and to return him to his beloved students. Press any key to enter >_";

  let answer = await ask(welcomeMessage);

  
  console.log(state[currentLocation].description);
  while (answer !== "quit") {
    answer = await ask(">_");
    evaluateAnswer(answer);
  }
 



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
       if ((state[currentLocation].inventory
        .map((inventory) => inventory.item)
        .includes(target)) && (state[currentLocation].inventory.removeable
          .map((inventory) => inventory.removeable) === true)))
      ) {
        state[currentLocation].removeInventory(target);
      }
      else if ((state[currentLocation].inventory
          .map((inventory) => inventory.item)
          .includes(target)) && (( state[currentLocation].inventory
          .map((inventory) => inventory.removeable === false))) )
      else {
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
          console.log(state[currentLocation].specialMessage);
        }
      } else {
        // NOT A ROOM
        console.log("You cannot get to that room from here");
      }
    }
    
  }
}