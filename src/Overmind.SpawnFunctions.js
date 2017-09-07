module.exports = function() {
    StructureSpawn.prototype.createRemoteDrill = 
    function(targetRoom) {
        //remote drills will be 3 WORK parts and 3 MOVE parts
        //total 450 energy
        
        if(this.room.energyAvailable > 750) {
            return this.createCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, MOVE], this.generateName('remoteDrill'), {role: 'remoteDrill', state: 'traveling', targetRoom: targetRoom});
        }
    },
    
    StructureSpawn.prototype.createRemoteHauler = 
    function(targetRoom, homeRoom, targetSource, numCarryPieces) {
        //haulers should be 20 carry, 21 move, and 1 work (for repairing roads)
        //total 2150 energy
        var body = [];
        
        for(i = 0; i < numCarryPieces; i++) {
            body.push(CARRY);
            body.push(MOVE);
        }
        body.push(MOVE);
        body.push(WORK);
            
        return this.createCreep(body, this.generateName('remoteHauler'), {role: 'remoteHauler', state: 'collecting', targetRoom: targetRoom, homeRoom: homeRoom, targetSource: targetSource});
    },
    
    StructureSpawn.prototype.createEmergencyMiner = 
    function() {
        var body = [];
        var availableEnergy = this.room.energyAvailable;
        
        var numPieces = Math.floor(availableEnergy / 200);
        for(i = 0; i < numPieces; i++) {
            body.push(WORK);
            body.push(CARRY);
            body.push(MOVE);
        }
        
        if(body.length) {
            return this.createCreep(body, this.generateName('emergencyMiner'), {role: 'emergencyMiner', state: 'mining'});
        }
    },
    
    StructureSpawn.prototype.createRemoteMiner =
    function(numberOfCarryParts, home, target) {
        var body = [];
        
        var numCarry = numberOfCarryParts;
        var numWork = Math.ceil(numCarry / 4);
        var numMove = numCarry + numWork
        
        //if ou potential energy capacity is at a certain amount, spawen the specific dude
        
        for(i = 0; i < numWork; i++) {
            body.push(WORK);
        }
        
        for(i = 0; i < numCarry; i++) {
            body.push(CARRY);
        }
        
        for(i = 0; i < numMove; i++) {
            body.push(MOVE);
        }
        
        return this.createCreep(body, this.generateName('remoteMiner'), {role: 'remoteMiner', state: 'remoteMining', homeRoom: home, targetRoom: target});
    },
    
    StructureSpawn.prototype.createRemoteBuilder =
    function(ownedRoom) {
        var body = [];
        
        var numCarry = 8;
        var numWork = Math.ceil(numCarry / 4);
        var numMove = numCarry + numWork
        
        //if ou potential energy capacity is at a certain amount, spawen the specific dude
        
        for(i = 0; i < numWork; i++) {
            body.push(WORK);
        }
        
        for(i = 0; i < numCarry; i++) {
            body.push(CARRY);
        }
        
        for(i = 0; i < numMove; i++) {
            body.push(MOVE);
        }
        
        return this.createCreep(body, this.generateName('remoteBuilder'), {role: 'remoteBuilder', state: 'active', homeRoom: ownedRoom});
    },
    
    StructureSpawn.prototype.createRemoteJanitor =
    function(targetRoom) {
        var body = [];
        
        var numCarry = 8;
        var numWork = Math.ceil(numCarry / 4);
        var numMove = numCarry + numWork
        
        //if ou potential energy capacity is at a certain amount, spawen the specific dude
        
        for(i = 0; i < numWork; i++) {
            body.push(WORK);
        }
        
        for(i = 0; i < numCarry; i++) {
            body.push(CARRY);
        }
        
        for(i = 0; i < numMove; i++) {
            body.push(MOVE);
        }
        
        return this.createCreep(body, this.generateName('remoteJanitor'), {role: 'remoteJanitor', state: 'traveling', targetRoom: targetRoom});
    },
    
    StructureSpawn.prototype.createMover =
    function(partnerDrill) {
        var potentialEnergy = this.room.energyCapacityAvailable;
        var creepBody = [];
        //movers shouldn't be able to DO anything, just move stuff, so no work pieces
        //for every carry piece, have a move piece
        
        //a mover only has to be so big though. so while the potential energy is below a certain value, generate the body
        //otherwise, we've hit our max, so just generate a set one
        
        if(potentialEnergy < 1000) {
            var numberOfSections = Math.floor(potentialEnergy / 100);
            for(i = 0; i < numberOfSections; i++) {
                creepBody.push(CARRY);
                creepBody.push(MOVE);
            }
        } else {
            creepBody = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];
        }
        
        return this.createCreep(creepBody, this.generateName('mover'), {role: 'mover', homeRoom: this.room.name, partnerDrillName: partnerDrill});
    },
    
    StructureSpawn.prototype.createDrill =
    function(sourceID) {
        var potentialEnergy = this.room.energyCapacityAvailable;
        var creepBody = [];
        //drills should only drill, so no carry parts and we don't need a lot of move parts
        //for every 2 work parts, have a move part?
        
        //max 5 work parts, that's 500 for the works, and 5 move parts is 250, so 750 max energy
        //one section is 150
        
        if(potentialEnergy < 500) {
            var numberOfSections = Math.floor((potentialEnergy - 50) / 100);
            for(i = 0; i < numberOfSections; i++) {
                creepBody.push(WORK);
                creepBody.push(MOVE);
            }
            creepBody.push(CARRY);
        } else {
            creepBody = [MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, MOVE, WORK, CARRY];
        }
        
        return this.createCreep(creepBody, this.generateName('drill'), {role: 'drill', homeRoom: this.room.name, assignedSource: sourceID});
    },
    
    StructureSpawn.prototype.createMineralMiner =
    function() {
        return this.createCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], this.generateName('mineralMiner'), {role: 'mineralMiner', state: 'mining'});
    },
    
    StructureSpawn.prototype.createUpgrader =
    function() {
        var potentialEnergy = this.room.energyCapacityAvailable;
        var creepBody = [];
        //upgraders should be like builders, but the ideal upgrader is stationary, though move parts are cheap so fuck it
        //make them like the builders for now
        
        if(potentialEnergy < 1000) {
            var numberOfSections = Math.floor((potentialEnergy - 50) / 150);
            for(i = 0; i < numberOfSections; i++) {
                creepBody.push(WORK);
                creepBody.push(MOVE);
            }
            creepBody.push(CARRY);
            creepBody.push(CARRY);
        } else {
            creepBody = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
                        //,WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        
        return this.createCreep(creepBody, this.generateName('upgrader'), {role: 'upgrader', homeRoom: this.room.name});
    },
    
    StructureSpawn.prototype.createFortifier =
    function() {
        var potentialEnergy = this.room.energyCapacityAvailable;
        var creepBody = [];
        //builders need to move, carry, and work
        //one move part per piece
        
        if(potentialEnergy < 1000) {
            var numberOfSections = Math.floor(potentialEnergy / 300);
            for(i = 0; i < numberOfSections; i++) {
                creepBody.push(WORK);
                creepBody.push(CARRY);
                creepBody.push(CARRY);
                creepBody.push(MOVE);
                creepBody.push(MOVE);
            }
        } else {
            creepBody = [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];
        }
        
        return this.createCreep(creepBody, this.generateName('fortifier'), {role: 'fortifier', homeRoom: this.room.name});
    },
    
    StructureSpawn.prototype.createJanitor =
    function() {
        var potentialEnergy = this.room.energyCapacityAvailable;
        var creepBody = [];
        //upgraders should be like builders, but the ideal upgrader is stationary, though move parts are cheap so fuck it
        //make them like the builders for now
        
        if(potentialEnergy < 500) {
            var numberOfSections = Math.floor(potentialEnergy / 250);
            for(i = 0; i < numberOfSections; i++) {
                creepBody.push(WORK);
                creepBody.push(CARRY);
                creepBody.push(MOVE);
                creepBody.push(MOVE);
            }
        } else {
            creepBody = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
        }
        
        return this.createCreep(creepBody, this.generateName('janitor'), {role: 'janitor', homeRoom: this.room.name});
    },
    
    StructureSpawn.prototype.createFueler =
    function() {
        var potentialEnergy = this.room.energyAvailable;
        var creepBody = [];
        //movers shouldn't be able to DO anything, just move stuff, so no work pieces
        //for every carry piece, have a move piece
        
        if(potentialEnergy < 1000) {
            var numberOfSections = Math.floor(potentialEnergy / 100);
            for(i = 0; i < numberOfSections; i++) {
                creepBody.push(CARRY);
                creepBody.push(MOVE);
            }
        } else {
            creepBody = [MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY];
        }
        
        return this.createCreep(creepBody, this.generateName('fueler'), {role: 'fueler', homeRoom: this.room.name});
    },
    
    StructureSpawn.prototype.createTerminalManager = 
    function() {
        var body = [];
        
        body = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
        
        return this.createCreep(body, this.generateName('terminalManager'), {role: 'terminalManager', job: 'idle', state: 'idle'});
    }
};
