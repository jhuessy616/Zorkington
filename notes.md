 // !cool way jonas and I worked out, but hard to use with lookup tables after
    // if (Object.keys(commands).includes(commandWords.includes(command))) {
    //     commands[command](target);
    // }

     // TODO that item isn't in this room if we want a different message
      // else if (!(roomLookUp[currentLocation].includes(target))){
      //   console.log("That item isn't in this room.")
      //  

      // ! ------------------------If Player Just hits enter need a target. 
    else if (commandWords.movement.includes(command) && target == command) {
      console.log("Please specify what room you would like to enter.")
      }