const url = 'https://raw.githubusercontent.com/Joshimello/MahjongSoul-WikiScrape/main/out/'
fetch(`${url}localdata.json`).then(res => res.json()).then(data => {

    for (char in data) {
        $('body').append(`
            <div class="w100 ma3 pa3 br3 shadow-4 bg-near-white hover-bg-moon-gray" data-char="${char}" data-open="n">
                <div class="flex">
                    <img class="bg-light-gray h4 br3" src="${url}${data[char].icon}">
                    <a class="pointer ttu courier mid-gray f3 tracked mh3">${char.replace(/([A-Z])/g, ' $1').trim()}</a>
                </div>
            </div>
        `)
    }

    var size = 1
    const sizes = ['h3', 'h4', 'h5']
    $('#size').on('click', e => {
        $('.flex>img').addClass(sizes[++size%3]).removeClass(sizes[size%3?size%3-1:2])
        $('#size').text(size%3+1)
    })

    $(window).on('click', 'a', e => {
        let charDiv = $(e.currentTarget).parent().parent()
        if (charDiv.data('open') == 'n'){
            charDiv.find('img').remove()
            data[charDiv.data('char')].outfit.forEach(img => {
                charDiv.append(`<img class="pa3 vh-50" src="${url}${img}">`).data('open', 'y')
            })
        }

        else {
            charDiv.find('img').remove()
            charDiv.children('div').prepend(`<img class="bg-light-gray ${sizes[size%3]} br3" src="${url}${data[charDiv.data('char')].icon}">`)
            charDiv.data('open', 'n')
        }
    })
})