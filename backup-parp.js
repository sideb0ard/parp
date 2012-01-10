var api_key = "api_key=14a64b148e0bb4256d1f863dfd9236da";

function innit()
{
    document.getElementById("parp").innerHTML=authMeUp();
}

function authMeUp()
{
    var req = new XMLHttpRequest();

    // Create the callback:
    req.onreadystatechange = function() {
    if (req.readyState != 4) return; // Not there yet
    if (req.status != 200) {
        // Handle request failure here...
        // var token = req.responseText;
        // document.write("BLAH!!!:"+token);
        return;
    }
    // Request successful, read the response
    var token = req.responseText;
    // ... and use it as needed by your app.
    document.write("OH YEAH!!!!"+token);
    var authurl = "http://www.last.fm/api/auth/?" +  api_key + "&token=" + token;
    document.write(authurl);

    window.open(authurl,"AuthBitch");
    }

    url = getToken();
    req.open("GET", url, true);
    req.send();
}

function getToken()
{
    var url="http://ws.audioscrobbler.com/2.0/?";

    var api_key = "api_key=14a64b148e0bb4256d1f863dfd9236da";
    var method = "method=auth.getToken";

    var secret = "4223f602d29d7db54db9250309a6f9a6";

    var myTokenz = [api_key, method];
    var sortedTokenz = myTokenz.sort();

    var sig='';
    for (t in sortedTokenz)
    {
        sig += sortedTokenz[t];
    }

    sig += secret;
    var md5sig = hex_md5(sig)
    var api_sig = "api_sig=" + md5sig; 
    var url = url + method + "&" + api_key + "&" + api_sig;

    return url;
}
