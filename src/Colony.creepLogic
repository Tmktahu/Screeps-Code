var creepLogic = {
    run: function(creep) {
        if(creep.memory.role == 'colonyRemoteBuilder') {
            module.exports.colonyRemoteBuilder(creep);
        } else if(creep.memory.role == 'colonyRemoteUpgrader') {
            module.exports.colonyRemoteUpgrader(creep);
        } else if(creep.memory.role == 'colonyMiner') {
            module.exports.colonyMiner(creep);
        } else if(creep.memory.role == 'colonyUpgrader') {
            module.exports.colonyUpgrader(creep);
        } else if(creep.memory.role == 'colonyBuilder') {
            module.exports.colonyBuilder(creep);
        } else if(creep.memory.role == 'colonyDrill') {
            module.exports.colonyDrill(creep);
        } else if(creep.memory.role == 'colonyMover') {
            module.exports.colonyMover(creep);
        } else if(creep.memory.role == 'colonyFueler') {
            module.exports.colonyFueler(creep);
        } else if(creep.memory.role == 'colonyClaimer') {
            module.exports.colonyClaimer(creep);
        }
    },
    
    colonyRemoteBuilder: function(creep) {
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
                creep.memory.state = 'mining';
            }
        }
        
        if(creep.memory.state == 'mining') {
            if(creep.room.storage == undefined || creep.room.storage.store[RESOURCE_ENERGY] != 0) {
                var sources = creep.room.find(FIND_SOURCES);
                if(sources[1].energy != 0) {
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                } else {
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
            } else {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'building';
            }
        }
        
        if(creep.memory.state == 'building') {
            var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targetSite = creep.pos.findClosestByRange(sites);
            if(creep.build(targetSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSite);
            } else {
                //creep.moveTo(creep.room.storage);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    colonyRemoteUpgrader: function(creep) {
        if(creep.memory.state == 'traveling') {
            if(creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
            } else {
                creep.moveTo(Game.flags[creep.memory.targetRoom]);
                creep.memory.state = 'mining';
            }
        }
        
        if(creep.memory.state == 'mining') {
            if(creep.room.storage == undefined) {
                var sources = creep.room.find(FIND_SOURCES);
                if(sources[1].energy != 0) {
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1]);
                    }
                } else {
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
            } else {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'upgrading';
            }
        }
        
        if(creep.memory.state == 'upgrading') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    colonyMiner: function(creep) {
        if(creep.memory.state == 'mining') {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources[1].energy != 0) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            } else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            var spawns = _.filter(creep.room.find(FIND_MY_SPAWNS), (structure) => structure.energy < structure.energyCapacity);
            var extensions = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity);
            var towers = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < (structure.energyCapacity - 50));
            var allTargets = spawns.concat(extensions.concat(towers));
            
            var specificTarget = creep.pos.findClosestByPath(allTargets);
            if(creep.transfer(specificTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(specificTarget);
            } else {
                creep.moveTo(creep.room.find(FIND_MY_SPAWNS)[0]);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    colonyUpgrader: function(creep) {
        if(creep.memory.state == 'mining') {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources[1].energy != 0) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            } else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'upgrading';
            }
        }
        
        if(creep.memory.state == 'upgrading') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    colonyBuilder: function(creep) {
        if(creep.memory.state == 'mining') {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources[1].energy != 0) {
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            } else {
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            
            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'building';
            }
        }
        
        if(creep.memory.state == 'building') {
            var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targetSite = creep.pos.findClosestByRange(sites);
            if(creep.build(targetSite) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSite);
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'mining';
            }
        }
    },
    
    colonyDrill: function(creep) {
        var assignedSource = Game.getObjectById(creep.memory.targetSource); //get our assigned source
        
        if(creep.harvest(assignedSource) == ERR_NOT_IN_RANGE) { //harvest it
            creep.moveTo(assignedSource); //and if we aren't in range, move to it
        } else {
            var myLink = creep.pos.findInRange(creep.room.find(FIND_MY_STRUCTURES), 1, {
                filter: { structureType: STRUCTURE_LINK }
            }); //FIND THE ADJACENT LINK
            
            if(myLink[0] == undefined) { //if there is not a link nearby
                creep.drop(RESOURCE_ENERGY); //drop the energy into the container
            } else { //otherwise there is a link we can use
                if(creep.transfer(myLink[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) { //put the energy in the link
                    creep.moveTo(myLink[0]);
                }
            }
        }
    },
    
    colonyMover: function(creep) {
        var partnerDrill = Game.creeps[creep.memory.partnerDrillName];
        
        if(partnerDrill != undefined && partnerDrill.memory.role != 'colonyDrill') {
            creep.memory.partnerDrillName = 'none';
        }
        
        if(creep.memory.state == undefined) {
            creep.memory.state = 'collecting';
        }
        
        if(creep.memory.partnerDrillName == undefined || partnerDrill == undefined) {
            creep.memory.partnerDrillName = 'none';
        }
        
        if(partnerDrill != undefined) {
            var links = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_LINK);
            for(var k = 0; k < links.length; k++) {
                var isNextToLink = partnerDrill.pos.isNearTo(links[k].pos);
                if(isNextToLink) {
                    creep.memory.partnerDrillName = 'none';
                    break;
                }
            }
        }
        
        if(creep.memory.state == 'collecting') {
            if(creep.memory.partnerDrillName == 'none') {
                //look for containers with a drill on them. if a mover isn't assigned, assign here
                var roomContainers = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.structureType == STRUCTURE_CONTAINER);
                
                for(var i = 0; i < roomContainers.length; i++) {
                    var creepAtContainer = creep.room.lookForAt(LOOK_CREEPS, roomContainers[i].pos);
                    
                    if(creepAtContainer[0] != undefined) {
                    if(creepAtContainer[0].memory.role == 'colonyDrill') {
                        var creepAssigned = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'colonyMover' && creep.memory.partnerDrillName == creepAtContainer[0].name);
                        
                        if(creepAssigned.length == 0) {
                            creep.memory.partnerDrillName = creepAtContainer[0].name;
                            break;
                        }
                    }
                    }
                }
                
                
            } else if(partnerDrill == undefined) {
                //console.log(creep.name, 'partner doesnt exist');
            } else {
                var targetContainer = _.filter(creep.room.lookForAt(LOOK_STRUCTURES, partnerDrill.pos), (structure) => structure.structureType == STRUCTURE_CONTAINER);
                var droppedEnergy = creep.room.lookForAt(LOOK_RESOURCES, partnerDrill.pos);
                
                if(targetContainer[0] != undefined) { //if there is a container, then the drill is at the right position
                    if(targetContainer[0].store[RESOURCE_ENERGY] == targetContainer[0].storeCapacity) { //if the container is full
                        if(creep.withdraw(targetContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetContainer[0]); //get a load out of it
                        }
                    } else if(droppedEnergy[0] != undefined) { //if there is dropped energy
                        if(creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedEnergy[0]); //grab some of it
                        }
                    } else {
                        if(creep.withdraw(targetContainer[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetContainer[0]); //otherwise just get out of the container
                        }
                    }
                }
            }

            if(creep.carry.energy == creep.carryCapacity) {
                creep.memory.state = 'delivering';
            }
        }
        
        if(creep.memory.state == 'delivering') {
            
            //delivering code goes here
            //put it in storage
            //var roomStorage = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_STORAGE);
            //var upgraderLink = Game.structures[Memory.Overmind.OwnedRooms[creep.room.name].upgraderLink];
            
            var spawn = _.filter(creep.room.find(FIND_MY_SPAWNS), (spawn) => spawn.energy < spawn.energyCapacity);
            var extensions = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity);
            var allTargets = spawn.concat(extensions);
            
            if(allTargets.length > 0) {
                var specificTarget = creep.pos.findClosestByPath(allTargets);
                if(creep.transfer(specificTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(specificTarget);
                }
            } else {
                var towers = _.filter(creep.room.find(FIND_MY_STRUCTURES), (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < 700);
                
                if(towers.length > 0) {
                    if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(towers[0]);
                    }
                } else {
                    if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                }
            }
            
            if(creep.carry.energy == 0) {
                creep.memory.state = 'collecting';
            }
        }
    },
    
    colonyFueler: function(creep) {
        
    },
    
    colonyClaimer: function(creep) {
        if(creep.room.name != creep.memory.targetRoom) { //if we aren't in the room
            creep.moveTo(Game.flags[creep.memory.targetRoom]); //move there
            
        } else { //otherwise, we are in the room
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) { //so try and claim the controller
                creep.moveTo(creep.room.controller); //if we arne't in range, move there
            }
        }
    }
}

module.exports = creepLogic;
