// 1.游戏入口是程序
document.body.onload = game;
// 1.1创建变量保存两个画布,两只画笔
var can1=null,
    can2=null,
    ctx1=null,
    ctx2=null;
// 1.2创建变量保存画布宽度高度
var canWidth=0,
    canHeight=0;
// 1.3创建变量保存图片
var bgPic=new Image();
// 1.4创建变量保存海葵类
var ane=null;
// 1.5创建过时变量
var fruit=null;
// 1.6创建两个变量,上一帧执行时间,下一帧执行时间间隔
var lastTime=null;
var deltaTime=null;   //两帧之间的间隔
// 1.7创建两个变量保存鼠标移动的位置
// 鱼妈妈游戏跟随鼠标游动
var mx=0,my=0;
// 1.8创建 一个变量,保存大鱼对象
var mom=null;
// 1.9创建一个变量,保存小鱼对象
var baby=null;

//2. 游戏主函数
function game() {
    init();
    gameloop();
}
// 3.初始化函数[获取画布,画笔,创建对象,加载图片,初始化基础数据]
function init(){
    // 3.1获取画布1获取画布2
     can1=document.getElementById("canvas1"),
     can2=document.getElementById("canvas2"),
         // 3.2获取画笔
     ctx1=can1.getContext("2d"),
     ctx2=can2.getContext("2d");
     canWidth=can1.width,
     canHeight=can1.height;
     bgPic.src="src/background.jpg";
     // 3.5创建海葵类对象
    ane=new aneObj();
    // 3.6并且调用 初始化方法
    ane.init();
    // 3.7创建果实类对象
    fruit=new fruitObj();
    // 3.8调用果实类初始方法
    fruit.init();
    // 3.9初始化两帧的时间间隔
    lastTime=Date.now();
    deltaTime=0;
    // 3.10为第一个画布绑定一个鼠标移动事件
    can1.addEventListener("mousemove",onMouseMove,false);
    // 3.11创建大鱼对象,并且初始化大鱼
    mom=new momObj();
    mom.init();
    // 3.12创建小鱼对象并且初始化
    baby=new babyObj();
    baby.init();
}
// 4.程序主循环函数
function gameloop(){
    // 4.1启动智能定时器,循环执行gameloop循环
    requestAnimFrame(gameloop);
    // 4.11 计算两帧之间时间间隔
    var now=Date.now();     //获取当前时间
    deltaTime=now-lastTime; //计算二帧时间差
    // console.log(deltaTime); //输出时间差
    lastTime=now;           //上帧初始值
    //特殊情况:浏览器太慢了,二帧时间间隔超过40 指定必须在40执行
    if(deltaTime>40){
        deltaTime=40;
    }
   // 4.2画布背景颜色
    drawBackground();
    // 4.21清除画布1
    ctx1.clearRect(0,0,canWidth,canHeight)
    // 4.3画海葵
    ane.draw();
    // 4.4画果实
    fruitMonitor();
    fruit.draw();
    // 4.5画大鱼妈妈
    mom.draw();
    // 4.6画小鱼
    baby.draw()
    // 4.7碰撞检测
    momFruitsCollision();
    // 4.8大鱼小鱼的碰撞检测
    momBabyCollision();
}

// 5.创建一个函数,获取鼠标移动位置,
function onMouseMove(e) {
    if(e.offsetX || e.layerX){
         mx= e.offsetX==undefined?e.layerX:e.offsetX;
    }
    if(e.offsetY || e.layerY){
        my= e.offsetY==undefined?e.layerY:e.offsetY;
    }
}