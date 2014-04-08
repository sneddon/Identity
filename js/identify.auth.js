//set scope
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// note the scope includes the plus.me which is openID Connect
var options = {
  'callback' : handleAuthResult,
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
}


function handleAuthResult(authResult) {
  console.log("handleAuthResult - Begin");
  if (authResult['status']['signed_in']) {
    console.log(authResult.status);
    console.log(authResult['status']['google_logged_in']);
    // Update the app to reflect a signed in user
    handleAuthorized();
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    console.log('Sign-in state: ' + authResult['error']);
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
