//Welcome to Project Oracle. This project is independant and contains it's own database. It's job is to watch all of our rooms and determine their states.

var Scouting = require('Oracle.Scouting');

var Oracle = {
    run: function() {
        //so to make decisions, we must first update the database
        
        //Oracle will watch all rooms that are being managed by Overlord
        for(roomName in Memory.Overmind.OwnedRooms) { //for each owned room
            if(Memory.Oracle.OwnedRooms[roomName] == undefined) { //if we don't have an entry for it yet
                Memory.Oracle.OwnedRooms[roomName] = { //create the database entry
                    //and here we define what variables we want
                    
                    //to start, we want a state variable
                    state: 'peaceful',
                    
                    numberOfNPCs: 0,
                    
                    //we want the numer of enemies
                    numberOfEnemies: 0,
                    
                    //we want the names of the players who own the enemy creeps
                    enemyPlayerNames: [],
                    
                    incomingNukes: 0,
                    
                    incomingNukesOriginRooms: []
                }
            } else { //otherwise the database entry is defined, so put info into it
                var currentRoomMemory = Memory.Oracle.OwnedRooms[roomName];
                
                var hostileCreeps = _.filter(Game.rooms[roomName].find(FIND_HOSTILE_CREEPS), (creep) => creep.owner.username != 'Invader');
                currentRoomMemory.numberOfEnemies = hostileCreeps.length;
                
                if(hostileCreeps.length > 0) {
                    var tempArray = [];
                    for(var i = 0; i < hostileCreeps.length; i++) {
                        if(tempArray.indexOf(hostileCreeps[i].owner.username) == -1) {
                            tempArray.push(hostileCreeps[i].owner.username);
                        }
                    }
                    currentRoomMemory.enemyPlayerNames = tempArray;
                }
                
                var nukes = Game.rooms[roomName].find(FIND_NUKES);
                if(nukes.length > 0) {
                    Memory.Oracle.OwnedRooms[roomName].incomingNukes = nukes.length;
                    
                    var tempNukeArray = [];
                    for(var j = 0; j < nukes.length; j++) {
                        if(tempNukeArray.indexOf(nukes[i].launchRoomName) == -1) {
                            tempNukeArray.push(nukes[i].launchRoomName);
                        }
                    }
                    Memory.Oracle.OwnedRooms[roomName].incomingNukesOriginRooms = tempNukeArray;
                }
                
                if(currentRoomMemory.state == undefined) {
                    currentRoomMemory.state = 'peaceful';
                } else {
                    currentRoomMemory.state = module.exports.determineState(roomName);
                }
            }
        }
        
        for(ownedRoom in Memory.Overmind.OwnedRooms) {
            for(roomName in Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms) { //for each reserved room
                if(Memory.Oracle.ReservedRooms[roomName] == undefined) { //if we don't have an entry for it yet
                    Memory.Oracle.ReservedRooms[roomName] = { //create the database entry
                        
                        //and here we define what variables we want
                        vision: false,
                        numberOfNPCs: 0,
                        homeRoom: ownedRoom,
                        state: 'none'
                        
                    }
                } else {
                    if(Game.rooms[roomName] == undefined) {
                        Memory.Oracle.ReservedRooms[roomName].vision = false;
                    } else {
                        Memory.Oracle.ReservedRooms[roomName].vision = true;
                        
                        var npcCreeps = _.filter(Game.rooms[roomName].find(FIND_HOSTILE_CREEPS), (creep) => creep.owner.username == 'Invader');
                        Memory.Oracle.ReservedRooms[roomName].numberOfNPCs = npcCreeps.length;
                        
                        if(Memory.Oracle.ReservedRooms[roomName].state == undefined) {
                            Memory.Oracle.ReservedRooms[roomName].state = 'peaceful';
                        } else {
                            Memory.Oracle.ReservedRooms[roomName].state = module.exports.determineState(roomName);
                        }
                        //we are good to collect information about the room
                    }
                }
            }
        }
        
        for(roomName in Memory.Bastion.FortifiedRooms) { //for each fortified room
            if(Memory.Oracle.FortifiedRooms[roomName] == undefined) { //if we don't have an entry for it yet
                Memory.Oracle.FortifiedRooms[roomName] = { //create the database entry
                    
                    //and here we define what variables we want
                    vision: false,
                    
                    //we want the numer of enemies
                    numberOfEnemies: 0,
                    
                    //we want the names of the players who own the enemy creeps
                    enemyPlayerNames: []
                    
                }
            } else {
                if(Game.rooms[roomName] == undefined) {
                    Memory.Oracle.FortifiedRooms[roomName].vision = false;
                } else {
                    Memory.Oracle.FortifiedRooms[roomName].vision = true;
                    //we are good to collect information about the room
                    var currentRoomMemory = Memory.Oracle.FortifiedRooms[roomName];
                
                    var hostileCreeps = _.filter(Game.rooms[roomName].find(FIND_HOSTILE_CREEPS), (creep) => creep.owner.username != 'Invader');
                    currentRoomMemory.numberOfEnemies = hostileCreeps.length;
                    
                    if(hostileCreeps.length > 0) {
                        var tempArray = [];
                        for(var i = 0; i < hostileCreeps.length; i++) {
                            if(tempArray.indexOf(hostileCreeps[i].owner.username) == -1) {
                                tempArray.push(hostileCreeps[i].owner.username);
                            }
                        }
                        currentRoomMemory.enemyPlayerNames = tempArray;
                    }
                }
            }
            
            if(Memory.Oracle.FortifiedRooms[roomName].vision) {
                if(Memory.Oracle.FortifiedRooms[roomName].numberOfEnemies > 0) {
                    Game.notify('Enemy belonging to '+Memory.Oracle.FortifiedRooms[roomName].enemyPlayerNames+' in room '+roomName);
                }
            }
        }
        
        Scouting.run();
    },
    
    determineState: function(roomName) {
        //the purpose of this function is to determine the state of the room
        //we want owned rooms and reserved rooms cases
        if(Memory.Oracle.OwnedRooms[roomName] != undefined) {
            if(Game.rooms[roomName] != undefined) { //if we have vision of the room
                if(Memory.Oracle.OwnedRooms[roomName].numberOfEnemies == 0 /* && no nukes*/) {
                    return 'peaceful';
                }
                
                if(Memory.Oracle.OwnedRooms[roomName].numberOfNPCs > 0) {
                    return 'npcAttack';
                }
                
                if(Memory.Oracle.OwnedRooms[roomName].numberOfEnemies > 0) { //if there are enemies
                    return 'enemiesSpotted';
                }
                /*
                if(Oracle.OwnedeRooms[roomName].numberOfEnemies > 0 && we are taking damage) { //if there are enemies
                    return 'underAttack';
                }
                */
                /*
                
                enemy creeps in room
                AND
                wall or rampart about to die
                
                enemy creeps in room
                AND
                spawn OR storage OR extension OR link OR terminal OR turret under attack
                
                enemy creeps in room
                AND
                upgrader OR fueler OR drill under attack
                
                enemy creeps in room
                AND
                no friendly creeps in room
                    for this case, we might accidentally trigger if a room is 'dead' cause bugs and someone sends a scout at us or something
                    we dont want that to happen
                        we can fix this by setting a limit
                        
                AT LEAST 3 enemy creeps in room
                AND
                no friendly creeps in room
    
                master emergency condition:
                (enemy creeps in room AND (wall or rampart about to die OR (spawn OR storage OR extension OR link OR terminal OR turret under attack) OR (upgrader OR fueler OR drill under attack) OR (AT LEAST 3 enemy creeps in room AND no friendly creeps in room)
                */
    
                //wall or rampart about to die
                var nearlyDeadWalls = _.filter(Game.rooms[roomName].find(FIND_STRUCTURE), (structure) => (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) && structure.hits < 10000);
                //eventually we'll have to account for things like internal ramparts. not sure how we'll do that
                
                //internal structures under attack
                var internalStructuresUnderAttack = _.filter(Game.rooms[roomName].find(FIND_MY_STRUCTURES), (structure) =>
                                                (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_LINK ||
                                                structure.structureType == STRUCTURE_TERMINAL || structure.structureType == STRUCTURE_TOWER) &&
                                                (structure.hits < structure.hitsMax) );
                                                
                //internal creeps under attack
                var internalCreepsUnderAttack = _.filter(Game.rooms[roomName].find(FIND_MY_CREEPS), (creep) =>
                                            (creep.memory.role == 'upgrader' || creep.memory.role == 'fueler' || creep.memory.role == 'drill') &&
                                            (creep.hits < creep.hitsMax) );
                                            
                //no friendly creeps in room
                var friendlyCreeps = Game.rooms[roomName].find(FIND_MY_CREEPS);
                
                if(Memory.Oracle.OwnedRooms[roomName].numberOfEnemies > 0 && //if there are enemies in the room AND
                        (nearlyDeadWalls.length > 0 || //there are nearly dead walls
                        internalStructuresUnderAttack.length > 0 || //OR there are internal structures under attack
                        internalCreepsUnderAttack.length > 0 || //OR there are internal creeps under attack
                        (Memory.Oracle.OwnedRooms[roomName].numberOfEnemies > 2 && friendlyCreeps.length < 3) )) { //OR there are at least 3 enemy creeps and under 3 friendly creeps
                    return 'emergency';
                }
            }
        } else if(Memory.Oracle.ReservedRooms[roomName] != undefined) {
            
            if(Memory.Oracle.ReservedRooms[roomName].vision) { //if we have vision of the room
                if(Memory.Oracle.ReservedRooms[roomName].numberOfEnemies == 0 /* && no nukes*/) {
                    return 'peaceful';
                }
                
                if(Memory.Oracle.ReservedRooms[roomName].numberOfNPCs > 0) {
                    return 'npcAttack';
                }
                
                if(Memory.Oracle.ReservedRooms[roomName].numberOfEnemies > 0) { //if there are enemies
                    return 'enemiesSpotted';
                }
                /*
                if(Oracle.OwnedeRooms[roomName].numberOfEnemies > 0 && we are taking damage) { //if there are enemies
                    return 'underAttack';
                }
                */
            }
            
        } else {
            console.log('There is a problem');
        }
    }
}

module.exports = Oracle;
