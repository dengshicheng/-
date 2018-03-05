// 动态效果鱼妈妈
// 1.大鱼类
var momObj=function () {
    // 1.1初始化变量
    this.x;    //大鱼x坐标
    this.y;     //大鱼y坐标
    this.angle; //大鱼游戏角度
    this.bigEye=[]; //大鱼眼睛数组图片
    this.bigBody=[];    //大鱼身体数组
    this.bigTail=[]     //大鱼尾巴数组
    // 下面将有9个变量分别保存大鱼眼睛身体尾巴数据
    // 1.2控制大鱼尾巴

    // 1.3创建一个变量当前保存尾巴下标
    this.bigTailIndex=0;


    // 1.4创建两个变量保存切换图片事件差
    // 开始时间和总时间
    this.bigTailStart=0;   //开始计时
    this.bigTailEndtime=800;  //结尾时间



    // 1.5控制大鱼身体
    this.bigBodyIndex=0;  //身体图片下标
    this.bigBodyStart=1;  //身体图片计时开始
    this.bigBodyEndtime=800;  //身体图片计时结束
    //1.6 鱼眼睛
    this.bigEyeIndex=0;
    this.bigEyeStart=1;
    this.bigEyeEndtime=1000;
};



// 2.大鱼初始化方法(为大鱼基础数据)
    momObj.prototype.init=function () {
        // 2.1大鱼初始化在屏幕中间
        this.x=canWidth*0.5;
        this.y=canHeight*0.5;
        //大鱼角度初始为0
        this.angle=0;
        // 2.2初始化鱼眼睛
        for(var i=0;i<2;i++){
            this.bigEye[i]=new Image();
            this.bigEye[i].src="./src/bigEye"+i+".png";
        }
        // 2.3初始化鱼身体
        for(var i=0;i<8;i++){
            this.bigBody[i]=new Image();
            this.bigBody[i].src="./src/bigSwim"+i+".png";
        }

        // 2.4初始化鱼尾巴
        for(var i=0;i<8;i++){
            this.bigTail[i]=new Image();
            this.bigTail[i].src="./src/bigTail"+i+".png";
        }
    }
// 3.大鱼绘制方法
    momObj.prototype.draw=function () {
        // 3.1计算新坐标
        this.x=lerpDistance(mx,this.x,0.98)
        this.y=lerpDistance(my,this.y,0.99)
        // 3.2计算鱼游动角度
        // a 获取坐标差
        var deltaY=my-this.y,
            deltaX=mx-this.x;
        // b计算角度差
        var beta=Math.atan2(deltaY,deltaX)+Math.PI;
        // c获取趋向角度
        this.angle=lerpAngle(beta,this.angle,0.9)
        // 3.3计算一下当前显示大鱼身体图片下标
        // 开始计算并且判断计时结束
        this.bigBodyStart=this.bigBodyStart+deltaTime;
        // 如果开始计时的时间大于总时长
        if(this.bigBodyStart>this.bigBodyEndtime){
            // 开始时间清空
            this.bigBodyStart=1;
            // 当前图片切换到下一张
            this.bigBodyIndex=this.bigBodyIndex+1;
            // 如果当前下标为7就只显示最后一张
            if(this.bigBodyIndex>7){
                this.bigBodyIndex=7;
            }
        }
        // 3.4计算当前显示大鱼尾巴图片下标
        this.bigTailStart=this.bigTailStart+deltaTime;
        if(this.bigTailStart>this.bigTailEndtime){
            this.bigTailStart=1;
            this.bigTailIndex=(this.bigTailIndex+1)%8;

            // if(this.bigTailIndex>7){
            //     this.bigTailIndex=0;
            // }
        }
        // 计算眼睛
        this.bigEyeStart=this.bigEyeStart+deltaTime;
        if(this.bigEyeStart>this.bigEyeEndtime){
            this.bigEyeStart=1;
            this.bigEyeIndex=(this.bigEyeIndex+1)%2;
            // 判断睁眼和闭眼时间不同
            if(this.bigEyeIndex==1){
                this.bigEyeEndtime==200
            }
            if(this.bigEyeIndex==0){
                this.bigEyeEndtime==3000;
            }
        }
        // 3.6绘制大鱼

        ctx1.save();
        ctx1.translate(this.x,this.y);
        ctx1.rotate(this.angle);
        // 3.7绘制身体
        ctx1.drawImage(this.bigBody[this.bigBodyIndex],
            -this.bigBody[this.bigBodyIndex].width*0.5,
            -this.bigBody[this.bigBodyIndex].height*0.5);


        // 3.8绘制尾巴
        ctx1.drawImage(this.bigTail[this.bigTailIndex],
            -this.bigTail[this.bigTailIndex].width*0.5+30,
            -this.bigTail[this.bigTailIndex].height*0.5);

        // 3.9绘制眼睛
        ctx1.drawImage(this.bigEye[this.bigEyeIndex],
            -this.bigEye[this.bigEyeIndex].width*0.5-5,
            -this.bigEye[this.bigEyeIndex].height*0.5,
        )
        ctx1.restore();
    }











































// //大鱼妈妈
// var momObj=function () {
//     this.x;                     //大鱼的x坐标
//     this.y;                     //大鱼的y坐标
//     this.bigEye=new Image();    //大鱼的眼睛
//     this.bigBody=new Image();   //大鱼的身体
//     this.bigTail=new Image();   //大鱼的尾巴
// }
// // 初始化大鱼方法
// momObj.prototype.init=function () {
//     // 大鱼为在画布中央
//     // 加载三张图片,眼睛 身体 尾巴
//     this.x=canWidth*0.5;
//     this.y=canHeight*0.5;
//     this.bigEye.src="./src/bigEye0.png";
//     this.bigBody.src="./src/bigSwim0.png";
//     this.bigTail.src="./src/bigTail0.png";
// }
// // 绘制大鱼的方法
// momObj.prototype.draw=function () {
//     // console.log(3)
//     // 大鱼位置随着鼠标移动移动
//     this.x=mx;
//     this.y=my;
//     ctx1.clearRect(0,0,800,600)
//     ctx1.save();
//     ctx1.translate(this.x,this.y);
//     ctx1.drawImage(this.bigEye,15,20);
//     ctx1.drawImage(this.bigBody,0,0);
//     ctx1.drawImage(this.bigTail,40,9);
//     ctx1.restore();
// }