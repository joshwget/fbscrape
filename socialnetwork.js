function getPosts() {
    var posts = []

    var articles = document.querySelectorAll('.story_body_container')
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i]

        var poster = getPoster(article)
        //var recipient = getRecipient(article)

        //var footer = article.parentElement.querySelector('footer')

        //var like = getLike(footer)
        //var comment = getComment(footer)

        var rawText = article.childNodes[1].innerText

        posts.push({
            'key': article.parentElement.id,
            'poster': poster,
            //'recipient': recipient,
            'raw_text': rawText,
            //'like': like,
            //'comment': comment
        })
    }

    return posts
}

function getPoster(article) {
    var style = article.querySelector('i').getAttribute('style')
    var pictureUrl = style.split('\'')[1]
    pictureUrl = pictureUrl.replaceAll('\\3a ', ':')
    pictureUrl = pictureUrl.replaceAll('\\3d ', '=')
    pictureUrl = pictureUrl.replaceAll('\\26 ', '&')

    var firstStrong = article.querySelector('strong')
    var name = firstStrong.innerText

    return {
        'name': name,
        'picture_url': pictureUrl
    }
}

function getRecipient(article) {
    var recipient = {}
    var firstSpan = article.querySelector('span')
    var spanLinks = firstSpan.querySelectorAll('a')
    for (var i = 0; i < spanLinks.length; i++) {
        var spanLink = spanLinks[i]
        if (i == spanLinks.length - 1) {
            var href = spanLink.getAttribute('href')
            if (href.startsWith('/groups/')) {
                recipient = {
                    'type': 'group',
                    'name': spanLink.innerText,
                    'url': href
                }
                break
            }
        }
    }
    return recipient
}

function getLike(footer) {
    return getFooterItem(footer, 'Like')
}

function getComment(footer) {
    return getFooterItem(footer, 'Comment')
}

function getFooterItem(footer, itemText) {
    var item = {}
    var footerLinks = footer.querySelectorAll('a')
    for (var i = 0; i < footerLinks.length; i++) {
        var footerLink = footerLinks[i]
        if (footerLink.innerText.includes(itemText)) {
            item = {
                'id': footerLink.getAttribute('id')
            }
            break
        }
    }
    return item
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this
    return target.split(search).join(replacement)
}
