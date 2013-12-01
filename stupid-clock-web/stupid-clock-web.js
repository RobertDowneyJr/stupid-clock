
if (Meteor.isClient) {
  var clockDep = new Deps.Dependency();
  var clockInterval;
  var currentTimeString;
  /* Create clock settings */
  function updateClock(){
	var currTime = new Date();
	var currentHours = currTime.getHours();
	var currentMinutes = currTime.getMinutes();
	var currentSeconds = currTime.getSeconds();
	currentMinutes = (currentMinutes < 10? "0":"")+currentMinutes;
	currentSeconds = (currentSeconds < 10? "0":"")+currentSeconds;
	var timeOfDay = (currentHours < 12)? "AM":"PM";
	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
	currentHours = ( currentHours == 0 ) ? 12 : currentHours;
	currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
	clockDep.changed();
  };
    
  Template.main.created = function(){ /* Updates the clock in regular interval of 1 sec */
	updateClock();
	clockInterval = Meteor.setInterval(updateClock, 1000);
  };
  Template.main.currTime = function(){
	clockDep.depend();
	return currentTimeString;
  };
  Template.main.destroyed = function(){ /* Meteor way of resetting the interval method */
	Meteor.clearInterval(clockInterval);
  }

  Template.main.events({ /* Sample event handler */
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) { /* Sample server handler */
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
