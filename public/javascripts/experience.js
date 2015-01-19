var links = { "auvik": "https://www.auvik.com/", "masstech": "http://www.masstech.com/", "tims": "http://www.timhortons.com/"}

$("img").click(function(e) {
    window.location = links[e.target.parentElement.parentElement.id]
})
