module.exports = function() {
    StructureSpawn.prototype.createColonyRemoteUpgrader =
    function(targetRoom) {
        //this one will be made by an already-established base
        return this.createCreep(
            [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 
            this.generateName('colonyRemoteUpgrader'), {role: 'colonyRemoteUpgrader', state: 'traveling', targetRoom: targetRoom});
    },
    
    StructureSpawn.prototype.createColonyRemoteBuilder =
    function(targetRoom) {
        //this one will be made by an already-established base
        return this.createCreep(
            [WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
            MOVE, MOVE, MOVE, MOVE, MOVE,  MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 
            this.generateName('colonyRemoteBuilder'), {role: 'colonyRemoteBuilder', state: 'traveling', targetRoom: targetRoom});
    },
    
    StructureSpawn.prototype.createColonyMiner =
    function() {
        //basic miner...mines, delivers to spawn and extensions
        var body = [];
        var numSections = Math.floor(this.room.energyAvailable / 200);
        for(i = 0; i < numSections; i++) {
            body.push(MOVE);
            body.push(CARRY);
            body.push(WORK);
        }
        return this.createCreep(body, this.generateName('colonyMiner'), {role: 'colonyMiner', state: 'mining'});
    },
    
    StructureSpawn.prototype.createColonyUpgrader =
    function() {
        //modular. starts as mining, then goes to grab from dropped resources or containers, then grabs from storage
        var body = [];
        var numSections = Math.floor(this.room.energyCapacityAvailable / 200);
        for(i = 0; i < numSections; i++) {
            body.push(MOVE);
            body.push(CARRY);
            body.push(WORK);
        }
        return this.createCreep(body, this.generateName('colonyUpgrader'), {role: 'colonyUpgrader', state: 'mining'});
    },
    
    StructureSpawn.prototype.createColonyBuilder =
    function() {
        //modular. starts as mining, then goes to grab from dropped resources or containers, then grabs from storage
        var body = [];
        var numSections = Math.floor(this.room.energyCapacityAvailable / 200);
        for(i = 0; i < numSections; i++) {
            body.push(MOVE);
            body.push(CARRY);
            body.push(WORK);
        }
        return this.createCreep(body, this.generateName('colonyBuilder'), {role: 'colonyBuilder', state: 'mining'});
    },
    
    StructureSpawn.prototype.createColonyDrill =
    function(assignedSource) {
        //basic dril from the start, 5 work and 1 move, then gains more move till it's maxed
        var body = [WORK, WORK, WORK, WORK, WORK, MOVE, CARRY];
        return this.createCreep(body, this.generateName('colonyDrill'), {role: 'colonyDrill', state: 'mining', targetSource: assignedSource});
    },
    
    StructureSpawn.prototype.createColonyMover =
    function(partnerDrill) {
        var potentialEnergy = this.room.energyAvailable;
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
        
        return this.createCreep(creepBody, this.generateName('colonyMover'), {role: 'colonyMover', homeRoom: this.room.name, partnerDrillName: partnerDrill});
    },
    
    StructureSpawn.prototype.createColonyFueler =
    function(targetRoom) {
        //normal fueler. by now there is a storage
    }
};
