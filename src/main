//================ REVAMP THE BUILDER SPAWNING SO EACH SECTOR BUILDS FOR ITSELF =================


const profiler = require('screeps-profiler');
profiler.enable();

var monitor = require('Monitor');

require('Universal.roomFunctions')();
require('Universal.spawnFunctions')();

var combatMelee = require('combat.Melee');

var turretDef = require('turret.Defense');

var testingModule = require('testing');
var links = require('structure.Links');

var projectColony = require('project.colony');
var Overmind = require('Overmind');
var Drone = require('Overmind.drone');
var Prospector = require('project.Prospector');
var notReallyAMedic = require('role.Medic');
var Prospector = require('Overmind.Prospector');

var Oracle = require('Oracle');

var tempThief = require('temp.Thief');

var Bastion = require('Bastion');
var defenderLogic = require('Bastion.defenderLogic');
var Blitzkrieg = require('Blitzkrieg');
var Colony = require('Colony');
var ColonyCreepLogic = require('Colony.creepLogic');

var Eyepiece = require('Eyepiece');
var Alchemist = require('Alchemist');
var Thrift = require('project.Thrift');

module.exports.loop = function() { //this takes our FUNCTION and sticks it into the 'loop' variable, which is executed every tick
    try {
    profiler.wrap(function() {
        
        //Thrift.sellAllMinerals('E29N76');
        //Thrift.sellAllMinerals('E28N75');
        
        if(Memory.tempBoolean == true) {
            var thieves = _.filter(Game.creeps, (creep) => creep.memory.role == 'thief');
            if(thieves.length < 0) {
                Game.spawns['Tanis'].createCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'thief'});
                console.log('making a thief');
            }
        }
        
        Overmind.controlSwarm();
        
        Oracle.run();
        Bastion.run();
        
        monitor.run();
        turretDef.run();
        links.sendEnergy(Game.getObjectById('587f240bec3c8f120658ad86'), Game.getObjectById('587f2cce0f279b3f2a5fcbcb'));
        links.sendEnergy(Game.getObjectById('587f2fe34e207ab64da8ed4a'), Game.getObjectById('587f2cce0f279b3f2a5fcbcb'));
        
        links.sendEnergy(Game.getObjectById('587e16508401d157386edbcd'), Game.getObjectById('587f3e6030f1b699495fda20'));
        links.sendEnergy(Game.getObjectById('588889c58d49f97e3d35d45d'), Game.getObjectById('587f3e6030f1b699495fda20'));

        links.sendEnergy(Game.getObjectById('5899d9f40c3269454951e1b0'), Game.getObjectById('5899b7796dbfa0ab433f2b12'));
        links.sendEnergy(Game.getObjectById('58a3efa826fb73bd093b33be'), Game.getObjectById('5899b7796dbfa0ab433f2b12'));

        links.sendEnergy(Game.getObjectById('58a8043c7fc585345c2c271d'), Game.getObjectById('58a818f04fd68e6611b90623'));
        links.sendEnergy(Game.getObjectById('58b22aba10c094b021c7442d'), Game.getObjectById('58a818f04fd68e6611b90623'));
        
        links.sendEnergy(Game.getObjectById('58c872aa0727a58739392525'), Game.getObjectById('58c895ab856fe25956f4fc4a'));
        
        Colony.run();
        
        Blitzkrieg.spawningLogic();
        
        try {
            Eyepiece.roomOverview();
        } catch(e) {
            console.log(e);
        }
        
        var terminalManagerDude = _.filter(Game.spawns['Tanis'].room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'terminalManager').length;
        if(terminalManagerDude < 0) {
            console.log('making a terminal manager');
            Game.spawns['Tanis'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'terminalManager', state: 'collecting'});
        }
        
        var meleeDudes = _.filter(Game.creeps, (creep) => creep.memory.role == 'melee');
        if(meleeDudes.length < 0) {
            //var dudeTimeLeft = meleeDudes[0].ticksToLive;
            var dudeTimeLeft = 100;
            if(dudeTimeLeft < 150) {
                //Game.spawns['Tanis'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL], undefined, {role: 'melee', state: 'attack'});
                Game.spawns['Tanis'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL, HEAL], undefined, {role: 'melee', state: 'attack'});
                console.log('making an attacker dude');
            }
        }
        
        var notReallyMedics = _.filter(Game.creeps, (creep) => creep.memory.role == 'medic');
        if(notReallyMedics.length < 0) {
            Game.spawns['Tanis'].createCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'medic'});
            console.log('making a not really medic dude');
        }
        
        Alchemist.run();
        
        var ownedRoomsRoles = ['drill', 'mover', 'upgrader', 'builder', 'fueler', 'fortifier', 'emergencyMiner', 'janitor', 'mineralMiner', 'cleaner'];
        var reservedRoomsRoles = ['reserver', 'remoteMiner', 'remoteBuilder', 'remoteJanitor', 'remoteDrill', 'remoteHauler'];
        var defenderRoles = ['meleeDefender', 'rangedDefender', 'healer', 'tank', 'guard'];
        var blitzkriegRoles = ['sieger', 'barbarian'];
        var colonyRoles = ['colonyClaimer', 'colonyRemoteBuilder', 'colonyRemoteUpgrader', 'colonyMiner', 'colonyUpgrader', 'colonyBuilder', 'colonyDrill', 'colonyMover', 'colonyFueler'];
        var alchemistRoles = ['terminalManager'];
        
        //for each creep, based on it's role, tell it what module to execute
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            //Eyepiece.creepIcons(creep);
            
            if(ownedRoomsRoles.indexOf(creep.memory.role) != -1) {
                Drone.followOrders(creep);
            } else if(reservedRoomsRoles.indexOf(creep.memory.role) != -1) {
                Prospector.coreLogic(creep);
            }
            
            if(defenderRoles.indexOf(creep.memory.role) != -1) {
                defenderLogic.coreLogic(creep);
            }
            
            if(blitzkriegRoles.indexOf(creep.memory.role) != -1) {
                Blitzkrieg.creepLogic(creep);
            }
            
            if(colonyRoles.indexOf(creep.memory.role) != -1) {
                ColonyCreepLogic.run(creep);
            }
            
            if(alchemistRoles.indexOf(creep.memory.role) != -1) {
                Alchemist.terminalManagerLogic(creep);
            }
            
            if(creep.memory.role == 'thief') {
                tempThief.run(creep);
            }
            if(creep.memory.role == 'melee') {
                combatMelee.run(creep);
            }
            if(creep.memory.role == 'medic') {
                notReallyAMedic.run(creep);
            }
        }
    });
    } catch(e) {
        console.log(e.stack);
        Game.notify("There is an error that prevented the code from running at time "+Game.time, 0);
    }
}

