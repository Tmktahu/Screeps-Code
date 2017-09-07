module.exports = function() {
    StructureSpawn.prototype.createMeleeDefender = 
    function(targetRoomName) {
        return this.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
        this.generateName('meleeDefender'), {role: 'meleeDefender', state: 'traveling', targetRoomName: targetRoomName});
    },
    
    StructureSpawn.prototype.createRangedDefender =
    function(targetRoomName) {
        return this.createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
        RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK,
        HEAL, HEAL],
        this.generateName('rangedDefender'), {role: 'rangedDefender', state: 'traveling', targetRoomName: targetRoomName});
    },
    
     StructureSpawn.prototype.createHealer =
    function(targetRoomName) {
        return this.createCreep([MOVE, MOVE, MOVE, MOVE, HEAL, HEAL, HEAL, HEAL], this.generateName('healer'), {role: 'healer', state: 'traveling', targetRoomName: targetRoomName});
    },
    
     StructureSpawn.prototype.createTank =
    function(targetRoomName) {
        //the body of a melee defender will be 
        //once we are in the room, attack enemy creeps
        
        //for now we will use high-damage melee creeps
    }
    
    StructureSpawn.prototype.createGuard =
    function(targetRoomName) {
        return this.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                ATTACK, ATTACK, ATTACK, ATTACK, 
                                HEAL, HEAL],
            this.generateName('guard'), {role: 'guard', state: 'traveling', targetRoomName: targetRoomName});
    }
};
