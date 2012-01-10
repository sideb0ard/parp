var api_key = "api_key=14a64b148e0bb4256d1f863dfd9236da";
var bare_api_key = "14a64b148e0bb4256d1f863dfd9236da";
var ws="http://ws.audioscrobbler.com/2.0/?";
//var authurl = "http://www.last.fm/api/auth/?"; // +  api_key + "&token=" + token;
var authurl = "http://www.last.fm/api/auth/?" + api_key;
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

    createCookie();
    var luserName = readCookie('username')
    //if  (luserName) {
      //  var luserName = readCookie('username')
       //alert("PARPPPPRPRPR! COOKIE SET - " + luserName);
    //}

    var sessionKey = readCookie('sessionKey')
    if (sessionKey) {
        document.getElementById("parp").innerHTML="PARP! -- top artists!";
        showTopArtists(luserName);
    }
    else {

        var token = getUrlVars()["token"];
        if(typeof(token) !== 'undefined') {
            var sessionKeyUrl = getSessionUrl(token);
            // alert("Parp! - Session URL -- " + sessionKeyUrl + "!! ");
    
            xreqHandler(sessionKeyUrl, function()
            {
                if (xreq.readyState==4 && xreq.status==200) {
                    var parser=new DOMParser();
                    var xmlDoc=parser.parseFromString(xreq.responseText,"text/xml");
                    var sessionKey = xmlDoc.getElementsByTagName("key")[0].childNodes[0].nodeValue;
                    // alert("PARP!PARP! -- sessionKEY:: " + sessionKey);
                    createSessionCookie(sessionKey);
                }
            });
        }   
        else {
            // alert("Parp, no vars!");
            window.location = authurl;
        }
    }

}

function showTopArtists(luserName) {
    var artistLimit = 10;
    var topArtistsQueryUrl = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=" + artistLimit + "&user=" + luserName + "&api_key=" + bare_api_key;
    xreqHandler(topArtistsQueryUrl, function()
            {
                if (xreq.readyState==4 && xreq.status==200) {
                    var parser=new DOMParser();
                    var xmlDoc=parser.parseFromString(xreq.responseText,"text/xml");
                    var topArtists = xmlDoc.getElementsByTagName("artist")[0].childNodes[0].nodeValue;
                    alert("PARP!PARP! -- topArtists:: " + xreq.responseText);
                }
            });
}

function createSessionCookie(sessionKey) {
    
    var name = "sessionKey";
    var value = sessionKey;
    var days = 7;
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    // alert("! SESSION COOKIE !! ");
}

function createCookie() {
    
    var name = "username";
    var value = document.getElementById("parput").value;
    var days = 7;
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    // alert("! COOKIE !! ");
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
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
    var tokenCall = "token=" + token;
    var myArgz = [api_key, method, tokenCall];
    var api_sig = "api_sig=" + signShit(myArgz); 
    var url = ws + method + "&" + api_key + "&" + tokenCall + "&" + api_sig;
    return url;
}

function signShit(argz)
{
    // :LASTFM SIGNING ALGO - 1. Order parameters. 2. Append secret 3. md5 hash the whole thing
    // STAGE1 - ORDER PARAMS
    // alert("ARGSSS: " + argz);
    var sortedArgz = argz.sort();
    //alert("SROTED ARGZZZ!" + sortedArgz);
    var sig='';
    for (t in sortedArgz)
    {
        sig += sortedArgz[t].replace(/=/g, "");
        // alert("SIGLINE::" + sig);
    }
    // STAGE 2 - APPEND SECRET
    sig += secret;
    // alert("SIG!! " + sig);
    // STAGE3 - MD5 THAT SHIT
    return hex_md5(sig);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
