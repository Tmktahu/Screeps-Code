var testingModule = {
    run: function() {
        module.exports.foo();
        
        module.exports.bar();
    },
    
    foo: function() {
        console.log("Foo has been run");
    },
    
    bar: function() {
        console.log("Bar has been run");
    },
    
    visualizePaths: function(){
      let Visual = require('visual')
      let colors = []      
      let COLOR_BLACK = colors.push('#000000') - 1
      let COLOR_PATH = colors.push('rgba(255,255,255,0.5)') - 1
      _.each(Game.rooms,(room,name)=>{
        let visual = new Visual(name)
        visual.defineColors(colors)
        visual.setLineWidth = 0.5
        _.each(Game.creeps,creep=>{
          if(creep.room != room) return
          let mem = creep.memory
          if(mem._move){
            let path = Room.deserializePath(mem._move.path)
            if(path.length){
              visual.drawLine(path.map(p=>([p.x,p.y])),COLOR_PATH,{ lineWidth: 0.1 })
            }
          }
        })
        visual.commit()
      })
    }
}

module.exports = testingModule;
