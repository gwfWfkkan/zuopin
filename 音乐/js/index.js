/*
* @Author: gf880623
* @Date:   2018-10-05 12:25:18
* @Last Modified by:   gf880623
* @Last Modified time: 2018-10-06 11:08:41
*/
/**
 * 获取默认是哪一首音乐
 * @type {number}
 */
let currentIndex=0;

/**
 * 下一首
 */
function next() {
    if (currentIndex<database.length-1) {
        currentIndex++;
    }else {
        currentIndex=0;
    }
    console.log(currentIndex);
}

/**
 * 上一首
 */
function previous() {
    if (currentIndex<=0) {
        currentIndex=database.length-1;
    }else {
        currentIndex--;
    }
    console.log(currentIndex);
}

/**
 * 把int值转换成两位  不足补0
 * @param i 当前要格式化的值
 * @returns {格式化后的值}
 */
function formatNumber(i) {
    if (i>9) {
        return i;
    }

    return "0"+i;
}

var lastLi;

/**
 * 高亮当前行，去除上一行
 * @param liE 当前那一行
 */
function changeCurrentLine(liE) {
    if (lastLi) {
        //默认颜色
        lastLi.style.color='#333';
        lastLi.style.fontSize="1.4rem";
    }

    //高亮
    liE.style.color='#e35293';
    liE.style.fontSize="1.6rem";

    //计算当前这一行到顶部的距离
    let lineNumber=parseInt(liE.getAttribute("index"));
    $('.list').scrollTop(lineNumber*20-50);

    lastLi=liE;
}

/**
 * 显示播放时间
 */
function showPlayTime() {
    // console.log('showPlayTime');
    let audio=document.querySelector("#aud");
    let currentTime=audio.currentTime;

    let min=parseInt(currentTime/60);
    let sec=parseInt(currentTime%60);

    //进度条
    // console.log(formatNumber(min)+":"+formatNumber(sec));
    let current=document.querySelector(".current");
    current.innerHTML=formatNumber(min)+":"+formatNumber(sec);
    let progressBar=document.querySelector(".progressBar");

    let bili=currentTime/audio.duration*100;
    progressBar.style.width=bili+'%';

    // 歌词滚动
    let lyricContainer=document.querySelectorAll(".list li");
    for(let i=lyricContainer.length-1;i>=0;i--){
        let currentLyricE=lyricContainer[i];
        let t=parseInt(currentLyricE.getAttribute("time"));
        if (t<=currentTime) {
            // console.log('found li:'+currentTime+","+t);
            changeCurrentLine(currentLyricE);
            break;
        }
    }
}

/**
 * 开启定时器
 */
let playTimer;
function startTimer(){
    console.log('start');
    playTimer=setInterval("showPlayTime()",500);
}

/**
 * 停止定时器
 */
function stopTimer(){
    console.log('stop');
    clearInterval(playTimer);
}

/**
 * 将分:秒格式字符串转为秒
 * @param time
 * @returns {number}
 */
function parseTime(time){
    let times=time.split(":");
   return parseInt(times[0])*60+parseInt(times[1]);


}
//初始化当前歌曲信息
function initMusic(){
    let audio=document.querySelector("#aud");

    let songE=document.querySelector(".song");
    let singer=document.querySelector(".singer");
    let list=document.querySelector(".list");
    list.innerHTML="";

    let duration=document.querySelector(".duration");

    let song=database[currentIndex];
    songE.innerHTML=song.songs;
    singer.innerHTML=song.name;
    duration.innerHTML=song.alltime;
    audio.setAttribute("src",song.src);
    for(let i=0;i<song.lyrics.length;i++){
        let li=document.createElement("li");
        li.innerHTML=song.lyrics[i].lyric;
        li.setAttribute("time",parseTime(song.lyrics[i].time));
        li.setAttribute("index",i);
        list.appendChild(li);
    }
}

/**
 * 停止播放
 */
function stopPlay() {
    let audio=document.querySelector("#aud");

    $('.suspend i').removeClass("icon-zanting");
    $('.suspend i').addClass("icon-bofang1");
    audio.pause();

    stopTimer();
}

/**
 * 开始播放
 */
function startPlay() {
    let audio=document.querySelector("#aud");
    $('.suspend i').removeClass("icon-bofang1");
    $('.suspend i').addClass("icon-zanting");
    audio.play();

    startTimer();
}

/**
 * 切换播放 暂停
 */
function playOrPause(){
    let audio=document.querySelector("#aud");

    if(!audio.paused){
        stopPlay();
    }else{
        startPlay();
    }
}

$(function () {
    let audio=document.querySelector("#aud");

    initMusic();

    let suspend=document.querySelector(".suspend");
    suspend.onclick=function () {
        // console.log('click');
        playOrPause();

    }

    $('.btnright').click(function () {
        next();
        initMusic();
        startPlay();
    });
    $('.btnleft').click(function () {
        previous();
        initMusic();
        startPlay();
    });
});
