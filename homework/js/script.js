let $bannerInterval;
let $currebtIndex;
function bannerInterval(index) {    
    let $slideIndex = index;
    
    $bannerInterval = setInterval(function() {
        const $banner = $(".banner-container")
        const $item = $(".banner-container .item")

        $slideIndex = ($slideIndex + 1) % $item.length;
        $banner.css("transform", "translateX(-" + $slideIndex * 100 + "vw")
        console.log("slide: ", $slideIndex);
        $item.removeClass("show")
        $item.filter("[data-slide-index='" + $slideIndex + "']").addClass("show")
        $(".banner-btn").removeClass("checked")
        $(".banner-btn[data-slide-index='" + $slideIndex + "']").addClass("checked")

        $currebtIndex = $slideIndex
        console.log($currebtIndex)
    }, 3000)

    return $bannerInterval
}

function bannerBtn() {
    $(".banner-btn").click(function() {
        const $banner = $(".banner-container")
        const $index = $(this).attr('data-slide-index')
        const $item = $(".banner-container .item")
        const $transform = -$index * 100
        clearInterval($bannerInterval)
        bannerInterval($index)
        
        $banner.css("transform", "translateX(" + $transform + "vw")
        $item.removeClass("show")
        $item.filter("[data-slide-index='" + $index + "']").addClass("show")
        $(".banner-btn").removeClass("checked")
        $(this).addClass("checked")
        $currebtIndex = $index
    })
}

function subMainBtn() {
    $(".sub-menu").click(function(event) {
        event.stopPropagation();

        const $btn = $(this).find("button");
        const $list = $(this).find(".list");
        
        $(".sub-menu button").removeClass("checked");
        $(".sub-menu .list").css("display", "none");

        $btn.addClass("checked");
        $list.css("display", "block");
    });

    $(document).click(function() {
        $(".sub-menu button").removeClass("checked");
        $(".sub-menu .list").css("display", "none");
    });
}

$(window).on('load', function() {
    bannerInterval(0);
});

$(document).ready(function() {
    subMainBtn();
    bannerInterval(0);
    bannerBtn();
    $(".section-banner").mouseover(function() {
        clearInterval($bannerInterval)
    })

    $(".section-banner").mouseout(function() {
        clearInterval($bannerInterval)
        bannerInterval($currebtIndex);
    })
})
