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
                var parser=new DOMParser();
                var xmlDoc=parser.parseFromString(xreq.responseText,"text/xml");
                var token = "token=" + xmlDoc.getElementsByTagName("token")[0].childNodes[0].nodeValue

                //var jsonting = JSON.parse(xreq.responseText);
                //var jsonting = eval('(' + xreq.responseText + ')');
                //alert(jsonting.token);
                document.getElementById("parp").innerHTML="parped, "+userName+"! -- tokenURL is " + token + "parp!";
                authMeBaby(token);
            }
        });
}

function getTokenUrl()
{
    var method = "method=auth.getToken";
    var myArgz = [api_key, method];
    var api_sig = "api_sig=" + signShit(myArgz); 
    var url = ws + method + "&" + api_key + "&" + api_sig;
    return url;
}


function authMeBaby(token)
{
    authurl = authurl + api_key + "&" + token;
    window.open(authurl,"AuthBitch");
    var sessionKeyUrl = getSessionUrl(token);
    document.getElementById("parp").innerHTML="parped, Made it to authMeBaby -- SESH URL IIS!!" + sessionKeyUrl;

    xreqHandler(sessionKeyUrl, function()
        
        {if (xreq.readyState==4)
        //{if (xreq.readyState==4 && xreq.status==200)
            {
                //document.getElementById("parp").innerHTML="BOOP!parped, "+userName+"! -- SESSIONKEY RESPONSE  is " + xreq.responseText + "parp!";
                document.getElementById("parp").innerHTML="BOOP!parped!" + "--" + sessionKeyUrl + " ! -- SESSIONKEY RESPONSE  is " + xreq.responseText + "parp!";
            }
        });
}
    
function getSessionUrl(token)
{
    var method = "method=auth.getSession";
    var myArgz = [api_key, method, token];
    var api_sig = "api_sig=" + signShit(myArgz); 
    var url = ws + method + "&" + api_key + "&" + token + "&" + api_sig;
    return url;
}

function signShit(argz)
{
    // :LASTFM SIGNING ALGO - 1. Order parameters. 2. Append secret 3. md5 hash the whole thing
    // STAGE1 - ORDER PARAMS
    alert("ARGSSS: " + argz);
    var sortedArgz = argz.sort();
    alert("SROTED ARGZZZ!" + sortedArgz);
    var sig='';
    for (t in sortedArgz)
    {
        sig += sortedArgz[t].replace(/=/g, "");
    }
    // STAGE 2 - APPEND SECRET
    sig += secret;
    alert("SIG!! " + sig);
    // STAGE3 - MD5 THAT SHIT
    return hex_md5(sig);
}
