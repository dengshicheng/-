// 1.创建小鱼
var babyObj=function () {
    // 1.1创建二个变量保存小鱼坐标xy
    this.x;
    this.y;
    // 1.2创建一个变量保存小鱼游动的角度
    this.angle;
    // 1.3创建三个数组分别保存小鱼身体尾巴眼睛图片
    this.babyEye=[];
    this.babyBody=[];
    this.babyTail=[];
    // 1.4创建9个变量保存不同部分市场,时间间隔,总时长
    this.babyBodyIndex=0;
    this.babyBodyStart=0;
    this.babyBodyEndtime=1000;


    this.babyTailIndex=0;
    this.babyTailStart=1;
    this.babyTailEndtime=1000;

    this.babyEyeIndex=0;
    this.babyEyeStart=1;
    this.babyEyeEndtime=500;
}
// 2.创建小鱼初始化方法
babyObj.prototype.init=function () {
  // 2.1初始化小鱼坐标xy 屏幕中间
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle = 0;
  //   2.2初始化小鱼眼睛图片;
    for(var i=0;i<2;i++){
        this.babyEye[i]=new Image();
        this.babyEye[i].src="./src/babyEye"+i+".png";
    }

    // 2.3初始化小鱼身体图片
    for(var i=0;i<20;i++) {
        this.babyBody[i] = new Image();
        this.babyBody[i].src = "./src/babyFade" + i + ".png";
    }
    // 2.4初始化小鱼尾巴图片
    for(var i=0;i<8;i++){
        this.babyTail[i]=new Image();
        this.babyTail[i].src="./src/babyTail"+i+".png";
    }
    //console.log(this.babyBody)
    //console.log(this.babyEye)
    //console.log(this.babyTail)
}

// 3.创建小鱼绘制方法
babyObj.prototype.draw=function () {
    // 3.1小鱼趋向大鱼游动
    this.x=lerpDistance(mom.x,this.x,0.98)
    this.y=lerpDistance(mom.y,this.y,0.98)

    var deltaY=mom.y-this.y,
        deltaX=mom.x-this.x;
    // 3.2正切值
    //console.log(deltaY+"_"+deltaX);
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    // 获取新小鱼角度
    this.angle=lerpAngle(beta,this.angle,0.6);
    //console.log(this.angle);
    // 3.2绘制小鱼身体
    // 控制小鱼身体图片从0->1
    // 3.3开始计时
    this.babyBodyStart+=deltaTime;
    // 3.4如果计时时间大于总时长

    // 判断身体
    if (this.babyBodyStart>this.babyBodyEndtime){

        // 3.5计算器初始赋值
        this.babyBodyStart=1;
        // 3.6切换下一张图片
        this.babyBodyIndex=(this.babyBodyIndex+1)
        // 3.7判断如果当前大于最后一张图片,就只显示最后一张
        if(this.babyBodyIndex>19){
            this.babyBodyIndex=19;
        }
    }
    // 3.8判断尾巴
    this.babyTailStart+=deltaTime;
    if(this.babyTailStart>this.babyTailEndtime){
        this.babyTailStart=1;
        this.babyTailIndex=(this.babyTailIndex+1)%8;
    }
    this.babyEyeStart+=deltaTime;
    if(this.babyEyeStart>this.babyEyeEndtime){
        this.babyEyeStart=1;
        this.babyEyeIndex=(this.babyEyeIndex+1)%2;
    }
    if(this.babyEyeIndex==0){
        this.babyEyeEndtime=300;
    }
    if(this.babyEyeIndex==1){
        this.babyEyeEndtime=30;
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    // 绘制身体
    ctx1.drawImage(
        this.babyBody[this.babyBodyIndex],
        -this.babyBody[this.babyBodyIndex].width*0.5,
        -this.babyBody[this.babyBodyIndex].height*0.5
    )
    // 3.2绘制小鱼尾巴
    ctx1.drawImage(
        this.babyTail[this.babyTailIndex],
        -this.babyTail[this.babyTailIndex].width*0.5+25,
        -this.babyTail[this.babyTailIndex].height*0.5
    )
    // 3.3绘制小鱼眼睛
    ctx1.drawImage(
        this.babyEye[this.babyEyeIndex],
        -this.babyEye[this.babyEyeIndex].width*0.5,
        -this.babyEye[this.babyEyeIndex].height*0.5
    )

    ctx1.restore()
}
// 给小鱼添加一个吃饱的方法
babyObj.prototype.restart=function () {
    this.babyBodyIndexL=0;
}