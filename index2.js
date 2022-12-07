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
    console.log(itemToBeRemoved);
    console.log(this.inventory);
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory !== itemToBeRemoved
    );
    console.log(this.inventory);
  }

  doesPlayerHaveCorrectItem(item) {
    return this.inventory.includes(item);
  }
}
// ! ROOMS----------------------
// Julia's room 
let player = new Player(["pie", "tacos", "letter"]);


let kitchen = new Room({
  name: "Julia's kitchen",
  inventory: ["clock", "wardrobe", "pie", "doora"],
  description:
    "You are at Julia’s grandmother’s also known as Homeplace, a sign in the kitchen says ‘There’s no place like Homeplace’ and you can’t decide if it’s sweet or menacing.What kind of secrets do these walls hold? Elena has come for a potluck and the table is flipped and food is all over the floor, but a freshly baked pie sits unharmed on top of the oven. You wonder italics Would Elena have kidnapped Rob to take over his job, is this an attempt to move up the corporate ladder by taking out her direct superior? Julia is in the corner looking distraught. Julia, who is always talking… has it all been a cover to hide the truth? A large grandfather clock chimes 10 oclock  and you notice a wardrobe large enough to store a body in the corner of the room. There's also a door to Jonas’s lair and a door marked with a large A [doorA].",
  people: ["julia", "elena"],
    requiredKey: false,
  isRoomLocked: false,
  possibleRooms: ["lair", "bedroom"],
});

//  Jonas's Lair 
let lair = new Room({
  name: "Jonas' Lair",
  inventory: ["nes"],
  description: "You are now in Jonas’ Lair. We never get to see much of his space from his camera view, and you wonder, italics Is it because he’s hiding something? End italics.  Rob is always making jokes about Jonas’ age and pointing out how young he is. Italics Did it push Jonas to the edge, was he sick of being reminded daily that he can’t drink and he’s barely an adult? End italics Jonas sits at his workspace, his large monitors glowing as he plays Name OF GAME JONAS LIKES. You notice a Nintendo Entertainment System (NES) sitting on a bookshelf. Italics That’s odd, Jonas wasn’t even alive when NES was released, how did he ever get his hands on one? End Italics You see the door that you just came through from Julia’s home, but don’t see any other doors out of here. Italics Could this be a dead end?",  
  people: ["jonas"],
    requiredKey: false,
  isRoomLocked: false,
  possibleRooms: ["kitchen"],
});

//  ALice's Room ------------------------
let bedroom = new Room({
  name: "Alice's Bedroom",
  inventory: ["guitar"],
  description: "The door with the large A swings open. You go inside. Inside Alice sits on her bed with her guitar sitting nearby. She hums a soft melody that sounds familiar. Is her calmness a facade?, you think to yourself. It's always the quiet ones, always the ones you'd least expect... ",  
  people: ["alice"],
    requiredKey: "letter",
  isRoomLocked: true,
  possibleRooms: ["kitchen"],
});

// -------------Restaurant Taco Gordo
let restaurant = new Room({
  name: "Taco Gordo",
  inventory: ["margarita", "burrito"],
  description: " Bienvenid@ a Taco Gordo! Your favorite local taqueria in downtown Burlington Vermont! Your mouth waters from the scent of fresh tortillas, el pastor tacos, and burritos. You notice two familiar figures slumped over at the bar, it’s Nick and Matt, but they’re not looking so good. Nick looks dazed and confused, like he doesn’t know where he is, and he doesn’t appear to have gotten any sleep. He’s also certainly not dressed for the weather. He’s wearing gold short shorts, and a ripped Burlington Code Academy Tshirt. ITALICS Where did Nick get that Tshirt? You wonder, Italics  not even beloved TA Ben Villa has been able to snag one, and why is it ripped? Matt is in complete disarray, his long hair is all over the place and he appears to be passed out at the bar. Italics Are they attempting to drink away their guilt? These are all signs of guilty men. There’s only the staircase back the way you came to Jonas' lair. You notice a full margarita on the bar next to Matt.",  
  people: ["nick", "matt"],
    requiredKey: [],
  isRoomLocked: false,
  possibleRooms: ["lair"],
});

