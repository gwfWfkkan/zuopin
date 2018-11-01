/**
 * Created by Administrator on 2018/11/1.
 */

    $(function () {
        //侧边选项卡
        $(".sec-bar .menu").mouseenter(function () {
            let i=$(this).index();
            $(this).children(".li_more").css("display","none").eq(i).css("display","block");
        })
        $(".sec-bar .menu").mouseleave(function () {
            let i=$(this).index();
            $(".li_more").css("display","none");
        })
        //返回顶部
        let back = $(".back");
        // console.log(back);
        back.click(function () {
            $(document.body).animate({scrollTop: 0}, 600);
            $(document.documentElement).animate({scrollTop: 0}, 600);
        })


//侧边栏
        $(window).scroll(function () {
            let gd = document.body.scrollTop || document.documentElement.scrollTop;
            let bar = $(".sidebar");
            if (gd > 600) {
                bar.css({opacity: 1});
            } else {
                bar.css({opacity: 0});
            }
        })
    })
