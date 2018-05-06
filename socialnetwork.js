function getPosts() {
    var posts = []

    var articles = document.querySelectorAll('.story_body_container')
    for (var i = 0; i < articles.length; i++) {
        var article = articles[i]

        var poster = getPoster(article)
        var time = getTime(article)
        var recipient = getRecipient(article)


        var footer = article.parentElement.querySelector('footer')

        var reactions = getReactions(footer)
        var commentCount = getCommentCount(footer)
        var like = getLike(footer)
        var comment = getComment(footer)

        var rawText = article.childNodes[1].innerText

        posts.push({
            'key': article.parentElement.id,
            'poster': poster,
            'time': time,
            'recipient': recipient,
            'rawText': rawText,
            'reactions': reactions,
            'commentCount': commentCount,
            'like': like,
            'comment': comment
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
        'pictureUrl': pictureUrl
    }
}

function getTime(article) {
    var abbr = article.querySelector('abbr')
    if (!abbr) {
        return null
    }
    return abbr.innerText
}

function getRecipient(article) {
    var firstSpan = article.querySelector('span')
    if (!firstSpan) {
        return null
    }

    var spanLinks = firstSpan.querySelectorAll('a')
    for (var i = 0; i < spanLinks.length; i++) {
        var spanLink = spanLinks[i]
        if (i == spanLinks.length - 1) {
            var href = spanLink.getAttribute('href')
            if (href.startsWith('/groups/')) {
                return {
                    'type': 'group',
                    'name': spanLink.innerText,
                    'url': href
                }
                break
            }
        }
    }

    return null
}

function getReactions(footer) {
    if (!footer) {
        return null
    }

    var reactionsBar = getReactionBar(footer)
    if (!reactionsBar) {
        return null
    }

    var reactionsContainer = reactionsBar.querySelector('[data-sigil=reactions-sentence-container]')
    if (!reactionsContainer) {
        return null
    }

    var reactionTypes = []
    var underlines = reactionsContainer.querySelectorAll('u')
    for (var i = 0; i < underlines.length; i++) {
        var underline = underlines[i]
        reactionTypes.push(underline.textContent)
    }

    var reactionsContainerLastChild = reactionsContainer.children[reactionsContainer.children.length - 1]
    if (!reactionsContainerLastChild) {
        return null
    }

    var count = parseInt(reactionsContainerLastChild.textContent)

    return {
        'types': reactionTypes,
        'count': count
    }
}

function getCommentCount(footer) {
    if (!footer) {
        return null
    }

    var reactionsBar = getReactionBar(footer)
    if (!reactionsBar) {
        return null
    }

    var reactionsBarLastChild = reactionsBar.children[reactionsBar.children.length - 1]
    if (!reactionsBarLastChild) {
        return null
    }

    return parseInt(reactionsBarLastChild.textContent)
}

function getReactionBar(footer) {
    return footer.querySelector('[data-sigil=reactions-bling-bar]')
}

function getLike(footer) {
    return getFooterItem(footer, 'Like')
}

function getComment(footer) {
    return getFooterItem(footer, 'Comment')
}

function getFooterItem(footer, itemText) {
    if (!footer) {
        return null
    }

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

function getNotifications() {
    var notifications = []

    var notifs = document.querySelectorAll('.aclb')
    for (var i = 0; i < notifs.length; i++) {
        var notif = notifs[i]

        var text = notif.querySelector('.c')
        var time = notif.querySelector('abbr')

        if (!text || !time) {
            continue
        }

        var textInnerText = text.innerText
        var timeInnerText = time.innerText

        // TODO: this is hacky
        textInnerText = textInnerText.slice(0, textInnerText.length - timeInnerText.length - 2)

        notifications.push({
            'text': textInnerText,
            'time': timeInnerText,
        })
    }

    return notifications
}

function onFeedChange(f) {
    var observer = new MutationObserver(f)
    observer.observe(document.querySelector("#MNewsFeed"), {
        childList: true
    })
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this
    return target.split(search).join(replacement)
}