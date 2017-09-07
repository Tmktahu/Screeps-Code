//Welcome to Project Eyepiece. This project will handle all added visual effects.

var Eyepiece = {
    run: function() {
        
        //so what would we like to add?
        
        //perhaps a "room overview" centered at a location that has lots of natural walls clumped together
            //room storage amount
            //RCL
            //vision?
            //owner and owner GCL?
            //allied or enemy? will require our alliance system to be in place
        
        
        //creep paths
        
        //spawn current building project
        
        //creep type icons!!!!!!!!!
        
        
        
    },
    
    roomOverview: function() {
        //we are just going to do this for owned rooms for now
        
        for(name in Memory.Overmind.OwnedRooms) {
            if(Game.rooms[name] != undefined) {
                var theRoom = Game.rooms[name];
                var targetCoords = Memory.Overmind.OwnedRooms[name].roomOverviewCoords;
                
                //room storage amount
                //RCL
                
                theRoom.visual.text('Stored Energy : '+theRoom.storage.store[RESOURCE_ENERGY], targetCoords[0]-3, targetCoords[1]+0.2,
                    {color: '#ffff00', size: 0.6, align: 'left'});
                theRoom.visual.text('RCL : '+theRoom.controller.level, targetCoords[0]-3, targetCoords[1]-0.7,
                    {color: '#00ff00', size: 0.6, align: 'left'});
                
            }
        }
        
        
    },
    
    creepIcons: function(creep) {
        var creepType = creep.memory.role;
        
        creep.room.visual.text(creepType, creep.pos.x, creep.pos.y - 0.5, {size: 0.4});
        
        /*switch(creepType) {
            case 'drill':
                creep.room.visual.text(creepType, creep.pos.x, creep.pos.y - 0.5, {size: 0.4});
                break;
            case 'mover':
                creep.room.visual.text('📩', creep.pos.x, creep.pos.y - 0.5);
                break;
            case 'fueler':
                creep.room.visual.text('🔋', creep.pos.x, creep.pos.y - 0.5);
                break;    
            default:
                creep.room.visual.text('™', creep.pos.x, creep.pos.y - 0.5);
                break;
        }*/
        
    }
}

module.exports = Eyepiece;
