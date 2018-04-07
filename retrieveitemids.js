var concur = require('concur-platform');

var options = {
    username:'REPLACE_ME',
    password:'REPLACE_ME',
    consumerKey:'REPLACE_ME'
}

//---------------------------------------------------------------
// Print out how to use
//---------------------------------------------------------------
if (process.argv[2]=='showlist') {
  printLists();
} else if (process.argv[2]=='showlistitems') {
  printListItems(process.argv[3]);
} else {
  console.log('****************************************************');
  console.log('Usage: ');
  console.log(' To show lists, run:');
  console.log('   node retrieveitemids.js showlist ');
  console.log(' To show list items for list, run:');
  console.log('   node retrieveitemids.js showlistitems {listId} ');
  console.log('****************************************************');
}

//---------------------------------------------------------------
// Print the available lists
//---------------------------------------------------------------
function printLists() {
  concur.oauth.native(options)
  .then(function(token) {
      // token will contain the value, instanceUrl, refreshToken, and expiration details
      //console.log(JSON.stringify(token));
      //console.log('OAuth token: ' + token.value);

      //This will contain a list of Lists
       var options = {
         oauthToken:token.value
       };

       concur.lists.get(options)
       .then(function(data) {
         // Data will contain the Lists
          //console.log('Result of lists: ' + JSON.stringify(data, null, 4));
          console.log('****************************************************');
          console.log('Available Lists:');
          console.log('****************************************************');
          for(var i = 0; i < data.Items.length; i++) {
              var row = data.Items[i];
              //console.log(JSON.stringify(row, null, 4));
              console.log(i + ')  ' + row['Name'] + ',\t(listid= ' + row['ID']+ ')');
          }
       })
       .fail(function(error) {
         // Error will contain the error returned.

       });

  })
  .fail(function(error) {
      // error will contain the error message returned
  });
}

//---------------------------------------------------------------
// Print the available lists
//---------------------------------------------------------------
function printListItems(listItemId) {
  concur.oauth.native(options)
  .then(function(token, listItemId) {
      // token will contain the value, instanceUrl, refreshToken, and expiration details

      //This will contain a list of Lists
       var options = {
         oauthToken:token.value,
         id:listItemId
       };

       concur.listItems.get(options)
       .then(function(data) {
          //console.log('Result of list item: ' + JSON.stringify(data, null, 4));
          console.log('****************************************************');
          console.log('Available List Items for this List:');
          console.log('****************************************************');
          for(var i = 0; i < data.Items.length; i++) {
              var row = data.Items[i];
              //console.log(JSON.stringify(row, null, 4));
              console.log(i + ')  ' + row['Name'] + ',\t(listitemid= ' + row['ID']+ ')');
          }
       })
       .fail(function(error) {
         // Error will contain the error returned.
       });



  })
  .fail(function(error) {
      // error will contain the error message returned
  });
}
