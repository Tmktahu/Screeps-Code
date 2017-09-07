//Welcome to Project Colony. The goal of this project is to take a room and colonize it.
//The room will be developed automatically up until a certain point, at which we will manually integrate it into Overmind

var spawningLogic = require('Colony.spawningLogic');

var Colony = {
    run: function() {
        const targetRoom = ['E25N77']; //this is the room to colonize. we will always assume that it is defined
        module.exports.updateDatabase(targetRoom[0]); //here we will update the Colony database
        
        if(Game.rooms[targetRoom] != undefined) {
            if(Game.rooms[targetRoom].controller.level != 0) {
                spawningLogic.run(targetRoom[0]);
            }
        }
        
        module.exports.stateLogic(Memory.Colony[targetRoom[0]].developmentState); //here we get the development state string and send it to the state logic function

    }, 
    
    updateDatabase: function(targetRoom) {
        //here we will define and update the database as needed. we will also determine it's state here
        if(Memory.Colony[targetRoom] == undefined) { //if the element is undefined
            Memory.Colony[targetRoom] = { //define it as an object with the following values
                developmentState: 0,
                
                remoteMiningUpgraders: 0,
                remoteMiningBuilders: 0,
                
                
                //so what we will do is make the creeps themselves swap behaviours based on room development state as needed.
                //so all we need are a miner, builder, upgrader, mover, fueler, and drill archetype
                miners: 0,
                upgraders: 0,
                builders: 0,
                drills: 0,
                movers: 0,
                fuelers: 0,
                
            };
        } else { //otherwise the database entry is defined
            var memPath = Memory.Colony[targetRoom];
            //so update and populate the information.
            //first is determining the room state
            if(Game.rooms[targetRoom] == undefined) { //if we can't see into the room
                memPath.developmentState = 0; //then we haven't colonized it yet
            } else { //otherwise we can see into the room
                memPath.developmentState = Game.rooms[targetRoom].controller.level;
            }
            
            //so what did we learn?
            //we START at state 1 cause we claimed it.
            //always have remote upgraders instead of normal upgraders
            //always have remote builders instead of normal builders
            //only have 2 miners to refuel the base cause we aren't using it's own minerals for now
            //state 4 we get access to a storage, so we can flip to drills then
            //state 5 we get access to two links, so once they are setup we are ready for integration
                //could we write a function that converts all current creep roles to integrated ones?
            
            
            
            //now that we have the development state, we need to determine what level of creeps we want to produce
            if(memPath.developmentState == 0) {
                //state 0 - no vision or not claimed, so we will inform the user that we need the room claimed and produce remote builders and upgraders from the closest owned room
                console.log('Colony needs the room claimed.');
                memPath.remoteMiningUpgraders = 0;
                memPath.remoteMiningBuilders = 0;
            } else if(memPath.developmentState == 1) {
                //state 1 - we'll say spawn is made. fuck it. we shoulds start producing miners, mining builders, and mining upgraders
                memPath.remoteMiningUpgraders = 3;
                memPath.remoteMiningBuilders = 0;
                memPath.miners = 0;
                memPath.upgraders = 0;
                memPath.builders = 0;
                
            } else if(memPath.developmentState == 2) {
                memPath.remoteMiningUpgraders = 3;
                memPath.remoteMiningBuilders = 0;
                memPath.miners = 0;
                memPath.upgraders = 0;
                memPath.builders = 0;
                
            } else if(memPath.developmentState == 3) {
                memPath.remoteMiningUpgraders = 3;
                memPath.remoteMiningBuilders = 0;
                memPath.miners = 0;
                memPath.upgraders = 0;
                memPath.builders = 0;
                
            } else if(memPath.developmentState == 4) {
                memPath.remoteMiningUpgraders = 3;
                memPath.remoteMiningBuilders = 0;
                memPath.miners = 0;
                memPath.upgraders = 0;
                memPath.builders = 0;
                
            } else if(memPath.developmentState == 5) {
                if(Game.rooms[targetRoom].storage == undefined) {
                    memPath.remoteMiningUpgraders = 1;
                    memPath.remoteMiningBuilders = 3;
                    memPath.miners = 0;
                    memPath.upgraders = 0;
                    memPath.builders = 0;
                } else {
                    memPath.remoteMiningUpgraders = 1;
                    memPath.remoteMiningBuilders = 2;
                    memPath.miners = 2;
                    memPath.upgraders = 0;
                    memPath.builders = 0;
                    memPath.drills = 0;
                    memPath.movers = 0;
                }
            }
        }
    },
    
    stateLogic: function(currentState) {
        //here we will take the current state, and based on it we will spawn the required creeps
    }
}

module.exports = Colony;
