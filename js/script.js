
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So, you want to live at ' + address + '?');
    
    var streeetViewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+address+'';
    // load streetview
    $body.append("<img class='bgimg' src='"+streeetViewUrl+"'>");
    // YOUR CODE GOES HERE!
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+"&sort=newest&api-key=b81034cc40784a7598959208b676eeb5";
    
    $.getJSON(url, function(data)
    {
        $nytHeaderElem.text("New York Times Articels About "+cityStr);
        articles = data.response.docs;
        for(var i = 0; i<articles.length; i++)
           {
                article = articles[i];
               $nytElem.append("<li class='article'>"+
                               "<a href='"+article.web_url+"'>"+article.headline.main+"</a>"+
                               "<p>"+article.snippet+"</p>"+
                               "</li>");
            };
    }).error(function (e){
        $nytHeaderElem.text("New York Times article could not be loaded");
    });
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+cityStr+"&prop=revisions&rvprop=content&format=json&callback=wikiCallback";
    $.ajax({
        url: wikiUrl,
        dataType : 'jsonp',
        success: function(response){
            var articleList = response[1];
            for(var i = 0; i<articleList.length; i++)
                {
                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/'+articleStr;
                    $wikiElem.append('<li><a href="'+url+'">'+
                                    articleStr+'</a></l>');
                }
    }
        
    });

    return false;
};

$('#form-container').submit(loadData);
