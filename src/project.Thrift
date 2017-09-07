//This itteration of Ptoject Thrift will be for the market code..we may keep the name this time
//we will be designing market code and logic, along with calcuations to try and make money off the market

var Thrift = {
    
    //so we want to make money
    
    //all transactions require a certain amount of energy to transfer resources from one room to another
    //the person who COMPLETES the transation pays this amount, so to make the most money we'd want OTHER people to buy and sell from/to us
    
    //creating any order is subject to a 5% fee in credits
    
    //energy cost to transfer between rooms
    //Math.ceil( amount * (Math.log(0.1*linearDistanceBetweenRooms + 0.9) + 0.1) )
    
    //at 10 rooms away it's a 40% energy tax on the transfer. holy shit. so LOW volume and LOW distance is what we are aiming for if we need to pay the energy cost
    
    
    //so now im wondering if it's possible to make money off of 'station trading'
    //it should be if we don't pay any costs ourselves. we would have a buy order for a certain amount, and adjust it as needed
    //then we would have a sell order that sells for higher.
        //the best mineral for this is going to be someting with a high margin and volume movement
        //in addition we need to figure out how to get our order on top of the list
        
        
    sellAllMinerals: function(targetRoom) {
        var targetTerminal = Game.rooms[targetRoom].terminal;
        //console.log('running', targetTerminal);
        if(targetTerminal != undefined) {
            for(mineralType in targetTerminal.store) {
                //console.log(mineralType);
                if(mineralType != RESOURCE_ENERGY) {
                    //console.log(mineralType, 'is not energy');
                    var orderList = Game.market.getAllOrders((order) => order.type == ORDER_BUY && order.resourceType == mineralType);
                    
                    //start going down the list of orders by the ones paying us the most. check the energy cost and if it's under a value, make the trade.
                    var bestPriceOrder = _.sortBy(orderList, 'price')[0];
                    //console.log('order id:', bestPriceOrder.id);
                    var energyCost = Game.market.calcTransactionCost(500, targetRoom, bestPriceOrder.roomName);
                    console.log('energy cost:', energyCost);
                    
                    if(energyCost < 5000) {
                        var result = Game.market.deal(bestPriceOrder.id, 500, targetRoom);
                        console.log('Selling 500', mineralType, 'result =', result);
                    }
                }
            }
        }
    }
    
    
    
}


module.exports = Thrift;