// ! ALL ITEMS ------------------

//  ITEMS  In Julia's kitchen ______________
let wardrobe = new Item({
  name: "wardrobe",
  description:
    "The wardrobe opens, the scent of pine and fresh air wafts over you. You are now standing inside the wardrobe. Italics Have you found a secret door to Narnia? End italics  you wonder. You are absolutely giddy with excitement. You feel around in the dark, you find something and you pick it up.  You use the flashlight of your phone to illuminate the object. It’s a, it’s a, IT’s A royal pine car air freshener. Well that explains the smell, you quickly flash your flashlight all around you, just knowing this must be a secret portal. Nope, you’re just standing in an empty dark wardrobe looking like an idiot.",
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

let pie = new Item({
  name: "pie",
  description:
    "Blackberry pie... hmmm... Alice's favorite. Was Alice also here?",
  inventory: [],
  moveable: true,
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

// ----------------------Jonas' Lair Items -----------------
let jonas = new Item({
  name: "Jonas",
  description:"'What’s going on?', Jonas asks. You inform him of Rob’s kidnapping. He appears shocked. 'What! Who would do that? I haven’t seen Rob since our last class. I didn’t even know he was missing! He gave me that NES during our last class and asked me to look after it for him, but I didn’t think anything of it.' Italics Likely story, end italics you think to yourself. Italics. Is Jonas simply playing the part of the innocent child? End Italics You’re not buying it. Italics Jonas was seeming pretty chummy with Paul, would he have taken Rob out of the equation so that Paul would become our full time instructor? Was the NES truly a gift, or did Jonas steal it after Rob was kidnapped? End italics.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [], 
  requiredKey:[]
});

let nes = new Item({
  name: "nintendo entertainment system",
  description:"The bookcase magically opens and a distinct smell washes over you.  Italics What is that smell end italics  You know you’ve smelt it before, but you can’t quite put your finger on it. Then all of a sudden it comes to you! How could you ever forget the smell of slowly roasted, spicy, marinated pork mixed with the sweet and tangy scent of pineapple, with a hint of onion and cilantro. It’s El Pastor Tacos! Your stomach grumbles. What could be down this secret staircway? Do you dare [Enter]?",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "You turn on the NES and connect it to a monitor that’s sitting next to it on the shelf. The screen turns on. The classic ‘Press Start’ appears on the screen. You press start, and a strange prompt appears, “Please enter your birthday year to continue the game.” Italics. Odd you don’t remember ever seeing this prompt before. Could it be another clue?end italics.", 
  requiredKey:[]
});

// -------- Taco Gordo Restaurant Items ---------
let nick = new Item({
  name: "Nick",
  description: "The answer may not lie at the bottom of a margarita, but we should at least check’ He looks at his glass, his eyes filled with sadness and falls silent. “ Italics Nick is clearly trying to drown his sorrows.  He knows more than he is letting on... Ss you look on with concern you notice a to-go order with an A written on it. Nick stirs, 'Do me a favor and bring those to Alice for me, yea? They're her favorite, Baja Fish Tacos [tacos], sans dairy, sans cilantro.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});

let matt = new Item({
  name: "Matt",
  description: "Matt jolts awake, disoriented he yells, ‘I didn’t do it! I swear! All I wanted was help on my Zorkington code, I never thought….!’ He looks up from the bar and realizes you are who woke him up, he stops shouting immediately. He whispers, ‘I’ve said too much…’” Italics That sure sounded like a confession to me. You know what they say only children and people when they are drunk tell the truth.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
let margarita = new Item({
  name: "margarita",
  description: "A drink a day, keeps the shrink away, right? What the hell, maybe they're right? You down the margarita and at the bottom of the glass you see a secret message etched into the glass. It reads, ‘What do you call a cold burrito?’ You flip over the cup and find  ‘A BRRRRRRRRR- ito!’......... A dad joke, Rob was clearly here... You notice a burrito on the bar you hadn’t noticed before. The wafting smell of fresh pastor meat makes your mouth water.",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "You take a sniff of the beautifully crafted margarita, tangy and sweet with a touch of smokiness, just how you like it.",
  requiredKey: []
});
let letter = new Item({
  name: "letter",
  description: "You put the letter in your pocket.",
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});

let burrito = new Item({
  name: "burrito",
  description: "You bite into the mouth watering el pastor burrito. But your teeth make contact with plastic. Disturbed you dissect the burrito. There is a letter inside sealed with the Vanarsdall seal, Rob’s family seal. But why would Rob have left a letter in a burrito? You flip it over and check the front. It is addressed to Alice Jean Louise McIlraith. Obstruction of Correspondence is a felony, and you’re no criminal. We have to deliver this letter to Alice. You suddenly remember the locked door in Julia’s kitchen with an A on the door.",
  inventory: [letter],
  moveable: true,
    isLocked: true,
    lockedMessage: "This burrito looks amazing, but I bet it would taste even better.",
  requiredKey: []
});
let tacos = new Item({
  name: "tacos",
  description: [],
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
// ---------------Alice items --------
let alice = new Item({
  name: "Alice",
  description: "Alice finishes her tacos and sighs with relief. 'I'm so glad your here I don't know what happened! Rob ran through here out of nowhere and someone was chasing him. I didn't get a good look at who it was because I was looking for my pie. Wait a second, I remember something! Someone was yelling about fish? Does that make any sense to you?'",
  inventory: ["pick"],
  moveable: false,
    isLocked: true,
    lockedMessage: "'Thank goodness, you're here! Did you get my tacos and pie! I can't think straight without them!'",
  requiredKey: ["tacos", "pie"]
});

let doora = new Item({
  name: "Door A",
  description: "You slip the letter under the door and hear footsteps, 'Alice?', you call out. You hear the lock click and a welcoming voice says 'Come on in...'",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "The wooden door has a beautifully carved A and you wonder what it stands for. There's a mail slot with dancing cats around it. Maybe you should try to open the door?",
  requiredKey: "letter"
});

let pick = new Item({
  name: "guitar pick",
  description: "You look at the guitar pick. Wait a second, you've seen this somewhere before... And all of a sudden you realize, the poster you see daily behind Leif! Alice said someone was yelling about fish, did she mean Phish?",
  inventory: [],
  moveable: true,
    isLocked: true,
    lockedMessage: [],
  requiredKey: []
});

let guitar = new Item({
  name: "guitar",
  description: "You look at the guitar pick. Wait a second, you've seen this somewhere before... And all of a sudden you realize, the poster you see daily behind Leif! Alice said someone was yelling about fish, did she mean Phish?",
  inventory: [],
  moveable: true,
    isLocked: true,
    lockedMessage: "The guitar is beautiful, but you have no pick to play it with.",
  requiredKey: ["pick"]
});

// !-------------------Lookup tables -------------------
let roomLookUp = {
    kitchen: kitchen,
    lair: lair,
// bedroom: doora,
  bedroom: bedroom,
    restaurant: restaurant
};
let CommandLookup = 
 ["move", "enter", "walk", "go", "move to", "go to",
  "pick", "grab", "take", "pickup", "drop", "discard","ask", "speak", "question", "talk", "help", "inventory",
  "unlock", "open","solve",
  "room","view", "look", "see", "read", "examine", "inspect", "study", "check", "play", "turn on", "on", "eat", "drink"]
;
  
let allTargets =
  ["clock", "wardrobe","julia","pie", "elena","key", "nes", "jonas", "kitchen", "bedroom", "restaurant", "lair", "inventory", "room inventory","doora", "player inventory", "matt", "nick", "burrito", "margarita", "tacos","letter", "alice", "guitar", "pick", ];
  
let itemLookUp = {
  clock: clock,
  wardrobe: wardrobe,
  julia: julia,
  elena: elena,
  key: key,
  pie: pie,
  nes: nes,
  jonas: jonas,
  nick: nick,
  matt: matt,
  burrito: burrito,
  margarita: margarita,
  letter: letter,
  alice: alice,
  tacos: tacos,
pick: pick,
  guitar: guitar,
doora:doora
};

let interactionLookUp = {
  // pickUp: ["key", "note", "pick"],
  talkTo: ["julia", "elena", "jonas", "nick", "matt", "alice" ],
  rooms: ["kitchen", "lair", "restaurant", "bedroom", "concert"],
  canEat: ["burrito"],
  canDrink: ["margarita"],
  open: ["wardrobe", "doora", "bedroom"],
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
  view: ["view", "look", "see", "read", "examine", "inspect", "study", "check", "play", "turn on"],
  eat: ["eat", "devour", "consume", "ingest"],
  drink: ["drink", "chug"]
};
let currentLocation = "kitchen";

// ! FUNCTIONS -----------------------------------------------------------------
async function playNes() {
  while (true) {
    let target = await ask(">_");
    let age = 2022 - target
    if (age >= 21) {
      await ask(nes.description);
      currentLocation = "restaurant";
      console.log();
      console.log(restaurant.description)
      return;
    }
      else {
        target = console.log("You are too young to enter this room. Maybe you should tell a white lie.");
      }
    }
  }
    

  
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
    
      console.log(CommandLookup.includes(command));

      console.log(allTargets.includes(target))


      if (command == target || allTargets.includes(target) == false || CommandLookup.includes(command) == false) {
        console.log("That is not a command I understand.");
      }
      //    ! ---------------View Room Inventory--------------------
      else if (
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
      // ! Correcting for if player just says view inventory need them to specify. 
      else if (commandWords.view.includes(command) && target == "inventory") {
        console.log("Please specify if you would like to view the room inventory or the player inventory.");
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
        }
        // special message for margarita so player has to drink it in restaurant
      
        else if (restaurant.inventory.includes("margarita") && target == "margarita" && currentLocation == "restaurant") {
          console.log("'Sorry, I can't let you take alcohol to go', a bartender warns from afar.");
        }
        else if (
          roomInventory.includes(target) &&
          currentItem.moveable == true
        ) {
          player.addInventory(target);
          console.log("You picked up the " + target + ".");
          roomLookUp[currentLocation].removeInventory(target);
        }
        else if ((clock).inventory.includes(target) && (roomLookUp[currentLocation].name === "Julia's kitchen")) {
          console.log("You have picked up the H Key!");
          player.addInventory(target);
          clock.inventory.pop("key")
          console.log(clock.inventory)
        }
        // TODO that item isn't in this room if we want a different message
        // else if (!(roomLookUp[currentLocation].includes(target))){
        //   console.log("That item isn't in this room.")
        //   
        else {
          console.log("You can't take that. Stop messing around Rob needs us!");
        }
      }
      
      //   ! Inspect an item in the room ----------------------- 
          
      else if (commandWords.view.includes(command)) {
        if (target == "nes" && currentLocation == "lair") {
          console.log(nes.lockedMessage);
          await playNes()
        }
        // Didn't want player to continue to see key in clock if it is removed
        else if (target == "clock" && currentLocation == "kitchen" && (clock.inventory.length==0)) {
          console.log("The clock looks odd with no hour hand.");
        }
        else if (itemLookUp[target].isLocked === false && (roomLookUp[currentLocation].inventory.includes(target))) {
          console.log(itemLookUp[target].description);
        }

        else if (itemLookUp[target].isLocked === true && (roomLookUp[currentLocation].inventory.includes(target))) {
          console.log(itemLookUp[target].lockedMessage);
        }
        else {
          console.log("That item is not here.")
        }
          
      }

      //   ! OPEN Item 
      //   Have key 
      else if (commandWords.unlock.includes(command)) {
        if (roomLookUp[currentLocation].inventory.includes(target)) {
          // need a special case for alice's room in which opening doora also opens her room. 
          if (target = "doora" && playerInventory.includes("letter")) {
            console.log(doora.description);
            player.removeInventory("letter");
            doora.isLocked == false
            bedroom.isLocked == false;
            bedroom.addInventory("letter");
          }
          else if (playerInventory.includes(itemLookUp[target].requiredKey)) {
            console.log(itemLookUp[target].description);
            itemLookUp[target].isLocked = false;
          }
          else if (interactionLookUp.open.includes(target)) {
            console.log("You don't have the right key to open this.")
          }
        
        }
      
      else {
        console.log("You can't open that. No time for games! ROB NEEDS YOU!");
          
      }
    }
    
  
        
      //   ! Speak to ------------
    else if (commandWords.talk.includes(command)) {
        // woth nick we are going to push a new inventory item. can only get this item if you talk to nick.
        if (target == "nick" && currentLocation == "restaurant") {
          console.log(nick.description);
         roomLookUp[currentLocation].addInventory("tacos");
        }
        else if (/*interactionLookUp.talkTo.includes(target) && */roomLookUp[currentLocation].people.includes(target) && itemLookUp[target].isLocked === false) {
          console.log(itemLookUp[target].description);
        }
          // you have the key for the person then you should get their description. 
        else if (/* interactionLookUp.talkTo.includes(target) && */ roomLookUp[currentLocation].people.includes(target) && playerInventory.includes(itemLookUp[target].requiredKey)) {
          itemLookUp[target].description;
          itemLookUp[target].isLocked == false;
          playerInventory.removeInventory[requiredKey];
          
          }
          
        else if(/*interactionLookUp.talkTo.includes(target) && */roomLookUp[currentLocation].people.includes(target) && itemLookUp[target].isLocked === true){
          console.log(itemLookUp[target].lockedMessage);
        }
        else { console.log("You cannot speak to that person.")}
      }

      // ! MOVE Rooms -------------
      else if (commandWords.movement.includes(command)) {
        let currentPossibleRooms = roomLookUp[currentLocation].possibleRooms;
        if (currentPossibleRooms.includes(target)) {
          if (roomLookUp[target].isRoomLocked == false) {
            
            currentLocation = target;
            console.log(roomLookUp[currentLocation].description);
          }
            else if(playerInventory.includes(roomLookUp[target].requiredKey)) {
          // prints the new room description.
          console.log(roomLookUp[target].description);
            roomLookUp[target].isLocked = false;
            currentLocation = target;
            // You need to set the isDoorLocked = true
          } else {
            console.log("This door is locked.");
          }
        } else {
          // NOT A ROOM
          console.log("You cannot get to that room from here.");
        }
      }
  
      // !----------- Eat------
      else if (commandWords.eat.includes(command)) {
        if (interactionLookUp.canEat.includes(target) && roomLookUp[currentLocation].inventory.includes(target)) {
          console.log(itemLookUp[target].description);
          console.log();
          // right now only eating burrito so can add letter. If eat something need to change this.
          roomLookUp[currentLocation].removeInventory(target);
          player.addInventory("letter");
          console.log(itemLookUp["letter"].description);
        }
        // If player picked up but later figure out they need to eat it.
        else if (playerInventory.includes(target)) {
          playerInventory.removeInventory(target);
          player.addInventory("letter");
          console.log(itemLookUp["letter"].description);
          
        }
        else if (target == "pie" && currentLocation == "kitchen" || target == "tacos" && currentLocation == "restaurant"){
          console.log("You can't eat that! It is for Alice!");
        }
        else {
          console.log("This is no time for shenanigans! You can't eat that!");
        }
        
      }
    
// ! --------Drink-------------
        // Same as eat just don't want people to be able to say eat margarita. Add burrito to room inventory after you drink marg.
        
        else if (commandWords.drink.includes(command)) {
        if ((interactionLookUp.canDrink.includes(target) && roomLookUp[currentLocation].inventory.includes(target)) || playerInventory.includes(target)) { 
          console.log(itemLookUp[target].description);
            roomLookUp[currentLocation].removeInventory(target);
        }
        else if (interactionLookUp.canDrink.includes(target))
        { console.log("You already drank that! Did you forget already? Maybe that drink wasn't the best idea."); }
        else {
          console.log("This is no time for shenanigans! You can't drink that!");
        }
        
      }
   
    }
  }
      

