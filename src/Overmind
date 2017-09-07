//Welcome to Project Overmind, the successor to the Multi-Purpose-Creep Project
//Last updated by Fryke on 1/12/2017

require('Overmind.SpawnFunctions')(); //we need the functions that we have custom made and added onto the StructureSpawn object
var OwnedRoomsSpawning = require('Overmind.OwnedRoomsSpawning');
var ReservedRoomsSpawning = require('Overmind.ReservedRoomsSpawning');

var Overmind = { //Declare the Overmind object
    controlSwarm: function() { //this is our base function. It controls everything.
        
        var myRooms = ['E29N76', 'E28N75', 'E28N77', 'E29N79', 'E31N79']; //This is the master list of rooms that are owned by us
        var reservedRooms = ['E28N76', 'E29N75', 'E29N77', 'E28N79', 'E27N79']; //This is the master list of rooms that are reserved by us
        
        //this is the basic clean-up-dead-creeps code
        for(var name in Memory.creeps) { //for each creep
            if(!Game.creeps[name]) { //see if it's alive
                delete Memory.creeps[name]; //if it's not, delete it's record
                console.log(name, 'died for the swarm.'); //and say something
            }
        }
        
        //------------------------------------------------------ OWNED ROOMS CODE ------------------------------------------------------------
        
        for(i = 0; i < myRooms.length; i++) { //for each room in the list
            if(typeof(Game.rooms[myRooms[i]]) === 'undefined') { //check if we have vision of it
                //in here, we don't see the room
            } else { //otherwise we do have vision of the room
                var numConstructionSites = Game.rooms[myRooms[i]].find(FIND_CONSTRUCTION_SITES).length; //get the number of construction sites in the room
                var numLinks = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_LINK).length; //get the number of links in the room
                var numTowers = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_TOWER).length; //get the number of towers in the room
                var numSources = Game.rooms[myRooms[i]].find(FIND_SOURCES).length; //get the number of sources in the room
                
                //if we have towers, then we don't need a janitor
                if(numTowers) { var tempJanitorNumber = 0; } else { var tempJanitorNumber = 1; }
                
                if(Memory.Overmind.OwnedRooms[myRooms[i]] == undefined) { //if we are working with a brand new room, then it's entry in our database will be undefined
                    Memory.Overmind.OwnedRooms[myRooms[i]] = { //so define it
                        populationStats: {
                            drills: 0,
                            targetNumberOfDrills: 0,
                            movers: 0,
                            targetNumberOfMovers: 0,
                            upgraders: 0,
                            targetNumberOfUpgraders: 0,
                            builders: 0,
                            targetNumberOfBuilders: 0,
                            fuelers: 0,
                            targetNumberOfFuelers: 0,
                            fortifiers: 0,
                            targetNumberOfFortifiers: 0,
                            mineralMiners: 0,
                            targetNumberOfMineralMiners: 0,
                        },
                        
                        metaData: {
                            potentialEnergy: 0,
                            sourceIDs: [],
                        },
                        
                        reservedRooms: {
                            
                        },
                        
                        upgraderLink: 'none',
                        drillNames: [],
                        roomOverviewCoords: [0, 0]
                    };
                    
                } else { //otherwise the entry is defined
                    var roomMemory = Memory.Overmind.OwnedRooms[myRooms[i]]; //set the roomMemory for ease-of-reading
                    
                    var drills = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'drill');
                    var tempNameArray = [];
                    for(index in drills) {
                        tempNameArray.push(drills[index].name);
                    }
                    roomMemory.drillNames = tempNameArray;
                    
                    //and then get the number of types of creeps in each room
                    roomMemory.populationStats.drills = drills.length + Game.rooms[myRooms[i]].numSpawning('drill');
                    roomMemory.populationStats.targetNumberOfDrills = 2;
                    
                    roomMemory.populationStats.movers = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'mover').length + Game.rooms[myRooms[i]].numSpawning('mover');
                    roomMemory.populationStats.targetNumberOfMovers = Math.abs(numLinks - 3);
                    
                    roomMemory.populationStats.upgraders = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'upgrader').length + Game.rooms[myRooms[i]].numSpawning('upgrader');
                    roomMemory.populationStats.targetNumberOfUpgraders = 1;
                    
                    roomMemory.populationStats.builders = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'builder').length + Game.rooms[myRooms[i]].numSpawning('builder');
                    /*if(numConstructionSites < 20) {
                        roomMemory.targetNumberOfBuilders = Math.ceil(numConstructionSites / 5);
                    } else {
                        roomMemory.targetNumberOfBuilders = 4;
                    }*/
                    roomMemory.populationStats.targetNumberOfBuilders = 0;
                    
                    roomMemory.populationStats.fuelers = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'fueler').length + Game.rooms[myRooms[i]].numSpawning('fueler');
                    roomMemory.populationStats.targetNumberOfFuelers = 2;
                    
                    roomMemory.populationStats.fortifiers = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'fortifier').length + Game.rooms[myRooms[i]].numSpawning('fortifier');
                    roomMemory.populationStats.targetNumberOfFortifiers = 1;
                    
                    roomMemory.populationStats.mineralMiners = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'mineralMiner').length + Game.rooms[myRooms[i]].numSpawning('mineralMiner');
                    var extractor = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_EXTRACTOR);
                    if(extractor.length > 0) {
                        roomMemory.populationStats.targetNumberOfMineralMiners = 1;
                    } else {
                        roomMemory.populationStats.targetNumberOfMineralMiners = 0;
                    }
                    
                    roomMemory.populationStats.terminalManagers = _.filter(Game.rooms[myRooms[i]].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'terminalManager').length + Game.rooms[myRooms[i]].numSpawning('terminalManager');
                    roomMemory.populationStats.targetNumberOfTerminalManagers = 1;
                    
                    //and store the potential energy of the room (not used atm, but nice to have)
                    roomMemory.metaData.potentialEnergy = Game.rooms[myRooms[i]].energyCapacityAvailable;
                    
                    var sources = Game.rooms[myRooms[i]].find(FIND_SOURCES);
                    var tempArray = [];
                    for(index in sources) {
                        tempArray.push(sources[index].id);
                    }
                    roomMemory.metaData.sourceIDs = tempArray;
                }
            }
        }
        
        //we put the auto-spawning logic into a seperate module for readability's sake
        if(!OwnedRoomsSpawning.run(myRooms)) { //so, if the owned room spawning doesn't spawn anything
            //ReservedRoomsSpawning.run(reservedRooms);
        }
        
        //------------------------------------------------------ RESERVED ROOMS CODE ------------------------------------------------------------
        for(var i = 0; i < reservedRooms.length; i++) {
            if(Memory.Overmind.ReservedRooms[reservedRooms[i]] == undefined) { //if we are working with a brand new room, then it's entry in our database will be undefined
                Memory.Overmind.ReservedRooms[reservedRooms[i]] = {
                    vision: 0
                }//so define it
            }
        }
        
        //so we'd put the prospector call here...but we want it to always occur AFTER the owned room code
        //so the owned room code needs priority
        
        
        
        
    }
}

module.exports = Overmind;
