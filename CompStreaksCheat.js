// ==UserScript==
// @name comp streaks Cheat
// @version		1.0.0
// @description	My bot actually works retard
// @author		MicrowavedBunny
// @require https://code.jquery.com/jquery-3.1.1.min.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.3.2/jquery-migrate.js
// @require     https://cdn.jsdelivr.net/gh/bigdatacloudapi/js-reverse-geocode-client@latest/bigdatacloud_reverse_geocode.min.js
// @match		https://www.geoguessr.com/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var locationInfo;
var cityInfo;
(function() {
    'use strict';
    var guessr = function () {
        GM_xmlhttpRequest({
            method: "get",
            url: "https://game-server.geoguessr.com/api/streaks",
            onload: function(response) {
                locationInfo = JSON.parse(response.responseText);
                //console.log("logged");
                console.log(locationInfo.streak.round.lat);
                console.log(locationInfo.streak.round.lng);

                GM_xmlhttpRequest({
                    method: "get",
                    url: "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+locationInfo.streak.round.lat+"&longitude="+locationInfo.streak.round.lng+"&localityLanguage=en",
                    onload: function(e) {
                        cityInfo = JSON.parse(e.responseText);
                    }
                });
                }
    });
    };
    	window.setInterval(guessr, 10000);
 document.onkeydown = evt => {
        evt = evt || window.event;
        if(evt.shiftKey && evt.altKey && evt.keyCode == 70){
            alert(cityInfo.countryName + ", " + cityInfo.principalSubdivision + ", " + cityInfo.city);
        }
    };

})();
