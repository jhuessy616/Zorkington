// readlines
const { Console } = require("console");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);
// terminal colors
let green = "\033[92m";
let white = "\033[0;39m";
let magenta = '\033[1;95m';
let blue = '\033[34m';
// promises 
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


// ! -------------------------- Classes ---------------------------------------
// ------Room constructor-------------------------
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
//  ------ add inventory to room --------------------------
  addInventory(inventoryItem) {
    this.inventory.push(inventoryItem);
    // return this.inventory;
  }
//  -------------- remove inventory from room--------------
  removeInventory(itemToBeRemoved) {
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory !== itemToBeRemoved
    );
  }
  // ----------------- view room inventory------------------
  viewRoomInventory() {
    return console.log(
      `This room has the following items: ` + this.inventory.join(", ")
    );
  }
}
// ---------------------------- item constuctor--------------------------
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
// ---------------------player constructor so we can view player inventory--------------
class Player {
  constructor(inventory) {
    this.inventory = inventory;
  }
  // ------------ add player inventory---------------------------
  addInventory(inventoryItem) {
    this.inventory.push(inventoryItem);
    // return this.inventory;
  }
  // --------- remove player inventory--------------------------
  removeInventory(itemToBeRemoved) {
    this.inventory = this.inventory.filter(
      (currentInventory) => currentInventory !== itemToBeRemoved
    );
  
  }
// ------------- check if player has info-------------------------------
  doesPlayerHaveCorrectItem(item) {
    return this.inventory.includes(item);
  }
}
// ! --------------------------ROOMS------------------------------------
// ----------------- Julia's Kitchen, Known as Kitchen ------------------------------------------
let kitchen = new Room({
  name: "Julia's Kitchen",
  inventory: ["clock", "wardrobe", "pie", "doora"],
  description:
    "You are at Julia’s grandmother’s also known as Homeplace, a sign in the kitchen says ‘There’s no place like Homeplace’ and you can’t decide if it’s sweet or menacing. What kind of secrets do these walls hold? Elena has come for a potluck and the table is flipped and food is all over the floor, but a freshly baked pie sits unharmed on top of the oven.\n You wonder, would Elena have kidnapped Rob to take over his job, is this an attempt to move up the corporate ladder by taking out her direct superior? Julia is in the corner looking distraught. Julia, who is always talking… has it all been a cover to hide the truth? A large grandfather clock chimes 10 oclock  and you notice a wardrobe large enough to store a body in the corner of the room. There's also a door to Jonas’s lair and a door marked with a large A [doorA].",
  people: ["julia", "elena"],
    requiredKey: false,
  isRoomLocked: false,
  possibleRooms: ["lair", "bedroom"],
});

// ------------------------------------ Jonas's Lair -----------------------------------------
let lair = new Room({
  name: "Jonas' Lair",
  inventory: ["nes"],
  description: "You are now in Jonas’ Lair. We never get to see much of his space from his camera view, and you wonder, is it because he’s hiding something? Rob is always making jokes about Jonas’ age and pointing out how young he is. Did it push Jonas to the edge, was he sick of being reminded daily that he can’t drink and he’s barely an adult? Jonas sits at his workspace, his large monitors glowing as he watches 'JavaScript in 100 seconds.' You notice a Nintendo Entertainment System (NES) sitting on a bookshelf. That’s odd, Jonas wasn’t even alive when NES was released, how did he ever get his hands on one? You see the door that you just came through from Julia’s kitchen, but don’t see any other doors out of here. Could this be a dead end?",  
  people: ["jonas"],
    requiredKey: false,
  isRoomLocked: false,
  possibleRooms: ["kitchen"],
});
// --------------------------------Restaurant Taco Gordo------------------------------------
let restaurant = new Room({
  name: "Taco Gordo restaurant",
  inventory: ["margarita", "burrito"],
  description: " Bienvenid@ a Taco Gordo! Your favorite local taqueria in downtown Burlington, Vermont! Your mouth waters from the scent of fresh tortillas, el pastor tacos, and burritos. You notice two familiar figures slumped over at the bar, it’s Nick and Matt, but they’re not looking so good. Nick looks dazed and confused, like he doesn’t know where he is, and he doesn’t appear to have gotten any sleep. He’s also certainly not dressed for the weather. He’s wearing gold short shorts, and a ripped Burlington Code Academy Tshirt. Where did Nick get that Tshirt? You wonder, not even beloved TA Ben Villa has been able to snag one, and why is it ripped? Matt is in complete disarray, his long hair is all over the place and he appears to be passed out at the bar. Are they attempting to drink away their guilt? These are all signs of guilty men. There’s only the staircase back the way you came to Jonas' lair. You notice a full margarita on the bar next to Matt.",  
  people: ["nick", "matt"],
    requiredKey: [],
  isRoomLocked: false,
  possibleRooms: ["lair"],
});
// ------------------------------------- ALice's Room AKA Bedroom------------------------
let bedroom = new Room({
  name: "Alice's Bedroom",
  inventory: ["guitar"],
  description: "The door with the large A swings open. You go inside. Inside Alice sits on her bed with her guitar sitting nearby. She hums a soft melody that sounds familiar. Is her calmness a facade?, you think to yourself. It's always the quiet ones, always the ones you'd least expect... ",
  people: ["alice"],
  requiredKey: [],
  isRoomLocked: true,
  possibleRooms: ["kitchen"],
});
// ------------------------------------PHISH CONCERT----------------------------------------
let msg = new Room({
  name: "Madison Square Garden [MSG]",
  inventory: [],
  description: "You find yourself at Madison Square Garden In New York City and there seems to be a lot of Vermonters here and it smells a bit like skunk if you catch my drift... What could bring so many Vermonters to the big city? And then it hits you! The 4 day Phish festival. All of sudden you spot Leif in a crowd of tie-dye clad hippes and you remember that the last time you saw Leif he was pretty upset because Rob was planning to take away one of the cohort's vacation days and that would mean Leif would miss a day of the Phish festival. Did he take Rob out of the equation so he could come to all 4 days? He seems extremely pleased to be here.",  
  people: ["leif"],
    requiredKey: [],
  isRoomLocked: false,
  possibleRooms: ["bedroom", "stage"],
});
// --------------------------------------Stage------------------------------------------
let stage = new Room({
  name: "Phish Stage",
  inventory: [],
  description: "You try to be as inconspicuous as possible as you walk up the steps to the stage.You defintely aren't allowed to be here. On your way up you find a note. It reads, 'You fell down? Why don't GIT up? :)' a dad joke, and not any old dad joke, a Rob dad joke. But what was Rob doing backstage? You make your way to the stage and spot Phish's lead guitarist Trey Anastasio, but what did Trey have to do with Rob's disappearance and why was Rob here?",  
  people: ["trey"],
    requiredKey: [],
  isRoomLocked: false,
  possibleRooms: ["msg"],
});
  
