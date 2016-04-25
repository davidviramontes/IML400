console.log("...javascript {main.js} loaded...");

var FLICKR_URL = "https://api.flickr.com/services/rest/";

var result = null;
var msg_results = "<p class='msg'>the results will be placed here</p>";
var my_api_key = "e841a6566582cadbf13efdfb3f8f78a3";

function onSubmit() {

    var myRequest = formatQuery();

    $.getJSON( FLICKR_URL, myRequest).done( onJSONSuccess ).fail( onJSONFail );

}

function formatQuery() {

    var request = { "method" : "flickr.interestingness.getList",
                    "api_key" : my_api_key,
                    "format" : "json",
                    "nojsoncallback" : 1 }    

    console.log('going to make the following request:');    
    console.log(request);
    return request;
}

function onJSONSuccess( returnedData ) {
    var i, obj, count = 20;
    

    var photoData = returnedData.photos.photo;
    var numOfPhotos = returnedData.photos.photo.length;
    
     console.log( "I got: " + numOfPhotos + " results back");

    if( numOfPhotos < 20 ) {
        count = returnedData.length;
    }
    
    result = returnedData;

    for(i=0; i < count; i++ ) {
        photo = photoData[i];
       
        var flickrImgUrl = formatUrl(photo);

        $aResult = $("<div class='photo'><h4>" + photo.title + "</h4> <img class='retImage' src='" + flickrImgUrl + "'></div></div>");

        $("#results").append($aResult);
    }
    
}

function formatUrl (photoData){
    return "https://farm" + photoData.farm + ".staticflickr.com/" + photoData.server + "/" + photoData.id + "_" + photoData.secret + ".jpg"
}

function onJSONFail( error ) {
    console.log("there was a problem: " );
    console.log(error);
}