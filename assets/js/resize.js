$(document).ready(function () {
    resizeForm();
    window.addEventListener('resize', function(event) {
        resizeForm();
    }, true);

    function resizeForm(){
        let width = window.innerWidth;
        let formMaxHeight = (1080 * width) / 1920;
        if(width<1000) {
            $("#hero").attr("style", "height:" + formMaxHeight + "px;");
            $("#heroCarousel").attr("style", "height:" + formMaxHeight + "px;");
            $(".carousel-container").attr("style", "height:" + formMaxHeight + "px;");
            $("#hero h2").attr("style", "margin-bottom: 15px;font-size: 30px;");
            $("#hero p").attr("style", "width: 100%;font-size: 15px;");
        }else{
            $("#hero h2").attr("style", "margin-bottom: 30px;font-size: 40px;");
            $("#hero p").attr("style", "width: 80%;font-size: 25px;");
        }
    }

});