var ReservedRoomsSpawning = {
    run: function(ownedRoom) {
        
        var janitorBlacklist = ['E31N76', 'E31N75'];
        var homeRoom = Game.rooms[ownedRoom];
        var roomList = Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms;
        var roomSpawns = homeRoom.find(FIND_MY_SPAWNS);
        
        var numConstructionSites = Game.rooms[ownedRoom].find(FIND_MY_CONSTRUCTION_SITES).length;
        for (reservedRoomName in Memory.Overmind.OwnedRooms[ownedRoom].reservedRooms) {
            if(Game.rooms[reservedRoomName] != undefined) {
                numConstructionSites += Game.rooms[reservedRoomName].find(FIND_MY_CONSTRUCTION_SITES).length;
            }
        }
        //console.log(ownedRoom, 'has', numConstructionSites, 'sites');
        
        for(roomName in roomList) { //for each room in the master list
            //get all the info about the varios types of creeps
            var reservers = _.filter(Game.creeps, (creep) => creep.memory.role == 'reserver' && creep.memory.targetRoom == roomName); //get a list of reservers for our current room
            var remoteDrills = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteDrill' && creep.memory.targetRoom == roomName); //get a list of remote miners for our current room
            var remoteHaulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.targetRoom == roomName); //get a list of remote miners for our current room
            var remoteJanitors = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteJanitor' && creep.memory.targetRoom == roomName); //get a list of reservers for our current room
            var numSources;
            var roomController;
            var roomSources;
            var totalHaulers = 0;
            
            //here we will calculate the required number of haulers for each source in the reserved room if it hasn't been done already
            //so to do this, we find the distance from the storage to the source
            //then take that distance and multiply it by 2 for the round trip
            //then take that number and multiply it by 10 energy per tick
            //then that is the capacity that the hauler must have
            //divide it by 50 for desired number of carry parts, rounded up
            //then create a hauler with that many carry parts
            //if the distance is greater than a certain number, then set a variable that says we need 2 haulers
            
            if(Game.rooms[roomName] != undefined) {
                roomSources = Game.rooms[roomName].find(FIND_SOURCES);
                roomController = Game.rooms[roomName].controller;
                
                if(roomList[roomName].sources == undefined) {
                    roomList[roomName].sources = {};
                }
                
                for(i = 0; i < roomSources.length; i++) {
                    if(roomList[roomName].sources[roomSources[i].id] == undefined) {
                        roomList[roomName].sources[roomSources[i].id] = {haulerSize: 0, numHaulers: 0};
                    }
                }
                
                for(sourceID in roomList[roomName].sources) {
                    if(roomList[roomName].sources[sourceID].haulerSize == undefined || roomList[roomName].sources[sourceID].haulerSize == 0) { //if we haven't set a hauler size for the current soruce yet
                        var roomStorage = homeRoom.storage;
                        
                        //var travelDistance = homeRoom.storage.pos.findPathTo(Game.getObjectById(sourceID), {ignoreCreeps: true}).length;
                        var travelDistance = PathFinder.search(homeRoom.storage.pos, {pos: Game.getObjectById(sourceID).pos, range: 1}).path.length;
                        //console.log(Pathfinder.search(homeRoom.storage.pos, {pos: Game.getObjectById(sourceID).pos, range: 1}).incomplete);
                        var numCarryParts = Math.ceil((travelDistance * 2 * 10) / 50);
                        
                        if(numCarryParts > 10) {
                            roomList[roomName].sources[sourceID].numHaulers = 2;
                            roomList[roomName].sources[sourceID].haulerSize = Math.ceil(numCarryParts / 2);
                        } else {
                            roomList[roomName].sources[sourceID].numHaulers = 1;
                            roomList[roomName].sources[sourceID].haulerSize = numCarryParts;
                        }
                    }
                    totalHaulers = totalHaulers + roomList[roomName].sources[sourceID].numHaulers;
                }
            }
            
            if(Game.rooms[roomName] != undefined) {
            //================================= Reserver Management Code =================================
                if(roomController != undefined && reservers.length == 0 && Game.rooms[roomName].numSpawning('reserver') == 0) { //if there is no reserver
                    console.log(ownedRoom);
                    for(j = 0; j < roomSpawns.length; j++) {
                        if(roomSpawns[j].spawning == null) { //and if it isn't spawning anything
                            var newName = roomSpawns[j].createCreep([CLAIM, CLAIM, MOVE, MOVE], undefined, {role: 'reserver', targetRoom: roomName}); //create a reserver
                            if(newName != undefined && newName != -6) {
                                console.log(roomSpawns[j].name, 'Creating Reserver', newName, 'for Room', roomName); //and log it
                                break;
                            }
                        }
                    }
                }
                
            //================================= Remote Drill Management Code =================================
                else if(roomSources != undefined && remoteDrills.length < roomSources.length && Game.rooms[roomName].numSpawning('remoteDrill') == 0) {
                    console.log(ownedRoom);
                    for(j = 0; j < roomSpawns.length; j++) {
                        if(roomSpawns[j].spawning == null) { //and if it isn't spawning anything
                            var newName = roomSpawns[j].createRemoteDrill(roomName); //create a remote miner
                            if(newName != undefined && newName != -6) {
                                console.log(roomSpawns[j].name, 'Creating Remote Drill', newName, 'for Room', roomName); //and log it
                                break;
                            }
                        }
                    }
                }
                
            //================================= Remote Hauler Management Code =================================
                else if(roomSources != undefined && remoteHaulers.length < totalHaulers && Game.rooms[roomName].numSpawning('remoteHauler') == 0) {
                    for(j = 0; j < roomSources.length; j++) {
                        var haulersAssigned = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteHauler' && creep.memory.targetSource == roomSources[j].id);
                        
                        if(haulersAssigned.length < roomList[roomName].sources[roomSources[j].id].numHaulers) {
                            for(k = 0; k < roomSpawns.length; k++) {
                                if(roomSpawns[k].spawning == null) { //and if it isn't spawning anything
                                    var newName = roomSpawns[k].createRemoteHauler(roomName, ownedRoom, roomSources[j].id, roomList[roomName].sources[sourceID].haulerSize); //create a remote miner
                                    if(newName != undefined && newName != -6) {
                                        console.log(roomSpawns[k].name, 'Creating Remote Hauler', newName, 'for Room', roomName); //and log it
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                
            //================================= Remote Builder Management Code =================================
                else if(numConstructionSites > 0) { //if there are construction sites
                    var numRemoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder' && creep.memory.homeRoom == ownedRoom).length;
                    var targetNumRemoteBuilders = Math.ceil(numConstructionSites/((0.15 * numConstructionSites) + 1));
                    
                    if(numRemoteBuilders < targetNumRemoteBuilders) { //if we need a remote builder
                        roomSpawns = Game.rooms[ownedRoom].find(FIND_MY_SPAWNS); //get a list of spawns in the room
                        for(var j = 0; j < roomSpawns.length; j++) { //and for each spawn
                            if(roomSpawns[j].spawning == null) { //if it isn't spawning anything
                                var newName = roomSpawns[j].createRemoteBuilder(ownedRoom);
                                if(newName != undefined && newName != -6) {
                                    console.log(roomSpawns[j].name, 'Creating Remote Builder', newName, 'for Room', roomName); //and log it
                                    break;
                                }
                            }
                        }
                    }
                }
                
            //================================= Remote Janitor Management Code =================================
            /*
                else if(remoteJanitors.length < 0) {
                    var targetSpawnRoomName = 'none'; //start with no spawn set
                    var targetTravelDistance = 99999; //start with stupid large distance
                    
                    for(currentOwnedRoom in Memory.Overmind.OwnedRooms) { //for each owned room
                        var tempDistance = Game.map.findRoute(currentOwnedRoom, masterRoomList[i]).length; //get the room-by-room distance to it
                        if(tempDistance < targetTravelDistance) { //and if that distance is less than our current distance
                            targetSpawnRoomName = currentOwnedRoom; //select that room
                            targetTravelDistance = tempDistance; //and save the distance for the next run
                        }
                    }
                    targetSpawnRoom = Game.rooms[targetSpawnRoomName].find(FIND_MY_SPAWNS)[0]; //then get the spawn from the closest room
                    
                    if(targetSpawnRoom.spawning == null) { //and if it isn't spawning anything
                        var newName = targetSpawnRoom.createRemoteJanitor(masterRoomList[i]); //create a remote janitor
                        if(newName != undefined && newName != -6) {
                            console.log(targetSpawnRoom.name, 'Creating Remote Janitor', newName, 'for Room', masterRoomList[i]); //and log it
                        }
                    }
                }*/
            }
        }
    }
}

module.exports = ReservedRoomsSpawning;
