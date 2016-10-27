# gnxb.untilDone.js
The JavaScript class helps you to manage interval() object

# Author
Apiwith Potisuk (po.apiwith@gmail.com)

**GNXB**, 2016 All Right Reserved.

# Get Starting
> Important!!: you must pass an object argument that contain parameter `interval: (number of sequential)` to class

Define variables that will hold returned object of new class
```javascript
var a = 0,
	b = 0;
// Group of statements that run every 5 seconds.
var update_high = new gnxb.untilDone({ interval: 5000 });

// Group of statements that run every 1 minutes.
var update_low = new gnxb.untilDone({ interval: 60000 });
```

Add all statements that you want to make interval
```javascript
// Statement #1
update_high.add({
  condition() {
    // Your statement, it will execute every time until return true
    a++;
    console.log('a:' + a);
    
    // This function must have return true or false to make class work correctly
    if (a >= 5) {
      // Return true, to stop your above statement and it will execute done() at once
      return true;
    } else {
      // Return false, to continue loop
      return false;
    }
  },
  done() {
    console.log('a:End');
  }
});

// Statement #2
update_high.add({
  condition() {
    b++;
    console.log('b:' + b);
    return (b >= 3);
  },
  done() {
    console.log('b:End');
  }
});
```

Start the interval when you ready
```javascript
// It will start interval all you added
update_high.start();
```

Result:
```
a:1
b:1

a:2
b:2

a:3
b:3
b:End

a:4

a:5
a:End
```

All intervals will stop itself when `condition()` returned with `true`
Then, there is not have `.stop()` command.


# APIs
- [`.list`](https://github.com/GNXB/gnxb.untilDone.js#list)
- [`.interval`](https://github.com/GNXB/gnxb.untilDone.js#interval)
- [`.add(params)`](https://github.com/GNXB/gnxb.untilDone.js#addparams)
- [`.start()`](https://github.com/GNXB/gnxb.untilDone.js#start)

## `.list`
An array contain all object you added.

## `.interval`
A number of frequency of execute all statement. It is set when passed argument to constructor.

## `.add(params)`
`params` is object contain 2 functions that list below
- `condition()` - The function return `true` when condition is correct and return `false` when codition is incorrect. It will be executed everytime of interval's frequency.
- `done()` - The function will be once executed when `condition()` return `true`.

The structor of params
```javascript
.add({
	condition() {
		// --- Your statements ---
	},
	done() {
		// --- Your statements ---
	}
});
```

## `.start()`
It will start perform interval with frequency rate that you passed to constructor.


# Example in real life
```javascript
var news = true;
update_low.add({
  condition() {
    $.post('news.php', function(res) {
      if (res == 'fail') {
        news = false;
      } else {
        $('#news').html(res);
      }
    });
    
    // NOTE: JavaScript does not wait for ajax's responsing
    return !news;
  },
  done() {
    console.error('Cannot get news feed');
  }
});

$(document).ready(function() {
	update_low.start();
});
```
