var roleClaimer = {
    run: function(creep) {
        //this is a claimer that has a variable in it's memory that is the destination room
        
        if(typeof(creep.memory.targetRoom) === 'undefined') { //create the variable
            creep.memory.targetRoom = 'needsTarget'; //set it as no target, cause we'll do that manually for now
        }
        
        if(creep.memory.targetRoom == 'needsTarget') { //if we don't have a target
            creep.say('Need Target'); //say something
        } else if(typeof(Game.rooms[creep.memory.targetRoom]) === 'undefined') { //if we can't see into that room
            creep.say('Cant see'); //say something
            creep.moveTo(Game.flags['target']); //and move there so we can see
        } else { //otherwise, we can see in the room
            console.log(Game.rooms['E28N76'].controller);
            if(creep.claimController(Game.rooms['E28N76'].controller) == ERR_NOT_IN_RANGE) { //so try and claim the controller
                console.log('wtf times 2');
                creep.moveTo(creep.room.controller); //if we arne't in range, move there
            }
        }
    }
}

module.exports = roleClaimer;
