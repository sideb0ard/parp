function showTopArtists(luserName) {
    var artistLimit = 10;
    var topArtistsQueryUrl = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=" + artistLimit + "&user=" + luserName + "&api_key=" + bare_api_key + "&period=7day";
    xreqHandler(topArtistsQueryUrl, function()
            {
                if (xreq.readyState==4 && xreq.status==200) {
                    // alert("PARP!PARP! -- topArtists:: " + xreq.responseText);

					xmlDoc=xreq.responseXML; 
					
                    //alert(xreq.responseText);

                    var topArtists = [];
					var x=xmlDoc.getElementsByTagName("artist");
					for (i=0;i<x.length;i++)
					  { 
                        var artistobj = "artist" + i;
                        artistobj = new Object();
                        artistobj.name=x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
                        artistobj.playcount=x[i].getElementsByTagName("playcount")[0].childNodes[0].nodeValue;
                        if ( x[i].getElementsByTagName("mbid")[0].childNodes[0] != null ) {
                            artistobj.mbid=x[i].getElementsByTagName("mbid")[0].childNodes[0].nodeValue;
                        } else {
                            artistobj.mbid="PARP!";
                        }
                        topArtists.push(artistobj);
					  }

                        var w = 420,
                            h = 200;

                        var x = d3.scale.linear()
                        .domain([0,topArtists[0].playcount])
                        .range([0, w]);

                        var chart = d3.select("body").append("svg")
                        .attr("class", "chart")
                        .attr("width", 420)
                        .attr("height", 20 * topArtists.length);
                        
                        chart.selectAll("rect")
                        .data(topArtists)
                        .enter().append("rect")
                        .attr("y", function(d, i) { return i * 20; })
                        .attr("width", function(d) { return x(d.playcount) ; })
                        .attr("height", 20);

                        chart.selectAll("text")
                        .data(topArtists)
						.enter().append("text")
						.attr("x", function(d) { return x(d.playcount) ; })
						.attr("y", function(d, i) { return i * 20 + 9;})
						.attr("dx", -7) // padding-right
						.attr("dy", ".35em") // vertical-align: middle
						.attr("text-anchor", "end") // text-align: right
                        .attr("fill", "white")
						.text(function (d) { return d.name; });

                        getGigs(topArtists);
					
		}
    });
}
