var turretDef = {
    run: function() {
        var allTowers = _.filter(Game.structures, (tower) => tower.structureType == STRUCTURE_TOWER);
        
        for(i = 0; i < allTowers.length; i++) {
            var allStructures = allTowers[i].room.find(FIND_STRUCTURES);
            
            //var allStructures = tower.room.find(FIND_STRUCTURES);
            var walls = _.filter(allStructures, (structure) => (structure.structureType == STRUCTURE_RAMPART || structure.structureType == STRUCTURE_WALL) && (structure.hits < 1000000 && structure.hits > 950000) || (structure.hits < 1000));
            var otherStructures = _.filter(allStructures, (structure) => (structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL) && structure.hits < structure.hitsMax);
            var enemies = allTowers[i].room.find(FIND_HOSTILE_CREEPS);
        
            if(enemies.length) {
                let targetEnemy = allTowers[i].pos.findClosestByRange(enemies);
                allTowers[i].attack(targetEnemy);
            } else if(otherStructures.length && allTowers[i].energy > 300) {
                let targetRepair = allTowers[i].pos.findClosestByRange(otherStructures);
                allTowers[i].repair(targetRepair);
            } else if(walls.length && allTowers[i].energy > 300) {
                allTowers[i].repair(walls[0]);
            }
        }
    }
}

module.exports = turretDef;
