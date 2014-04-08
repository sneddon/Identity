//set scope
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// note the scope includes the plus.me which is openID Connect
var options = {
  'callback' : checkAuth,
  'approvalprompt' : 'force',
  'clientid' : clientId,
  'requestvisibleactions' : 'http://schemas.google.com/CommentActivity http://schemas.google.com/ReviewActivity',
  'cookiepolicy' : 'single_host_origin',
  'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me'
};



// This function is called after the Client Library has finished loading
function handleClientLoad() {
  // 1. SignIn with the options
  gapi.auth.signIn(options);

  // 2. Call the function that checks if the user is Authenticated. This is defined in the next section
  // window.setTimeout(checkAuth,1);
}

function checkAuth (authResult) {
  // Call the Google Accounts Service to determine the current user's auth status.
  // Pass the response to the handleAuthResult callback function
  if (authResult) {
    console.log(authResult['status']['google_logged_in']);
  }
  else {
    console.log('Sign-in state: ' + authResult['error']);
  }

}

function handleAuthResult(authResult) {
  console.log("handleAuthResult - Begin");
  if (authResult) {
    // The user has authorized access

    console.log(authResult.status);

    handleAuthorized();

  } else {
    // User has not Authenticated and Authorized
    handleUnAuthorized();
  }
}

// Authorized user
function handleAuthorized() {
    console.log("handleAuthorized");

    // display happy chuck
    $('#chuckHappy').show();
    $('#chuckNotHappy').hide();

    // display logout button
    $('#logout-button').show();
    $('#authorize-button').hide();
}

// Unauthorized user
function handleUnAuthorized() {
    console.log("handleUnAuthorized");

    // display happy chuck
    $('#chuckHappy').hide();
    $('#chuckNotHappy').show();

    // display logout button
    $('#logout-button').hide();
    $('#authorize-button').show();

}


$("#authorize-button").on("click", function (e){
  gapi.auth.signIn(options);
  return false;
});
