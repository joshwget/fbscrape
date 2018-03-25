String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
}

var posts = []

var articles = document.querySelectorAll('.story_body_container')
for (i = 0; i < articles.length; i++) {
    var article = articles[i]

    var style = article.querySelector('i').getAttribute('style')
    var pictureUrl = style.split('\'')[1]
    pictureUrl = pictureUrl.replaceAll('\\3a ', ':')
    pictureUrl = pictureUrl.replaceAll('\\3d ', '=')
    pictureUrl = pictureUrl.replaceAll('\\26 ', '&')

    var firstStrong = article.querySelector('strong')
    var name = firstStrong.innerText

    var rawText = article.childNodes[1].innerText

    posts.push({
        "poster": {
            "name": name,
            "picture_url": pictureUrl
        },
        "raw_text": rawText
    })
}

window.Viewer.print(JSON.stringify({
    "posts": posts
}))