// ! ----------------------------ALL ITEMS= People and Things ----------------------------------------

//  *---------------------ITEMS  In Julia's kitchen ----------------------------------------
// ----------------------------Wardrobe-------------------------------------
let wardrobe = new Item({
  name: "wardrobe",
  description:
    "The wardrobe opens, the scent of pine and fresh air wafts over you. You are now standing inside the wardrobe. Have you found a secret door to Narnia? You wonder. You are absolutely giddy with excitement. You feel around in the dark, you find something and you pick it up.  You use the flashlight of your phone to illuminate the object. It’s a, it’s a, IT’s A royal pine car air freshener. Well that explains the smell, you throw away the air freshener, and you quickly flash your flashlight all around you, just knowing this must be a secret portal. Nope, you’re just standing in an empty dark wardrobe looking like an idiot... You exit the wardrobe.",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "The wardrobe is locked, but an odd H is etched into the wood just above the keyhole.",
  requiredKey: "key",
});

// ---------------------------------Key item--------------------------------------
let key = new Item({
  name: "key",
  description: "H key",
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
// -----------------------------Clock Item-------------------------------------
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
// -------------------------------Pie Item----------------------------
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
// -------------------------Julia (person)---------------------------
let julia = new Item({
  name: "Julia",
  description:
    "'I don’t know what happened!  Rob was here and I stepped out to buy a keg of Heady Topper because after learning about promises with Paul I knew we were all going to need a lot more to drink. When I came back, Rob was gone and the house was in disarray'. \n You think to yourself, she’s not wrong, I still feel like I’m lost in a rabbit hole after this week’s lessons. I could really go for a drink. You stop yourself. Eyes on the prize, no time for drinking we have to find Rob.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: [], 
});
// -------------------------Elena (person)-----------------------------
let elena = new Item({
  name: "Elena",
  description:
    "“Rob was having a great time. I swear I don’t know what happened! He was telling me one of his famous dad jokes and then out of nowhere he stood up suddenly, causing the table to flip over and ran out of the room. I was so preoccupied with the flipping table that I didn’t see which way he went.” \nLikely story you think... We all know kidnappers are almost always those who are closest to the victim. Elena is the last one to have seen Rob and is now our number one suspect.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [], 
  requiredKey:[]
});

// *----------------------Jonas' Lair Items ---------------------------------------------------
// ----------------Jonas (person)-----------------------------------------------
let jonas = new Item({
  name: "Jonas",
  description:"'What’s going on?', Jonas asks. You inform him of Rob’s kidnapping. He appears shocked. 'What! Who would do that? I haven’t seen Rob since our last class. I didn’t even know he was missing! He gave me that NES during our last class and asked me to look after it for him, but I didn’t think anything of it.'\nLikely story, you think to yourself. Is Jonas simply playing the part of the innocent child? You’re not buying it. Jonas was seeming pretty chummy with Paul, would he have taken Rob out of the equation so that Paul would become our full time instructor? Was the NES truly a gift, or did Jonas steal it after Rob was kidnapped?",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [], 
  requiredKey:[]
});
// -------------------------Nintendo Entertainment System (NES) ------------------------
let nes = new Item({
  name: "Nintendo Entertainment System",
  description:"The bookcase magically opens and a distinct smell washes over you. What is that smell? You know you’ve smelt it before, but you can’t quite put your finger on it. Then all of a sudden it comes to you! How could you ever forget the smell of slowly roasted, spicy, marinated pork mixed with the sweet and tangy scent of pineapple, with a hint of onion and cilantro. It’s El Pastor Tacos! Your stomach grumbles. What could be down this secret stairway? Do you dare [Enter]?",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "You turn on the NES and connect it to a monitor that’s sitting next to it on the shelf. The screen turns on. The classic ‘Press Start’ appears on the screen. You press start, and a strange prompt appears, “Please enter your birthday year to continue the game.” Odd you don’t remember ever seeing this prompt before. Could it be another clue?", 
  requiredKey:[]
});

// *--------------------------- Taco Gordo Restaurant Items ----------------------------
// ------------------------Nick (Person)-----------------------------------
let nick = new Item({
  name: "Nick",
  description: "'The answer may not lie at the bottom of a margarita, but we should at least check’ He looks at his glass, his eyes filled with sadness and falls silent. Nick is clearly trying to drown his sorrows.  He knows more than he is letting on... As you look on with concern you notice a to-go order with an A written on it. Nick stirs, 'Do me a favor and bring those to Alice, yea? They're her favorite, Baja Fish Tacos [tacos], sans dairy, sans cilantro.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
// ---------------------------Matt (person)----------------------------------
let matt = new Item({
  name: "Matt",
  description: "Matt jolts awake, disoriented he yells, ‘I didn’t do it! I swear! All I wanted was help on my Zorkington code, I never thought….!’ He looks up from the bar and realizes you are who woke him up, he stops shouting immediately. He whispers, ‘I’ve said too much…’ That sure sounds like a confession to you. You know what they say, only children and people when they are drunk tell the truth.",
  inventory: [],
  moveable: false,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
// ------------------------------ Margarita -------------------------------------
let margarita = new Item({
  name: "margarita",
  description: "A drink a day, keeps the shrink away, right? What the hell, maybe they're right? You down the margarita and at the bottom of the glass you see a secret message etched into the glass. It reads, ‘What do you call a cold burrito?’ You flip over the cup and find  ‘A BRRRRRRRRR- ito!’......... A dad joke, Rob was clearly here... You notice a burrito on the bar you hadn’t noticed before. The wafting smell of fresh pastor meat makes your mouth water.",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "You take a sniff of the beautifully crafted margarita, tangy and sweet with a touch of smokiness, just how you like it.",
  requiredKey: []
});
// ----------------------------Letter---------------------------------------
let letter = new Item({
  name: "letter",
  description: "A letter with the Vanarsdall family crest adressed to Alice.",
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: "You put the letter in your pocket.",
  requiredKey: []
});
// ---------------------------Burrito-------------------------------------
let burrito = new Item({
  name: "burrito",
  description: "You bite into the mouth watering el pastor burrito. But your teeth make contact with plastic. Disturbed you dissect the burrito. There is a letter inside sealed with the Vanarsdall seal, Rob’s family seal. But why would Rob have left a letter in a burrito? You flip it over and check the front. It is addressed to Alice Jean Louise McIlraith. Obstruction of Correspondence is a felony, and you’re no criminal. We have to deliver this letter to Alice. You suddenly remember the locked door in Julia’s kitchen with an A on the door.",
  inventory: [letter],
  moveable: true,
    isLocked: true,
    lockedMessage: "This burrito looks amazing, but I bet it would taste even better.",
  requiredKey: []
});
// -------------------------------Tacos--------------------------------------
let tacos = new Item({
  name: "tacos",
  description: "Alice's favorite tacos. Baja Fish with mango salsa and sticky rice, no dairy, no cilantro. She has the gene that makes cilantro taste like soap.",
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
//*---------------Alice 's Bedroom Items --------------------------------------------
// ------------------------Alice (person)----------------------------
let alice = new Item({
  name: "Alice",
  description: "Alice finishes her tacos and a piece of her pie and sighs with relief. 'I'm so glad you're here! I don't know what happened! Rob ran through here out of nowhere and someone was chasing him. I didn't get a good look at who it was because I was looking for my pie. Wait a second, I remember something! Someone was yelling about fish? Does that make any sense to you?'",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "'Thank goodness, you're here! Did you find my tacos and pie? I can't think straight without them!'",
  requiredKey: ["tacos", "pie"]
});
// ------------------------- Door A (doora)-----------------------------------
let doora = new Item({
  name: "Door A",
  description: "You slip the letter under the [bedroom] door and hear footsteps, 'Alice?', you call out. You hear the lock click and a welcoming voice says 'Come on in...'",
  inventory: [],
  moveable: false,
    isLocked: true,
    lockedMessage: "The wooden door has a beautifully carved A and you wonder what it stands for. A note on the door reads 'I am looking for a lost letter. Please come in if you find it. Maybe you should try to open doorA?",
  requiredKey: "letter"
});
// --------------------------Pick--------------------------------------
let pick = new Item({
  name: "guitar pick",
  description: "You look at the guitar pick. Wait a second, you've seen this somewhere before... And all of a sudden you realize, the poster you see daily behind Leif! Could this be another clue...",
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
// ------------------------Guitar-------------------------------------
let guitar = new Item({
  name: "guitar",
  description: "You strum on the guitar and suddenly you realize the song Alice was humming was Run Like An Antelope by Phish, how could you ever forget Vermont's famous band!? When Alice said someone was yelling about Fish, did she mean PHISH? You play Run Like An Antelope and suddenly a secret passage to Madison Square Garden [MSG] opens under Alice's bed! As you prepare to leave, Alice says, 'take my guitar, you never know, you might need it.'",
  inventory: [],
  moveable: true,
    isLocked: true,
    lockedMessage: "The guitar is beautiful, but you have no pick to play it with.",
  requiredKey: "pick"
});
// *--------------Madison Square Garden (msg) Items--------------------------------------
// ----------------------Leif (person)----------------------------
let leif = new Item({
  name: "Leif",
  description: "Leif looks lovingly toward the clouds. 'Whoaaaaa! Where did you come from?! I didn't realize you were such a Phish fan, but sooooo excited you're here', he trails off still smiling at the clouds. 'Leif, you shake him, I'm looking for Rob. And my investigation has brought me to you! Did you do something to him?' 'No way dudeeee, the only thing I did was share my loveeeeee and light.' While rolling your eyes you spot a well-hidden entrance up to the stage." ,
  inventory: [],
  moveable: true,
    isLocked: false,
    lockedMessage: [],
  requiredKey: []
});
// -------------------------Trey Anastasio (person)-------------------------
let trey = new Item({
  name: "Trey Anastasio",
  description: "You hand Trey, Alice's guitar. 'I have a surprise for you,' Trey says. You're not a big fan of surprises, especially not in the middle of a kidnapping investigation. Your facial expression must have given you away, because Trey comments, 'Trust me, this is going to blow you away.' He brings you just off stage where you'll have an upclose view of the band. You start to protest, but he walks away, shouting over his shoulder, 'When the music starts I need you to start dancing!' Moments later the band enters the stage and the opening notes of Divided Sky ring out.",
  inventory: [],
  moveable: true,
    isLocked: true,
    lockedMessage: "'Who are you and what are you doing back here? You can't be back here.' You respond, 'I'm looking for my beloved instructor, Rob. Trey, I need to know, Vermonter to Vermonter, do you know who took him, did you help them? All roads have led here.' 'Whoa, whoa there young buck, I had nothing to do with any kidnapping, but maybe we can help each other. We're on in two minutes and I'm short an acoustic guitar. Can you help me find an acoustic guitar?' You find yourself thinking about Alice's guitar!",
  requiredKey: []
});
// !---------------------------------Lookup tables -------------------------------------------------------
// -----------------Room LookUp Table----------------------------------------
let roomLookUp = {
    kitchen: kitchen,
    lair: lair,
  bedroom: bedroom,
  restaurant: restaurant,
  msg: msg,
    stage: stage
};
// -----------------------All commands so we can have a general I can't do that response if not a known command-----------------
let CommandLookup = 
 ["move", "enter", "walk", "go", "move to", "go to",
  "pick", "grab", "take", "pickup", "drop", "discard","ask", "speak", "question", "talk", "help", "inventory",
  "unlock", "open","solve",
  "room","view", "look", "see", "read", "examine", "inspect", "study", "check", "play", "turn on", "on", "eat", "drink", "give", "feed", "bring to", "pass","present"]
;
  // --------------- All Target Lookup, for general that's not a commandI understand ------------------------------
let allTargets =
  ["clock", "wardrobe","julia","pie", "elena","key", "nes", "jonas", "kitchen", "bedroom", "restaurant", "lair", "inventory", "room inventory","doora", "player inventory", "matt", "nick", "burrito", "margarita", "tacos","letter", "alice", "guitar", "pick","msg", "stage", "leif", "rob", "trey", "status", "location" ];
  // ------------------------------Item Lookup--------------------------------------------------
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
  doora: doora,
  leif: leif, 
trey:trey,
};
// ------------------------------Possible Interaction lookup -------------------------------
let interactionLookUp = {
  // pickUp: ["key", "note", "pick"],
  talkTo: ["julia", "elena", "jonas", "nick", "matt", "alice", "trey",],
  rooms: ["kitchen", "lair", "restaurant", "bedroom", "concert", "stage"],
  canEat: ["burrito"],
  canDrink: ["margarita"],
  open: ["wardrobe", "doora", "bedroom"],
  give: ["alice", "trey"]
};
// -----------------------Command words to check multiple ways of saying something ----------------
let commandWords = {
  movement: ["move", "enter", "walk", "go", "move to", "go to"],
  pickup: ["pick", "grab", "take", "pickup", "get"],
  drop: ["drop", "discard"],
  talk: ["ask", "speak", "question", "talk"],
  help: ["help"],
  inventory: ["inventory"],
  unlock: ["unlock", "open",],
  room: ["room"],
  view: ["view", "look", "see", "read", "examine", "inspect", "study", "check", "play", "turn on"],
  eat: ["eat", "devour", "consume", "ingest"],
  drink: ["drink", "chug"],
  give: ["bring to", "give", "feed","pass","present",]
};

// ! -----------------------------------FUNCTIONS ---------------------------------------------------------------------
/* Playing the NES In Jonas' lair. You need to enter a specific input to be granted access to the next room. 
* Need to be 21 or older to enter. Since it's almost the end of the year simply using 2022 as the benchmark. 
* Will continue in a loop until you put a birth year that would make you over 21. 
*Prompts younger users to tell a white lie. 
 */
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
  // Special Play guitar function to push Madison Square Garden to possible rooms. Can only move to this room after you've played the guitar.
function playGuitar() {
      bedroom.possibleRooms.push("msg");
}

    // !--------------------------------------------First Room Setup---------------------------------------------------------
// -------------player created with no inventory to start the game and the first room is the kitchen ----------
let player = new Player([]);
let currentLocation = "kitchen";

  // ! ----------------------------------------------START OF GAME -----------------------------------------------------------------
//   Async Function and opening messages and images as well as breaking down the users answer/input into a command and a target
  start();
async function start() {
  console.log( green +`                                  {} {}
                          !  !  ! II II !  !  !
                       !  I__I__I_II II_I__I__I  !
                       I_/|__|__|_|| ||_|__|__|\\_I
                    ! /|_/|  |  | || || |  |  |\\_|\\ !
        .--.        I//|  |  |  | || || |  |  |  |\\\\I        .--.
       /-   \\    ! /|/ |  |  |  | || || |  |  |  | \\|\\ !    /=   \\
       \\=__ /    I//|  |  |  |  | || || |  |  |  |  |\\\\I    \\-__ /
        }  {  ! /|/ |  |  |  |  | || || |  |  |  |  | \\|\\ !  }  {
       {____} I//|  |  |  |  |  | || || |  |  |  |  |  |\\\\I {____}
 _!__!__|= |=/|/ |  |  |  |  |  | || || |  |  |  |  |  | \\|\\=|  |__!__!_
 _I__I__|  ||/|__|__|__|__|__|__|_|| ||_|__|__|__|__|__|__|\\||- |__I__I_
 -|--|--|- ||-|--|--|--|--|--|--|-|| ||-|--|--|--|--|--|--|-||= |--|--|-
  |  |  |  || |  |  |  |  |  |  | || || |  |  |  |  |  |  | ||  |  |  |
  |  |  |= || |  |  |  |  |  |  | || || |  |  |  |  |  |  | ||= |  |  |
  |  |  |- || |  |  |  |  |  |  | || || |  |  |  |  |  |  | ||= |  |  |
  |  |  |- || |  |  |  |  |  |  | || || |  |  |  |  |  |  | ||- |  |  |
 _|__|__|  ||_|__|__|__|__|__|__|_|| ||_|__|__|__|__|__|__|_||  |__|__|_
 -|--|--|= ||-|--|--|--|--|--|--|-|| ||-|--|--|--|--|--|--|-||- |--|--|-
  jgs|  |- || |  |  |  |  |  |  | || || |  |  |  |  |  |  | ||= |  |  |
 ~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^~~~~~~~~~~~` + magenta)
  // ---------------------Description of the puzzle the user must solve ---------------------------------------------------
  await ask(
    "You find yourself in great distress, your beloved instructor, Rob Vanarsdall, has been kidnapped! (* GASP*) Your classmates are beside themselves, but is it a coverup? Did one of them kidnap Rob to avoid completing their Zorkington project or are they truly innocent? It will be up to you to discover the truth. You are outside the Upright Mansion, where each door is a portal to another student's location. It is up to you to figure out who has kidnapped Rob and to return him to his beloved students. Press any key to enter." + white
  );
// Empty space and first room you enter. When you play the game it will be the kitchen. 
  console.log();
  console.log(roomLookUp[currentLocation].description);

  // * ----------------------------------------------Input/Answer Breakdown------------------------------------------
//  Game will continue unless player types exit
 /*  Breaking down the users answer/input.
 * the first word will be the command 
 *the last word will be the target
 *except in special cases where there will be a two word answer such as room inventory and player inventory */
  while (true) {
    let answer = (await ask(">_")).toLowerCase().trim().split(" ");
    let command = answer[0];
    let target = answer[answer.length - 1];
    let twoWordTarget = answer
      .slice(answer.length - 2, answer.length)
      .join(" ");
  
//  ! ------------------------------------------Commands-----------------------------------------------------
    
  // ! -------Quit game ---------------------------------------
    if (command == "quit") {
      console.log("You failed to solve the kidnapping of your beloved instructor Rob Vanarsdall and the kidnappers remain free! You have failed Rob and your classmates!")
      process.exit();
    }
    // ! -----------Special Dance Command used at the end of the game to solve the last piece of the puzzle --------------------
    // ! Game will exit at the end of this command ------------------
    else if (command == "dance")
    if( currentLocation == "stage" && trey.isLocked == false)
    {
      await ask("You start to dance and as Divided Sky's last notes fade into the distance, a familiar silhouette comes onto stage. You can hardely believe your eyes! Trey steps up to the microphone. 'Everyone give a warm welcome to our newest guitarist, Robert Vanarsdall!' The crowd errupts in screams and applause!' [Enter]");
      
    // Spacing between the text
      console.log()
      stage.people.push("rob");
       
      await ask(green + "Rob grabs a microphone in his hand and shouts 'I'VE QUIT MY JOB AND RUN AWAY TO BE A ROCKSTAR!' The crowd errupts in screams once more. He begins belting out the lyrics of Bathtub Gin, and the rest of Phish joins him. Well, I guess Rob wasn't kidnapped after all... \nPress any key to end the game.");
      
// ---------------------------------------Stage image ----------------------------------
      console.log(blue+ `|--------------------------------------------------------------|
 |    ~-_____o___o____o____o_____o_____o____o____o____o_____-~  |
 |     ||~-______________________________________________-~||   |
 |     || |  __________________________________________  | ||   |
 |     || | |:|:|:|:|:|:|:|:|:|:||||:|:|:|:|:|:|:|:|:|:| | ||   |
 |     || | |:|:|:|:|:|:|:|:|:|:||||:|:|:|:|:|:|:|:|:|:| | ||   |
 |     || | |:|:|:|:|:|:|:|:|:|:||||:|:|:|:|:|:|:|:|:|:| | ||   |
 |     || | |:|:|:|:|:|:|:|:|:|:|/\\|:|:|:|:|:|:|:|:|:|:| | ||   |
 |     || |_|:|:|:|:|:|:|:|:|:|:/  \\:|:|:|:|:|:|:|:|:|:|_| ||   |
 |     |-~ . . . . . . . . . . . . . . . . . . . . . . .  ~-|   |
 |    ~   . . . . . . . . . . . . . . . . . . . . . . . .    ~-_|
 |--------------------------------------------------------------|`
      )
    
      process.exit();

    }
      else{ console.log("We all love to dance, but this is not the time or place! We need to find Rob! ")}

    // !--------------------------------------Help-----------------------------------------------------------
    else if (command == "help" || target =="hint" || target=="help") {
      console.log("Here are some helpful hints: -You can [view] location which will show everything and everyone in a room -You can [talk] to people in the room -You can [move] from one room to another  -You can [inspect] items -You can [pickup] moveable items -You can [unlock] items and [doors] -You can [drink] beverages -You can [eat] food -You can [give] certain people things -You can [view] player inventory -You can [view] the room inventory -You can [drop] items you've picked up -You can even [dance] in the right situation!");
    }
      
// !--------------------------If single word command given and it's not a previous defined one---------------
    else if (command == target)
      {console.log("Please specify the command or the target. command+target")}
    //    ! ---------------View Room Inventory--------------------
    //  Targeting the words room and inventory and showing the room inventory 
    else if (
      commandWords.view.includes(command) &&
      (twoWordTarget === "room inventory")
    ) {
      roomLookUp[currentLocation].viewRoomInventory();
    }

    //     //! View Player Inventory-------------------------
      // Targeting the words player and inventory and showing the player inventory 
    else if (
      commandWords.view.includes(command) &&
      twoWordTarget == "player inventory"
    ) {
      console.log(
        "You have the following inventory:" + player.inventory.join(", ")
      );
    }
    // ! Correcting for if player just says view inventory need them to specify. 
    else if (commandWords.view.includes(command) && target == "inventory") {
      console.log("Please specify if you would like to view the room inventory or the player inventory.");
    }
        
    //   ! -------------------------- Pickup Item ----------------------------------------
    else if (commandWords.pickup.includes(command)) {
      let roomInventory = roomLookUp[currentLocation].inventory;
      let currentItem = itemLookUp[target];

      // If already in players inventory
      if (player.inventory.includes(target)) {
        console.log("You already have the " + target + " in your inventory");
        // console.log(player.inventory.join(", "));
      }
      // special message for margarita so player has to drink it in restaurant
      else if (restaurant.inventory.includes("margarita") && target == "margarita" && currentLocation == "restaurant") {
        console.log("'Sorry, I can't let you take alcohol to go', a bartender warns from afar.");
      }
        //  Checks that item is in the room and the item can be picked up 
      else if (
        roomInventory.includes(target) &&
        currentItem.moveable == true
      ) {
        player.addInventory(target);
        console.log("You picked up the " + target + ".");
        roomLookUp[currentLocation].removeInventory(target);
      }
        // if the key is still in the clock and you are in the correct room you can take the key and it removes it from the clock inventory
      else if ((clock).inventory.includes(target) && (roomLookUp[currentLocation].name === "Julia's Kitchen")) {
        console.log("You have picked up the H Key!");
        player.addInventory(target);
        clock.inventory.pop("key")
      }
        // else you can't pickup that item 
      else {
        console.log("You can't take that. Stop messing around Rob needs us!");
      }
    }
      
    //   ! ----------------------------------Inspect an item in the room or inplayer inventory  --------------------------------------------- 
      // ! Can also View location or status and will get info about current room.
      // Play Nes brings us to a function where the player needs to put in a correct sequence to enter
      // They must be in the lair 
      // First it gives us a locked message to prompt the user what they need to do
    else if (commandWords.view.includes(command)) {
      if (target == "nes" && currentLocation == "lair") {
        console.log(nes.lockedMessage);
        await playNes();
      }
     
      // Didn't want player to continue to see key in clock if it is removed
      // If clock inventory is empty it will have a different description
      else if (target == "clock" && currentLocation == "kitchen" && (clock.inventory.length == 0)) {
        console.log("The clock looks odd with no hour hand.");
      }
      // gives a full status update of locationthat includes people, inventory and possible rooms.
      else if (target == "location" || target == "status") {
        console.log("You are currently in " + roomLookUp[currentLocation].name + " the following people are here: ["+ roomLookUp[currentLocation].people + "] the room inventory is: [" + roomLookUp[currentLocation].inventory + "] your inventory is: [" + player.inventory + "] the possible room(s) you can move to is/are: [" + roomLookUp[currentLocation].possibleRooms +"].")
        }
        // Item is not locked and the room has the item or the player has the item in their inventory 
      else if (((roomLookUp[currentLocation].inventory.includes(target)) || player.inventory.includes(target)) && itemLookUp[target].isLocked == false) {
        console.log(itemLookUp[target].description);
      }
        // Item is locked and in the room or in the player inventory a locked message will print 
      else if ( ((roomLookUp[currentLocation].inventory.includes(target)) || player.inventory.includes(target)) && itemLookUp[target].isLocked === true) {
        console.log(itemLookUp[target].lockedMessage);
      }
        // else that item isn't here
       else {
        console.log("That item is not here or it is not something you can inspect! Time is against you! You must find the kidnapper!")
      }
      // if the guitar will prompt a special function that pushes a new location 
         if (target == "guitar"  && currentLocation == "bedroom" && player.inventory.includes("pick")) {
        playGuitar();
      }
     
          
    }
      // !----------------- Open Bedroom--------------
      // bedroom is locked so people might try command open bedroom, which doesn't work because unlock is for items like doors
      else if (commandWords.unlock.includes(command) && target == "bedroom" && currentLocation == "kitchen" && bedroom.isRoomLocked == true)
        {console.log("You must unlock door A [doora] to [enter] the bedroom.")}

    //   ! -------------------------------------------OPEN Item ---------------------------------------------------------
    else if (commandWords.unlock.includes(command)) {
      // First checking that the item is in the room 
      if (roomLookUp[currentLocation].inventory.includes(target)) {
        // need a special case for alice's room in which opening doora also opens her room. 
        if (target == "doora" && player.inventory.includes("letter")) {
          console.log(doora.description);
          player.removeInventory("letter");
          doora.isLocked = false;
          bedroom.isRoomLocked = false;
          bedroom.addInventory("letter");
        }
        // If doora is open will get a message that Alice's bedroom door is open
        else if (target == "doora" && doora.isLocked == false) { console.log("The door to Alice's bedroom is unlocked.") }
          // item is ooen
        else if (itemLookUp[target].isLocked == false) {
          console.log(itemLookUp[target].description);
          }
        // If an item is locked and you have the key you will receive the description and the item will be set to unlocked
        else if (player.inventory.includes(itemLookUp[target].requiredKey)) {
          console.log(itemLookUp[target].description);
          itemLookUp[target].isLocked = false;
        }
        // If it;s locked and you don't have the right key 
        else if (interactionLookUp.open.includes(target)) {
          console.log("You don't have the right key to open this.")
        }
          // If it's in the room but you can't open it
        else { console.log("You can't open that! Time is ticking you have to find Rob!") }
      }
      // Not inventory in the room
      else {
        console.log("You can't open that. No time for games! ROB NEEDS YOU!");
          
      }
    }
    
  
        
    //   ! --------------------------------------------Speak to -----------------------------------------------------------
    else if (commandWords.talk.includes(command)) {
      // with nick we are going to push a new inventory item. Can only get this item if you talk to nick. Have to be in the restaurant.
      if (target == "nick" && currentLocation == "restaurant") {
        console.log(nick.description);
        roomLookUp[currentLocation].addInventory("tacos");
      }
      // If the person is not "locked" you will get their description
      else if (roomLookUp[currentLocation].people.includes(target) && itemLookUp[target].isLocked === false) {
        console.log(itemLookUp[target].description);
      }
      // you have the "key" for the person then you will get their description. 
      else if (roomLookUp[currentLocation].people.includes(target) && player.inventory.includes(itemLookUp[target].requiredKey)) {
        itemLookUp[target].description;
        itemLookUp[target].isLocked = false;
        player.removeInventory[requiredKey];
          
      }
     // if person is "locked" you will get their locked description
      else if (roomLookUp[currentLocation].people.includes(target) && itemLookUp[target].isLocked === true) {
        console.log(itemLookUp[target].lockedMessage);
      }
        // Try to talk to a person that is not in the room
      else if (interactionLookUp.talkTo.includes(target)) { console.log("That person is not in this room.") }
    // Try to talk to a thing or a person not in the game
      else{console.log("Stop messing around! Rob needs us! You must figure out who kidnapped him!")}
    }

    // ! ------------------------------------MOVE Rooms --------------------------------------------------------
    else if (commandWords.movement.includes(command)) {
      // setting possibke rooms to a variable 
      let currentPossibleRooms = roomLookUp[currentLocation].possibleRooms;
      // First checking if it's a room you can move to from where you are 
      if (currentPossibleRooms.includes(target)) {
      // If the room is unlocked it will change the current location to the current room and print the description
        if (roomLookUp[target].isRoomLocked == false) {
          currentLocation = target;
          console.log(roomLookUp[currentLocation].description);
        }
        // If locked but player has the key prints the new room description, sets the room to unlocked, and updates the current location
        else if (player.inventory.includes(roomLookUp[target].requiredKey)) {
          console.log(roomLookUp[target].description);
          roomLookUp[target].isRoomLocked = false;
          currentLocation = target;
          // Otherwise the door is locked 
        } else {
          console.log("This door is locked.");
        }
      } else {
        // NOT A ROOM You can move to 
        console.log("You cannot get to that room from here.");
      }
    }
  
    // !------------------------------------------------- Eat--------------------------------------------
    else if (commandWords.eat.includes(command)) {
      
      // For the burrito will check to see if it's in the room or in your inventory will add the letter to your inventory and print the letters message 
      if (target == "burrito" && (roomLookUp[currentLocation].inventory.includes("burrito"))){
        roomLookUp[currentLocation].removeInventory("burrito");
        player.addInventory("letter");
        console.log(burrito.description)
        console.log(itemLookUp["letter"].lockedMessage);
      }
      // case if burrito is in player inventory, same as above  
      else if (target == "burrito" && player.inventory.includes("burrito")) {
        player.removeInventory("burrito");
        player.addInventory("letter");
        console.log(burrito.description)
        console.log(itemLookUp["letter"].lockedMessage);
      }
          // Pie and Tacos are for Alice can't eat them
      else if (target == "pie" && roomLookUp[currentLocation].inventory.includes("pie") || target == "tacos" && roomLookUp[currentLocation].inventory.includes("tacos") || target == "pie" && player.inventory.includes("pie") || target == "tacos" && player.inventory.includes("tacos")) {
        console.log("You can't eat that! It is for Alice!");
      }
      // checks it is something you can eat, that the item is in the room, and removes it from the room inventory 
      else if (interactionLookUp.canEat.includes(target) && roomLookUp[currentLocation].inventory.includes(target)) {
        console.log(itemLookUp[target].description);
        roomLookUp[currentLocation].removeInventory(target);
       
      }
      // If player picked up but later figure out they need to eat it.
      else if (player.inventory.includes(target) && interactionLookUp.canEat.includes(target)) {
        player.removeInventory(target);
      }
      else {
        console.log("This is no time for shenanigans! You can't eat that!");
      }
        
    }
    
    // ! ------------------------------------------------Drink---------------------------------------------------------
    // Similar to eat, but don't want people to be able to say eat marg      
    else if (commandWords.drink.includes(command)) {
      // checks if it is something you can drink and checks if it is in the room 
      // For now no need to worry about if it's in the player inventory because the ALCHOLIC BEVERAGES ARE NOT ALLOWED TO GO. 
      // If added more drinks would need to add a line about in player inventory and then remove it from the inventory.
      if ((interactionLookUp.canDrink.includes(target) && roomLookUp[currentLocation].inventory.includes(target))) {
        console.log(itemLookUp[target].description);
        roomLookUp[currentLocation].removeInventory(target);
      }
      // Already drank it
      else if (interactionLookUp.canDrink.includes(target)) { console.log("You already drank that! Did you forget already? Maybe that drink wasn't the best idea."); }
      else {
        console.log("This is no time for shenanigans! You can't drink that!");
      }
        
    }
   
  
  

// ! ----------------------------------- GIVE (Similar idea to drop but give to a person)-----------------------------------
    else if (commandWords.give.includes(command))
    {
      // Give gets complicated because it goes beyond our two words of command and target. 
      // The first time we need to give Alice Tacos and Pie in her room. We are checking for all of those.
      // Then it removes those items from the player inventory and alice gives us a pick which is added to the player inventory and sets the gutair to unlocked. 
      if (currentLocation == "bedroom" && answer.includes("tacos") && answer.includes("pie") && answer.includes("alice") && player.inventory.includes("tacos") && player.inventory.includes("pie")) {
        console.log(alice.description);
        alice.isLocked = false;
        player.removeInventory("tacos");
        player.removeInventory("pie");
        console.log("Also, I found this pick on the ground. She hands you the pick.")
        player.addInventory("pick");
        guitar.isLocked = false;
      }
    // Otherwise if we try to give alice anything else she reminds us she needs both taco and pies
      else if (answer.includes("alice") && currentLocation== "bedroom" && alice.isLocked ==true)
      { console.log("I need both the [pie and tacos] to think straight!") }
      else if ((answer.includes("alice") && currentLocation == "bedroom" && alice.isLocked == false))
      { console.log("You can't give Alice that."); }
        // This is for when we give trey the guitar on stage
      else if (currentLocation == "stage" && answer.includes("guitar") && answer.includes("trey") && player.inventory.includes("guitar")) {
        console.log(trey.description);
        player.removeInventory("guitar");
        trey.isLocked = false;
      }
        // If you try to give trey things after he's unlocked
      else if (currentLocation == "stage" && answer.includes("trey") && trey.isLocked == false)
        console.log("You can't give Trey that.")
        // If we try to give trey anything else he reminds us he needs a guitar.
      else if (currentLocation == "stage" && answer.includes("trey") && trey.isLocked== true ) {
        console.log("I really need a guitar! If you don't have one on you maybe you know where to find one!' Trey says.")
      }
        // Otherwise a message to stop messing around.
      else {
        console.log("You can't give that! Come on this is serious! You have to find Rob before it's too late!");
      }
      
    }

    // ! -------------------------------- Drop IT LIKE IT's HOT! -------------------------------------
      
    else if (commandWords.drop.includes(command))
    {
      // checks to see if player has item and drops it.
      // removes it from the player inventory and adds it to the new player inventory 
      if (player.inventory.includes(target)) {
        player.removeInventory(target);
        roomLookUp[currentLocation].addInventory(target);
        console.log("You just dropped the " + target + " like it's hot in the " + roomLookUp[currentLocation].name + ".")
      }
      else { console.log("You don't have that item in your inventory.")

      }
    }
   // ! --------------If it is not a command it understands. Either the target or the command does not exist! Back up to catch any errors------------------
      // Will return message it does not understand 
    else
      if (allTargets.includes(target) == false || CommandLookup.includes(command) == false) {
      console.log("That is not a command I understand.");
    }
  
  }
}
    