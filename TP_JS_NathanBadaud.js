function EventEmitter(){
 // HashMap [ event -> [fn1, fn2, ...] ]
 this.callbacks = {}; 
}

EventEmitter.prototype = {
  //ON
  on: function(event, fn){
    if(!this.callbacks.hasOwnProperty(event)){
        this.callbacks[event] = [];
    }
    this.callbacks[event].push({fun:fn, count:null});
    return this;
    },

  //OFF
  off: function(event, fn){    
    if (event && !fn) {
      console.log("L'event n'a pas de fonction, on supprime l'event");    
      delete this.callbacks[event];
      return this;
    }
    
    else if (event && fn) {
      console.log("L'event comporte une fonction, on supprime la fonction");
      var test = this.callbacks[event].indexOf(fn);
      this.callbacks[event].splice(test, 1);
      return this;
    }
    
    else if (typeof this.callbacks[event] == "undefined"){
      console.log("La fonction n'a pas d'event, on supprime tout !");
      delete this.callbacks[event];
      return this;
    }
  },

  //EMIT
  emit: function(event, fn){
    if (typeof this.callbacks[event] == "undefined"){
      console.log("Cette fonction n'a pas d'event");
      return this;
    }
    
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    if(this.callbacks.hasOwnProperty(event)){
      this.callbacks[event].forEach(function(item){
        if (item.count < 1 && item.count !== null){
          console.log('L\'event a déjà été affiché');
        }
        
        else {
          item.fun.apply(this, args);
          if (item.count !== null){
            --item.count;
          }
        }
      });
    return this;
    }
  },
  
  //ONCE
  once: function(event, fn){
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    this.callbacks[event].push({fun:fn, count:1});
    return this;
  },
  
  //TIMES
  times: function(event, fn, timer){
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    this.callbacks[event].push({fun:fn, count:timer});
    return this;
  }
};

var julien   = new EventEmitter();
var fn = console.log.bind(console);

julien.on('event1', fn)
  .on('event2')
  .on(fn)
  
  .off("event1", 1)
  .off("event2")
  .off()


/*julien.on("yeah", function() {console.log('yeah');})
  .once("hey", function() {console.log('hey');})
  .once("oh", function() {console.log('oh');})
  .times("snouf", function() {console.log('snouf');}, 4)
  .emit('hey').emit('hey')
  .emit('oh').emit('oh')
  .emit('yeah').emit('yeah')
  .emit('snouf').emit('snouf').emit('snouf').emit('snouf').emit('snouf').emit('snouf');*/
