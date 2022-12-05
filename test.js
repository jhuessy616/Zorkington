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
}

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


console.log(julia.inventory[0].removeable);