// Import the UI elements
var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings'); // https://developer.getpebble.com/docs/pebblejs/#settings

// Settings.option('authorization', "Basic ********");  // put your base64 credentials here once (https://www.base64encode.org/)

// Make a list of menu items
var loxCommands = [
  {
    title: "Licht Arbeitszimmer", 
    subtitle: "Toggle"
  },
  {
    title: "Betriebsmodus",
    subtitle: "> Modus auswählen"
  },
  {
    title: "Jalousien auff",
    subtitle: "Alle Jalousien öffnen"
  },
  {
    title: "Jalousien zu",
    subtitle: "Alle Jalousien schließen"
  }
];

// Create the Menu, supplying the list of fruits
var loxMenu = new UI.Menu({
  sections: [{
    title: 'LoxControl',
    items: loxCommands
  }]
});



// Display to the user
loxMenu.show();


// Add a click listener for select button click
loxMenu.on('select', function(event) {
  console.log('Menu selected: ' + event.itemIndex);
  if (event.itemIndex == 0)
    {
      ajax({url: 'http://192.168.200.19/dev/sps/io/Arbeitszimmer/Impuls', type: 'json', 
            headers:{Authorization: Settings.option('authorization') } 
           },
        function(json) {
          // Data is supplied here
      
        },
        function(error) {
          console.log('Ajax failed: ' + error);
        }
      );
      
    } else {
  
      // Show a card with clicked item details
      var detailCard = new UI.Card({
        title: loxCommands[event.itemIndex].title,
        body: loxCommands[event.itemIndex].subtitle
      });
    
      // Show the new Card
      detailCard.show();
      
    }
});

