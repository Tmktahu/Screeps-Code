//Welcome to Project Bastion. The goal of this project is to defend our current borders.

require('Bastion.spawnFunctions')();
var defenderLogic = require('Bastion.defenderLogic');

var Bastion = {
    run: function() {
        
        for(currentRoom in Memory.Oracle.OwnedRooms) { //for each room
            //if the room is peaceful, do nothing
            if(Memory.Oracle.OwnedRooms[currentRoom].state == 'peaceful' || Memory.Oracle.OwnedRooms[currentRoom].state == 'NPCAttack' ) {
                //do nothing for now
                //take care of walls and ramparts
                    //as in spawn a couple helpers to get the walls and ramparts up to speed?
            }
            
            if(Memory.Oracle.OwnedRooms[currentRoom].state == 'enemiesDetected') {

                var numberOfDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'bastionDefender' && creep.memory.targetRoom == currentRoom).length;
                var targetNumberOfDefenders = 4;
                var roomSpawns = Game.rooms[currentRoom].find(FIND_MY_SPAWNS);
                
                if(numberOfDefenders < targetNumberOfDefenders) { //if we need a defender
                    for(var i = 0; i < roomSpawns.length; i++) { //for each spawn in the list
                        if(roomSpawns[i].spawning == null) { //if we aren't spawning anything
                            var newName = roomSpawns[i].createMeleeDefender(currentRoom); //create a defender and pass the targer room as the parameter
                            if(newName != -6 && newName != undefined) {
                                console.log(roomSpawns[i].name, 'Creating Defender', newName, 'for Room', currentRoom);
                            }
                        }
                    }
                }
            }
            
            if(Memory.Oracle.OwnedRooms[currentRoom].state == 'underAttack') {
                //for now this will mimic the responce for if there are enemies in the room, but later we may do more drastic things
                
                //start producing response units
                //send them to the room
                
                var numberOfDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'bastionDefender').length;
                var targetNumberOfDefenders = 4;
                var roomSpawns = Game.rooms[currentRoom].find(FIND_MY_SPAWNS);
                
                if(numberOfDefenders < targetNumberOfDefenders) { //if we need a defender
                    for(var i = 0; i < roomSpawns.length; i++) { //for each spawn in the list
                        if(roomSpawns[i].spawning == null) { //if we aren't spawning anything
                            var newName = roomSpawns[i].createDefender(currentRoom); //create a defender and pass the targer room as the parameter
                            if(newName != -6 && newName != undefined) {
                                console.log(roomSpawns[i].name, 'Creating Defender', newName, 'for Room', currentRoom);
                            }
                        }
                    }
                }
            }
            
            if(Memory.Oracle.OwnedRooms[currentRoom].state == 'emergency') {
                //if we are in a state of emergency, that means that we think we are going to lose the room
                //in the future we may provice a list of rooms that it is allowed to safemode, but for now, just hit safemode
                
                //so the conditions will be decided in Oracle, here we just execute based on the Oracle's choice
                if(Game.rooms[currentRoom].controller.safeModeAvailable == 0) {
                    console.log('There are no safe modes available in room', currentRoom);
                } else if(Game.rooms[currentRoom].controller.safeModeCooldown != undefined) {
                    console.log('We are still in safe mode cooldown in room', currentRoom);
                } else if(Game.rooms[currentRoom].controller.safeMode != undefined) {
                    console.log('We are currently in safe mode in room', currentRoom);
                } else {
                    if(Game.rooms[currentRoom].controller.activateSafeMode() != OK) {
                        console.log('There has been a problem with activating saf emode in room', currentRoom, 'that we have not accounted for.');
                    }
                }
            }
        }
        
        //==================== RESERVED ROOMS CODE ==================== 
        for(currentRoom in Memory.Oracle.ReservedRooms) { //for each room
            //we want to keep a standing single defender at every reserved room at all times
            if(Game.rooms[currentRoom] != undefined) {    
                var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard' && creep.memory.targetRoomName == currentRoom);
                if(guards.length < 1) {
                    //we need a guard for this reserved room
                    //spawn it from the assigned owned room
                    var spawn = Game.rooms[Memory.Oracle.ReservedRooms[currentRoom].homeRoom].find(FIND_MY_SPAWNS)[0];
                    if(spawn.spawning == null) {
                        var newName = spawn.createGuard(currentRoom);
                        if(newName != -6 && newName != undefined) {
                            console.log(spawn.name, 'Creating Guard:', newName, 'for room', currentRoom); //and only say that you did once you've done it
                        }
                    }
                }
            }
            
            //if the room is peaceful, do nothing
            if(Memory.Oracle.ReservedRooms[currentRoom].state == 'peaceful') {
                //do nothing for now
                //take care of walls and ramparts
                    //as in spawn a couple helpers to get the walls and ramparts up to speed?
            }
            
            if(Memory.Oracle.ReservedRooms[currentRoom].state == 'npcAttack') {
                //start producing response units
                //send them to the room
                /*
                var numberOfDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeDefender' && creep.memory.targetRoom == currentRoom).length;
                var targetNumberOfDefenders = 1;
                var sarumSpawn = Game.spawns['Sarum'];
                
                if(numberOfDefenders < targetNumberOfDefenders) { //if we need a defender
                    if(sarumSpawn.spawning == null) { //if we aren't spawning anything
                        var newName = sarumSpawn.createMeleeDefender(currentRoom); //create a defender and pass the targer room as the parameter
                        if(newName != -6 && newName != undefined) {
                            console.log(sarumSpawn.name, 'Creating Defender', newName, 'for Room', currentRoom);
                        }
                    }
                }*/
            }
        }
        //down here we will manage the defense of reserved rooms
        //these will be different because it's not the end of the world if we lose one
        //what we will mainly be doing down here is holding rooms that we want to take for later or fortify with just creeps
        //so, we will have a master list of rooms-to-hold (find a better name)
            
        var roomsToHold = [];
        
        //here, put a cleanup script that goes through the database and removes rooms that aren't in the master list
        
        for(currentRoom in roomsToHold) { //for each room in the master list of rooms to hold
            //update that room's entry in memory.
            var currentRoomMemory;
            //if an entry for the room doesn't exist, make one
            if(Memory.Bastion.FortifiedRooms[roomsToHold[currentRoom]] == undefined) {
                Memory.Bastion.FortifiedRooms[roomsToHold[currentRoom]] = {
                    meleeDefenders: [],
                    rangedDefenders: [],
                    healers: [],
                    tanks: [],
                    
                    numberOfEnemies: 0,
                    closestOwnedRoom: 'none'
                    //we might actually keep an array of enemies for analysis in the future
                };
            } else { //otherwise we have an entry, so update it's information
                currentRoomMemory = Memory.Bastion.FortifiedRooms[roomsToHold[currentRoom]];
                currentRoomMemory.meleeDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'meleeDefender' && creep.memory.targetRoomName == roomsToHold[currentRoom]).length;
                currentRoomMemory.rangedDefenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedDefender' && creep.memory.targetRoomName == roomsToHold[currentRoom]).length;
                currentRoomMemory.healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer' && creep.memory.targetRoomName == roomsToHold[currentRoom]).length;
                currentRoomMemory.tanks = _.filter(Game.creeps, (creep) => creep.memory.role == 'tank' && creep.memory.targetRoomName == roomsToHold[currentRoom]).length;
                
                if(Game.rooms[currentRoom] != undefined) {
                    currentRoomMemory.numberOfEnemies = Game.rooms[roomsToHold[currentRoom]].find(FIND_HOSTILE_CREEPS).length;
                }
            }
            
            //once we have updated the information, make decisions based on it
            
            /*
            if(currentRoomMemory.closestOwnedRoom == 'none' || currentRoomMemory.closestOwnedRoom == undefined) { //if we haven't set a closest owned room yet
                var selectedOwnedRoom;
                var selectedPathDist = 99999;
                for(currentSpawn in Game.spawns) { //for each spawn in the world
                    var currDist = Game.map.findRoute(Game.spawns[currentSpawn].room.name, roomsToHold[currentRoom]).length;
                    
                    if(currDist < selectedPathDist) {
                        selectedOwnedRoom = Game.spawns[currentSpawn].room.name;
                        selectedPathDist = currDist;
                    }
                } //when we come out of this, selectedOwnedRoom will have the target spawn room
                
                currentRoomMemory.closestOwnedRoom = selectedOwnedRoom; //put the selected room's name in memory
            }*/
            
            //below is a master list of each type of creep required. Eventually we'll put these in memory for each room
            var numberOfMelee = 3;
            var numberOfRanged = 0;
            var numberOfHealers = 1;
            var numberOfTanks = 0;
            
            //before all this happens we should also find the closest owned room and store it in memory, then use that room over and over again for the future
            //var selectedSpawns = Game.rooms[currentRoomMemory.closestOwnedRoom].find(FIND_MY_SPAWNS); //so this is a list of all spawns in the room we want to spawn in
            
            //what we should do, is that if a spawn is NOT spawning anything, do the spawning command.
            //if a spawn IS spawning something, skip it and go to the next spawn
            var newName;
            //for(index in selectedSpawns) {
            for(spawnName in Game.spawns) {
                
                if(Game.spawns[spawnName].spawning == null) { //if the spawn is NOT spawning anything
                    if(currentRoomMemory.meleeDefenders < numberOfMelee) {
                        //spawn a melee attacker with the current room as its target at the recorded spawn room
                        newName = Game.spawns[spawnName].createMeleeDefender(roomsToHold[currentRoom]);
                        if(newName != -6 && newName != undefined) {
                            console.log(spawnName, 'Creating Melee Defender', newName, 'for Room', roomsToHold[currentRoom]);
                        }
                    } else if(currentRoomMemory.rangedDefenders < numberOfRanged) {
                        //spawn a ranged attacker with the current room as its target at the recorded spawn room
                        newName = Game.spawns[spawnName].createRangedDefender(roomsToHold[currentRoom]);
                        if(newName != -6 && newName != undefined) {
                            console.log(spawnName, 'Creating Ranged Defender', newName, 'for Room', roomsToHold[currentRoom]);
                        }
                    } else if(currentRoomMemory.healers < numberOfHealers) {
                        //spawn a ranged attacker with the current room as its target at the recorded spawn room
                        newName = Game.spawns[spawnName].createHealer(roomsToHold[currentRoom]);
                        if(newName != -6 && newName != undefined) {
                            console.log(spawnName, 'Creating Healer', newName, 'for Room', roomsToHold[currentRoom]);
                        }
                    } else if(currentRoomMemory.tanks < numberOfTanks) {
                        //spawn a ranged attacker with the current room as its target at the recorded spawn room
                        newName = Game.spawns[spawnName].createTank(roomsToHold[currentRoom]);
                        if(newName != -6 && newName != undefined) {
                            console.log(spawnName, 'Creating Tank', newName, 'for Room', roomsToHold[currentRoom]);
                        }
                    }
                    
                    break; //and break out of the loop, though we may not need to do this
                } else { //otherwise it is spawning something
                    //so do nothing and let the loop go back around to the next one
                }
            }
            //to manage how many creeps are in each room, we should have a database entry for each room in the master list
            //it will be at Memory.Bastion.RoomsToHold[nameOfRoom]
                //in each room's entry we will keep
                    //an array of names of assigned defenders
                        //might have a couple of these, one for each type of defender
                    //the number of enemies in the current room?
                    //something else
            
            //then Bastion will update and read this information, and then spawn defenders as needed
                //where we spawn the defenders from should be calculated by distance...ug
            
        }
        
        
        
    }
}

module.exports = Bastion;
