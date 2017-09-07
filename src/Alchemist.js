//Welcome to Project Alchemist. This project will handle mineral reactions and general economy stuff.

var Alchemist = {
    run: function() {
        module.exports.globalStorage();
    },
    
    globalStorage: function() {
        //so in here, we will manage the storage of each room
        //if a room's storage gets too low, then we will transfer energy to that room which
            //to do this, we need to keep track of every room's storage
            //if a room gets below a certain value, (500,000 maybe)
                //get our special terminal manager dudes in each other room to put energy from their storage into their terminal
                //then transfer energy from their terminals to the target room's terminal
                //then have that target room's terminal manager dude take the energy and put it in storage
                
        //we will need checks to make sure that a room doesn't drop below the desired capacity when trying to help another room
        //we will also need to keep in mind the cost for transfering energy. In our case it shouldn't be too nuts
        
        //in building placement, idealy the terminal should be right next to the storage. can we do this?
        
        
        var roomsThatNeedEnergy = _.filter(Game.rooms, (room) => room.storage != undefined && room.storage.store[RESOURCE_ENERGY] < 400000); //add in a check for how much energy is in the terminal as well
        if(roomsThatNeedEnergy.length) {
            //set all the terminal managers in ONE of the rooms to receive energy from the terminal
            for(creepName in Game.creeps) {
                if(Game.creeps[creepName].room.name == roomsThatNeedEnergy[0].name && Game.creeps[creepName].memory.role == 'terminalManager') {
                    Game.creeps[creepName].memory.job = 'receivingEnergy';
                }
            }
            
            //set all the terminal managers in the rest of the rooms to send energy via the terminal
            var energyDonaters = _.filter(Game.rooms, (room) => room.storage != undefined && room.storage.store[RESOURCE_ENERGY] > 500000);
            for(i = 0; i < energyDonaters.length; i++) {
                for(creepName in Game.creeps) {
                    if(Game.creeps[creepName].room.name == energyDonaters[i].name && Game.creeps[creepName].memory.role == 'terminalManager') {
                        Game.creeps[creepName].memory.job = 'sendingEnergy';
                    }
                }
            }
            
            module.exports.terminalLogic(roomsThatNeedEnergy[0], energyDonaters);
            //once the creeps are set to the correct mode, then we need to get the terminals to send the energy to the right room
            //we should pull up the cost formula and figure out how much it'll cost us to send energy....hopefully it wont be much
            //technically, the rate at which we send and recieve energy is irrelavent because ill still end up paying the same
                //total percentage of the energy to send it
        } else {
            //set every room's terminal manager to idle
            for(creepName in Game.creeps) {
                if(Game.creeps[creepName].memory.role == 'terminalManager' && Game.creeps[creepName].memory.job != 'idle') {
                    Game.creeps[creepName].memory.job = 'idle';
                    Game.creeps[creepName].memory.state = 'idle';
                }
            }
        }
    },
    
    terminalManagerLogic: function(creep) {
        //so here we will have jobs, and then states within the jobs
        if(creep.memory.job == 'idle') { //if we currently don't have a job
            if(creep.room.terminal != undefined && creep.room.terminal.store[RESOURCE_ENERGY] < 20000) {
                if(creep.carry.energy < creep.carryCapacity) {
                    if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                } else {
                    if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    }
                }
            }
            creep.memory.state = 'idle';
        }
        
        if(creep.memory.job == 'receivingEnergy') { //we are receiving energy from other rooms
            if(creep.memory.state == 'idle') {
                creep.memory.state = 'collecting';
            }
            
            if(creep.memory.state == 'collecting') {
                if(creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
                
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.state = 'delivering';
                }
            }
            
            if(creep.memory.state == 'delivering') {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
                
                if(creep.carry.energy == 0) {
                    creep.memory.state = 'collecting';
                }
            }
        }
        
        if(creep.memory.job == 'sendingEnergy') { //we are sending energy to other rooms
            if(creep.memory.state == 'idle') {
                creep.memory.state = 'collecting';
            }
            
            if(creep.memory.state == 'collecting') {
                if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
                
                if(creep.carry.energy == creep.carryCapacity) {
                    creep.memory.state = 'delivering';
                }
            }
            
            if(creep.memory.state == 'delivering') {
                if(creep.room.terminal != undefined && creep.room.terminal.store[RESOURCE_ENERGY] < 20000) {
                    if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    }
                }
                
                if(creep.carry.energy == 0) {
                    creep.memory.state = 'collecting';
                }
            }
        }
        
        if(creep.memory.job == 'fixingTerminal') {
            if(creep.memory.state == 'idle') {
                creep.memory.state = 'unloading';
            }
            //remove shit till there is like 5000 room
            //fill it with energy until there is like 10000 room
            //clean up crap
            if(creep.memory.state == 'unloading') {
                if(creep.carry.L != creep.carryCapacity) {
                    if(creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    }
                } else {
                    creep.drop(RESOURCE_LEMERGIUM, creep.carryCapacity);
                }
                
                if(_.sum(creep.room.terminal.store) < (creep.room.terminal.storeCapacity - 5000)) {
                    creep.memory.state = 'fillingWithEnergy';
                }
            }
            
            if(creep.memory.state == 'fillingWithEnergy') {
                if(creep.carry.energy < creep.carryCapacity) {
                    if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage);
                    }
                } else {
                    if(creep.transfer(creep.room.terminal, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.terminal);
                    }
                }
                
                if(creep.room.terminal.store[RESOURCE_ENERGY] > 5000 && _.sum(creep.room.terminal.store) < creep.room.terminal.storeCapacity - 10000) {
                    creep.memory.state == 'cleaning';
                }
            }
            
            if(creep.memory.state == 'cleaning') {
                var droppedMinerals = creep.room.find(FIND_DROPPED_RESOURCES);
                if(droppedMinerals.length) {
                    if(_.sum(creep.carry) != creep.carryCapacity) {
                        if(creep.pickup(droppedMinerals[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(droppedMinerals[0]);
                        }
                    } else {
                        if(creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.terminal);
                        }
                    }
                } else {
                    creep.memory.job = 'idle';
                    creep.memory.state = 'idle';
                }
            }
        }
    },
    
    terminalLogic: function(targetRoom, donatingRooms) {
        console.log('terminal donater room name:', targetRoom.terminal);
        //so here we want to send energy to the room that we selected earlier
        for(k = 0; k < donatingRooms.length; k++) {
            if(donatingRooms[k].terminal != undefined && targetRoom.terminal != undefined && targetRoom.terminal.store[RESOURCE_ENERGY] < 20000) {
                if(donatingRooms[k].terminal.store[RESOURCE_ENERGY] > 500) {
                    donatingRooms[k].terminal.send(RESOURCE_ENERGY, 500, targetRoom.name);
                }
            }
        }
    }
}



module.exports = Alchemist;
