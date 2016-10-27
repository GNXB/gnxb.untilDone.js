/**
  * [class]
  * GNXB 2016 All Right Reserved
  * Author: Apiwith Potisuk (po.apiwith@gmail.com)
  * Version: 1.0.0
*/

// Check for Namespace
if (!gnxb) {
    var gnxb = {};
}

// [Class]
gnxb.untilDone = function(argv) {
    if (!argv) { argv = {}; }
    
    // If argv.interval is not passed
    if (!argv.interval) {
        argv.interval = 1000;
    }
    
    var _this = this;
    
    // [Public] Define Variables
    _this.list = [];
    _this.interval = argv.interval;
    
    // [Public] add()
    _this.add = function(params) {
        /*
        params = {
            condition: Function,
            done: Function
        }
        */
        
        if (!(params.condition && params.done)) {
            return false;
        }
        
        _this.list.push({
            condition: params.condition,
            done: params.done
        });
    };
    
    // [Public] start()
    _this.start = function() {
        var removelist = [];
        for (var i=0; i<_this.list.length; i++) {
            if (_this.list[i].condition() == true) {
                _this.list[i].done();
                removelist.push(i);
            }
        }
        
        remove(removelist);
        
        if (_this.list.length > 0) {
            setTimeout(_this.start, _this.interval);
        }
    };
    
    // [Private] remove()
    function remove(indexes) {
        for (var i=0; i<indexes.length; i++) {
            _this.list.splice(indexes[i], 1);
            
            // decrease all following index by one
            for (var j=i+1; j<indexes.length; j++) {
                indexes[j]--;
            }
        }
    }
};