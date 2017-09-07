var reservedRoomsSpawnLogic = require('Overmind.ReservedRoomsSpawning');

var OwnedRoomsSpawning = {
    run: function(masterRoomList) {
        for(name in Memory.Overmind.OwnedRooms) { //for each room entry in the database
            if(typeof(Game.rooms[name]) === 'undefined') { //if we can't see into the room
                console.log('The room', name, 'is coming back as undefined. Something is wrong.');
                break; //ditch this loop, something is wrong
            }
            if(masterRoomList.indexOf(name) == -1) { //if the room we are trying to work with isn't in our master list of rooms
                console.log('The room', name, 'is not in the master list of owned rooms');
                break; //then ignore it
            }
            
            var currentSpawn = Game.rooms[name].find(FIND_MY_SPAWNS)[0]; //get the spawn in the room (eventually we'll need to update this for multiple spawns)
            var newName; //initalize the newName variable for later
            var creepLevel; //along with the creepLevel variable for later (currently not used)
            var completedASpawn = false;
            var memoryPath = Memory.Overmind.OwnedRooms[name].populationStats;
            
            if(!(typeof(currentSpawn) === 'undefined') && currentSpawn.spawning == null) { //if the spawn is not spawning anything
                
                if(Game.rooms[name].find(FIND_MY_CREEPS).length < 4) {
                    newName = currentSpawn.createEmergencyMiner(); //then create a fueler
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Emergency Miner:', newName); //and only say that you did once you've done it
                        completedASpawn = true;
                    }
                    
                } else if(memoryPath.fuelers < memoryPath.targetNumberOfFuelers) {
                    newName = currentSpawn.createFueler(); //then create a fueler
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Fueler:', newName); //and only say that you did once you've done it
                        completedASpawn = true;
                    }
                    
                } else if(memoryPath.drills < memoryPath.targetNumberOfDrills) { //if we have less drills than desired
                    for(index in Memory.Overmind.OwnedRooms[name].metaData.sourceIDs) { //for each ID
                        var creepAssigned = _.filter(Game.rooms[name].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'drill' && creep.memory.assignedSource == Memory.Overmind.OwnedRooms[name].metaData.sourceIDs[index]);
                        if(creepAssigned.length == 0) { //if there isn't a creep assigned
                            //spawn a creep, set it's role, set it's assignedSource ID
                            newName = currentSpawn.createDrill(Memory.Overmind.OwnedRooms[name].metaData.sourceIDs[index]);
                            if(newName != -6 && newName != undefined) {
                                console.log(currentSpawn.name, 'Creating Drill:', newName); //and only say that you did once you've done it
                                completedASpawn = true;
                            }
                        }
                    }
                    
                } else if(memoryPath.movers < memoryPath.targetNumberOfMovers) {
                    for(index in Memory.Overmind.OwnedRooms[name].drillNames) { //for each ID
                        var creepAssigned = _.filter(Game.rooms[name].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'mover' && creep.memory.assignedSource == Memory.Overmind.OwnedRooms[name].drillNames[index]);
                        if(creepAssigned.length == 0) { //if there isn't a creep assigned
                            //spawn a creep, set it's role, set it's assignedSource ID
                            newName = currentSpawn.createMover(Memory.Overmind.OwnedRooms[name].drillNames[index]);
                            if(newName != -6 && newName != undefined) {
                                console.log(currentSpawn.name, 'Creating Mover:', newName); //and only say that you did once you've done it
                                completedASpawn = true;
                            }
                        }
                    }
                    
                } else if(memoryPath.upgraders < memoryPath.targetNumberOfUpgraders) {
                    newName = currentSpawn.createUpgrader(); //then create an upgrader
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Upgrader:', newName); //and only say that you did once you've done it
                        completedASpawn = true;
                    }
                    
                } else if(memoryPath.fortifiers < memoryPath.targetNumberOfFortifiers) {
                    newName = currentSpawn.createFortifier(); //then create a janitor
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Fortifier:', newName); //and only say that you did once you've done it
                        completedASpawn = true;
                    }
                    
                } else if(memoryPath.builders < memoryPath.targetNumberOfBuilders) {
                    newName = currentSpawn.createBuilder(); //then create a builder
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Builder:', newName); //and only say that you did once you've done it
                        completedASpawn = true;
                    }
                    
                } else if(memoryPath.janitors < memoryPath.targetNumberOfJanitors) {
                    newName = currentSpawn.createJanitor(); //then create a janitor
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Janitor:', newName); //and only say that you did once you've done it
                        completedASpawn = true;
                    }
                    
                } else if(memoryPath.mineralMiners < memoryPath.targetNumberOfMineralMiners) {
                    newName = currentSpawn.createMineralMiner();
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Mineral Miner:', newName);
                        completedASpawn = true;
                    }
                } else if(memoryPath.terminalManagers < memoryPath.targetNumberOfTerminalManagers) {
                    newName = currentSpawn.createTerminalManager();
                    if(newName != -6 && newName != undefined) {
                        console.log(currentSpawn.name, 'Creating Terminal Manager:', newName);
                        completedASpawn = true;
                    }
                } else {
                    //spawn reserved stuff
                    reservedRoomsSpawnLogic.run(name);
                }
            } else { //otherwise if it is spawning something
                //here we can do something else while the spawn is spawning something
            }
            
            if(completedASpawn) {
                return true;
            }
        }
        
        return false;
    }
}

module.exports = OwnedRoomsSpawning;
