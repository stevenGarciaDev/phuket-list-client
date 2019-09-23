

/* global gapi */


var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var Discovery = 'https://www.googleapis.com/discovery/v1/apis/plus/v1/rest';



export function loadClient()
{
    window.gapi.load('client:auth2', initializeClient);
}


export function initializeClient() {
    
    window.gapi.client.init({
        'apiKey': 'AIzaSyBW402Hl14ai1D7LrDwpTa4OABw75PKBoc',
        'discoveryDocs': [Discovery],
        'clientId': '444736627746-f9lfcl7t3f0635p0gktj5ij3epbmo81g.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
      GoogleAuth =  window.gapi.auth2.getAuthInstance();
      signIN();
      

      
    });


    //return http.post(apiEndpoint, { email, password });
  }



  export function signIN() {
    if (!GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked 'Sign out' button.
        GoogleAuth.signIn();
      }
  }

  export function signOut() {
      if(GoogleAuth  == null){
        if (GoogleAuth.isSignedIn.get()) {
            // User is authorized and has clicked 'Sign out' button.
            GoogleAuth.signOut();
          }
      }
    
}

export function Revoke() {
    GoogleAuth.disconnect();

}

export function getSignInStatus()
{   
    if(GoogleAuth == null){
        return false;
    }
    return (GoogleAuth.isSignedIn.get());
}