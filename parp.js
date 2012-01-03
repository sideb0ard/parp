var api_key = "api_key=14a64b148e0bb4256d1f863dfd9236da";
var ws="http://ws.audioscrobbler.com/2.0/?";
var authurl = "http://www.last.fm/api/auth/?"; // +  api_key + "&token=" + token;
var secret = "4223f602d29d7db54db9250309a6f9a6";

// AJAX HANDLER AND CALLBACK
var xreq = new XMLHttpRequest();
function xreqHandler(url,afunckd)
{
    xreq.onreadystatechange=afunckd;
    xreq.open("GET",url,true);
    xreq.send();
}


function innit()
{
    var userName = document.getElementById("parput").value;
    var tokenUrl = getTokenUrl();

    xreqHandler(tokenUrl, function()
        {
            if (xreq.readyState==4 && xreq.status==200)
            {
                document.getElementById("parp").innerHTML="parped, "+userName+"! -- tokenURL is " + xreq.responseText + "parp!";
            }
        });
}

// //   req.onreadystatechange = function() {
//        if (req.readyState == 4 && req.status == 200)
//        {
//        // Request successful, read the response
//        //document.write("GOT SOMETHING");
//        //authMeBaby(req.responseText);
////        var token = req.responseText;
//        }
//    } 
//
//    req.open("GET", tokenUrl, true);
//    req.send(); 

function getTokenUrl()
{
    var method = "method=auth.getToken";
    var myArgz = [api_key, method];
    var api_sig = "api_sig=" + signShit(myArgz); 
    var url = ws + method + "&" + api_key + "&" + api_sig;
    return url;
}


//function authMeBaby(token); 
//{
//      document.getElementById("parp").innerHTML="parped, Made it to authMeBaby!!";
//    window.open(authurl,"AuthBitch");
//}
    

function signShit(argz)
{
    // :LASTFM SIGNING ALGO - 1. Order parameters. 2. Append secret 3. md5 hash the whole thing
    // STAGE1 - ORDER PARAMS
    var sortedArgz = argz.sort();
    var sig='';
    for (t in sortedArgz)
    {
        sig += sortedArgz[t];
    }
    // STAGE 2 - APPEND SECRET
    sig += secret;
    // STAGE3 - MD5 THAT SHIT
    return hex_md5(sig);
}
