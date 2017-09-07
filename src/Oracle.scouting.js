var Scouting = {
    run: function() {
        var roomsToScout = [];
        
        for(index in Memory.Oracle.ReservedRooms) {
            if(Game.rooms[index] == undefined) {
                roomsToScout.push(index);
            }
        }
        
        for(index in Memory.Oracle.FortifiedRooms) {
            if(Game.rooms[index] == undefined) {
                roomsToScout.push(index);
            }
        }
        
        //now we have a list of rooms that we need to get vision in.
        //so, we should have a list of current scouts' names
        Memory.Oracle.Scouts = []; //reset the current list of scouts
        var allScouts = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout');
        var tempArray = [];
        for(i = 0; i < allScouts.length; i++) {
            tempArray.push(allScouts[i].name);
        }
        Memory.Oracle.Scouts = tempArray;
        
        //console.log(roomsToScout);
        //console.log(allScouts);
        
        //so for each room, check and see if there is a scout already assigned to it
        for(var i = 0; i < roomsToScout.length; i++) { //for each room
        //console.log(roomsToScout, i);
            for(var j = 0; j < allScouts.length; j++) { //go through our list of alive scouts
                //console.log(j, allScouts[j].memory.targetRoom, i, roomsToScout[i]);
                //console.log('j', j, allScouts[j].memory.targetRoom, '| i', i, roomsToScout[i]);
                //console.log(allScouts[j].memory.targetRoom, roomsToScout[i]);
                //console.log(allScouts[j].memory.targetRoom == roomsToScout[i]);
                if(allScouts[j].memory.targetRoom == roomsToScout[i]) { //and if we find one that is assigned
                    //console.log('we should remove', roomsToScout[i]);
                    j = allScouts.length; //ditch this loop
                    roomsToScout.splice(i, 1); //remove the current entry from the rooms that need to be scouted
                    i = -1; //and start over from the beginning of the list because the indexes have changed
                }
            }
        }
        
        //console.log(roomsToScout);
        
        //by the end of this, we should have a list of rooms that need a scout made for them
        //the above algorythm should also remove rooms once we have started producing a scout or once a scout finishes
        //so we can just make one for the first room on the list and it should go
        
        if(roomsToScout.length > 0) {
            if(Game.spawns['Tanis'].spawning == null) {
                //these are cheap...just use Tanis for now
                var newName = Game.spawns['Tanis'].createCreep([MOVE], Game.spawns['Tanis'].generateName('scout'), {role: 'scout', targetRoom: roomsToScout[0]});
                if(newName != undefined || newName != -6) {
                    console.log('Tanis Creating Scout', newName, 'for Room', roomsToScout[0]);
                }
            }
        }
        
        //and finally we can send all the scouts to do their job
        for(var i = 0; i < allScouts.length; i++) {
            module.exports.scoutLogic(allScouts[i]);
        }
        //check to see how many scouts we have
            //if we have less scouts than the number of no-vision rooms
                //create a scout, assign it the room, log it's name in the database
            //if we have enough scouts
                //reassign one to the target room
    },
    
    scoutLogic: function(creep) {
        if(creep.room.name != creep.memory.targetRoom) {
            creep.moveTo(Game.flags[creep.memory.targetRoom]);
        } else {
            creep.moveTo(24, 24);
        }
    }
}

module.exports = Scouting;
