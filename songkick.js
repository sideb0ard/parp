function getGigs(topArtists) {
    var songkickApiKey = "fRnmoLm2gBotEw9t";
    var upcomingShowz = [];

    for (i=0; i < topArtists.length; i++)
        {
            //alert("http://api.songkick.com/api/3.0/artists/mbid:" + topArtists[i].mbid + "/calendar.json?apikey=" + songkickApiKey);
            var artistUpcomingGigsUrl = "http://api.songkick.com/api/3.0/artists/mbid:" + topArtists[i].mbid + "/calendar.json?apikey=" + songkickApiKey + "&jsoncallback=?"; 
            //alert("http://api.songkick.com/api/3.0/artists/mbid:" + topArtists[i].mbid + "/calendar.json?apikey=" + songkickApiKey);
            $.getJSON(artistUpcomingGigsUrl, 
                function(data){
                    if ( data.resultsPage.results["event"] != null ) {
                        for (i=0; i<data.resultsPage.results["event"].length; i++) {
                            var gigObj = new Object();
                            gigObj.displayName = data.resultsPage.results["event"][i].displayName;
                            gigObj["location"] = data.resultsPage.results["event"][i]["location"];
                            gigObj.uri = data.resultsPage.results["event"][i].uri;
                            upcomingShowz.push(gigObj);
                            //alert("JSON Data: " + data.resultsPage.results["event"][i].displayName + " " +  data.resultsPage.results["event"][i].uri);
                            alert("Inner scope FOR GIGS -- " + upcomingShowz.length);
                        }
                            alert("MID scope IF ANY GIGS -- " + upcomingShowz.length);
                    }
                            alert("OUTER GET JSON for ARTIST scope IF ANY GIGS -- " + upcomingShowz.length);
        }
                            alert("OUTER OUTER FOR ARTSIT-- " + upcomingShowz.length);

                            alert("AFTER ITS ALL DONE-- " + upcomingShowz.length);
}
