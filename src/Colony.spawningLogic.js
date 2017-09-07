require('Colony.spawnFunctions')();

var spawningLogic = {
    run: function(targetRoom) {
        //remote upgraders
        //remote builders
        //miners
        //upgraders
        //builders
        //drills
        //movers
        //fuelers
        
        //current number of creeps
        numRemoteUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyRemoteUpgrader').length;
        numRemoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyRemoteBuilder').length;
        numMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyMiner').length;
        numUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyUpgrader').length;
        numBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyBuilder').length;
        numDrills = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyDrill').length;
        numMovers = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyMover').length;
        numFuelers = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonyFueler').length;
        
        //then spawn the needed creeps
        var targetSpawn = Game.rooms[targetRoom].find(FIND_MY_SPAWNS)[0];
        var newName;
        
        if(numRemoteUpgraders < Memory.Colony[targetRoom].remoteMiningUpgraders) {
            newName = Game.spawns['Makaan'].createColonyRemoteUpgrader(targetRoom);
            
        } else if(numRemoteBuilders < Memory.Colony[targetRoom].remoteMiningBuilders) {
            newName = Game.spawns['Makaan'].createColonyRemoteBuilder(targetRoom);
        }
        
        if(targetSpawn != undefined && targetSpawn.spawning == null) {
            if(numMiners < Memory.Colony[targetRoom].miners) {
                newName = targetSpawn.createColonyMiner();
                if(newName != -6 && newName != undefined) {
                    console.log(targetSpawn.name, 'Creating Colony Miner:', newName); //and only say that you did once you've done it
                }
                
            } else if(numUpgraders < Memory.Colony[targetRoom].upgraders) {
                newName = targetSpawn.createColonyUpgrader();
                if(newName != -6 && newName != undefined) {
                    console.log(targetSpawn.name, 'Creating Colony Upgrader:', newName); //and only say that you did once you've done it
                }
                
            } else if(numBuilders < Memory.Colony[targetRoom].builders) {
                newName = targetSpawn.createColonyBuilder();
                if(newName != -6 && newName != undefined) {
                    console.log(targetSpawn.name, 'Creating Colony Builder:', newName); //and only say that you did once you've done it
                }
                
            } else if(numDrills < Memory.Colony[targetRoom].drills) {
                var sources = Game.rooms[targetRoom].find(FIND_SOURCES);
                
                for(i = 0; i < sources.length; i++) {
                    
                    var creepAssigned = _.filter(Game.rooms[targetRoom].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'colonyDrill' && creep.memory.targetSource == sources[i].id);
                    //console.log(creepAssigned.length);
                    if(creepAssigned.length == 0) { //if there isn't a creep assigned
                        //spawn a creep, set it's role, set it's assignedSource ID
                        console.log('running');
                        newName = targetSpawn.createColonyDrill(sources[i].id);
                        
                        if(newName != -6 && newName != undefined) {
                            console.log(targetSpawn.name, 'Creating Colony Drill:', newName); //and only say that you did once you've done it
                        }
                    }
                }
                
                
            } else if(numMovers < Memory.Colony[targetRoom].movers) {
                var currentDrills = _.filter(Game.rooms[targetRoom].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'colonyDrill');
                for(j = 0; j < currentDrills.length; j++) {
                    var creepAssigned = _.filter(Game.rooms[targetRoom].find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'colonyMover' && creep.memory.partnerDrillName == currentDrills[j].name);
                    if(creepAssigned.length == 0) { //if there isn't a creep assigned
                    console.log(currentDrills[j].name, 'is the movers partner');
                        //spawn a creep, set it's role, set it's assignedSource ID
                        newName = targetSpawn.createColonyMover(currentDrills[j].name);
                        
                        if(newName != -6 && newName != undefined) {
                            console.log(targetSpawn.name, 'Creating Mover:', newName); //and only say that you did once you've done it
                        }
                    }
                }
                
            } else if(numFuelers < Memory.Colony[targetRoom].fuelers) {
                newName = targetSpawn.createColonyFueler();
                
            }
        }
    }
}

module.exports = spawningLogic;
