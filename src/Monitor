var monitor = {
    run: function() {
        
        //panic mode
        var allStructures = Game.spawns['Tanis'].room.find(FIND_STRUCTURES);
        var walls = _.filter(allStructures, (structure) => structure.structureType == STRUCTURE_WALL);
        var enemies = Game.spawns['Tanis'].room.find(FIND_HOSTILE_CREEPS);
        
        var enemyCreepInRoom;
        if(enemies.length > 0) {
            enemyCreepInRoom = true;
            if(enemies[0].owner.username != 'Invader') {
                Game.notify('I see an enemy creep in '+enemies[0].room.name+' belonging to '+enemies[0].owner.username+' at '+Game.time+'.');
            }
        }
        else {
            enemyCreepInRoom = false;
        }
        
        var panic;
        for(name in Game.creeps) {
            //console.log(Game.creeps[name].hits < Game.creeps[name].hitsMax, '|', enemyCreepInRoom, '|', Game.creeps[name].memory.role);
            if(Game.creeps[name].hits < Game.creeps[name].hitsMax && enemyCreepInRoom && (Game.creeps[name].role == 'upgrader' || Game.creeps[name].memory.role == 'drill')) {
                panic = true;
                break;
            } else {
                panic = false;
            }
        }
        
        if(panic) {
            console.log('PANICING');
            if(Game.rooms['Tanis'].controller.activateSafeMode() == OK) {
                Game.notify('We have activated safe mode in the Home room at tick time '+Game.time+'. Make sure you check the room history.')
            }
        }
    }
}

module.exports = monitor;
