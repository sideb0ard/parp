var parpurl = "http://theb0ardside.com/parp/parp.html";
var api_key = "api_key=14a64b148e0bb4256d1f863dfd9236da";
var bare_api_key = "14a64b148e0bb4256d1f863dfd9236da";
var ws="http://ws.audioscrobbler.com/2.0/?";
var authurl = "http://www.last.fm/api/auth/?" + api_key;
var secret = "4223f602d29d7db54db9250309a6f9a6";
var sessionKey;
var luserName;

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
    if  (readCookie('username') && readCookie('sessionKey')) {
        luserName = readCookie('username');
        sessionKey = readCookie('sessionKey');
        //document.getElementById("content").append('<div id="sidebar"><div id="lastfmcharts" class="feature"></div><div id="songkickgigz" class="feature"></div></div><div id="main"><div id="videoz" class="feature"></div></div>');
        $('#content').append('<div id="sidebar"><div id="lastfmcharts" class="feature"></div><div id="songkickgigz" class="feature"></div></div><div id="main"><div id="videoz" class="feature"></div></div>');
        document.getElementById("lastfmcharts")
        .innerHTML="Charts via Lastfm data<br>";
        showTopArtists(luserName)
    }

    else if (getUrlVars()["token"]) {
        var token = getUrlVars()["token"];
        getSessionKey(token);
    }
        
    else {
        document.getElementById("content")
        .innerHTML="<input id=\"lusername\" onfocus=\"this.value=''\" value=\"Lastfm UserName\"/></input><br/><br/><button id=\"parpbutton\" type=\"button\" onclick=\"authMeBaby()\">pARP</button>";  
    }
}


function authMeBaby() {
    luserName = document.getElementById('lusername').value;
    createCookie('username',luserName);
    window.location = authurl;
}


function getSessionKey(token) {
    if(typeof(token) !== 'undefined') {
        var sessionKeyUrl = getSessionUrl(token);
    
        xreqHandler(sessionKeyUrl, function()
        {
            if (xreq.readyState==4 && xreq.status==200) {
                var parser=new DOMParser();
                var xmlDoc=parser.parseFromString(xreq.responseText,"text/xml");
                var sessionKey = xmlDoc.getElementsByTagName("key")[0].childNodes[0].nodeValue;
                // alert("PARP!PARP! -- sessionKEY:: " + sessionKey);
                createCookie('sessionKey',sessionKey);
                window.location = parpurl;
            }
        });
    }   
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
}

function createCookie(name,value) {
    
    var name = name;
    var value = value;
    var days = 7;
    
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
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
    var sig='';
    for (t in sortedArgz)
    {
        sig += sortedArgz[t].replace(/=/g, "");
    }
    sig += secret;
    return hex_md5(sig);
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
