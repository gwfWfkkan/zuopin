/**
 * Created by Administrator on 2018/11/1.
 */
window.onload=function() {
    //侧边选项卡
    let lis = document.querySelectorAll(".sec-bar .menu");
    let inn = document.querySelectorAll(".li_more");

    for (let i = 0; i < lis.length; i++) {
        lis[i].onmouseenter = function () {
            for (let j = 0; j < inn.length; j++) {
                inn[j].style.display = "none";
            }
            inn[i].style.display = "block";
        }
        lis[i].onmouseleave = function () {
            inn[i].style.display = "none";
        }
    }
    //返回顶部
    window.onscroll=function () {
        let bar=document.querySelector(".sidebar");
        let bh = document.body.scrollTop || document.documentElement.scrollTop;
        let back = document.querySelector(".back");
        let wh=window.innerHeight;
        if(bh>600){
            bar.style.opacity="1";
        }else{
            bar.style.opacity="0";
        }
        back.onclick = function () {
            animate(document.body, {scrollTop: 0}, 600);
            animate(document.documentElement, {scrollTop: 0}, 600);
        }
    }
}
