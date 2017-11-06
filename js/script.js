
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
            }
    });

    return false;
};

$('#form-container').submit(loadData);
