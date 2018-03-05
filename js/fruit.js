// 食物类
// 1.默认食物初始值创建初始化,不活动 false
// 2.总共食物30个
// 3.保持食物在(不停监视)屏幕上只有15个 出生一个食物  true
// 4.出生食物 随机挑选一个海葵
// 5.如果食物 飘出屏幕 状态改为false

// 食物循环产生  出生 15食物(true)  飘出去了变为false

//果实类
var fruitObj=function(){
    this.alive=[];            //当前食物是否活着
    this.orange=new Image();  //桔色图片
    this.blue=new Image;      //蓝色图片
    this.x=[];                //食物x坐标
    this.y=[];                //食物y坐标
    this.l=[];               //食物长度(由小变大)
    this.spd=[];             //食物速度(生长,向上飘移)
    this.fruitType=[];       //桔色 或蓝色
}
//添加初始化方法
fruitObj.prototype.num=30;
fruitObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;      //初始每一个食物活动
        this.x[i]=0;             //初始每个食物x和y坐标
        this.y[i]=0;
        this.l[i]=0;             //初始化长度
        //初始速度
        this.spd[i]=Math.random()*0.017+0.003;
        this.fruitType[i]="";
    }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
}
//添加绘制方法
fruitObj.prototype.draw=function () {
    // 如果食物活动状态才显示 并且绘制
    // 查找海葵
    for(var i=0;i<this.num;i++){
        // 判断当前食物是否活动状态
        if(this.alive[i]){
            //由于食物生长在某个海葵身上,位置再定
            //this.x[i]=i*16+100;
            if(this.l[i]<14){
            //.l 由小变大
             this.l[i]+=this.spd[i]*deltaTime;
            }else{
                //.y 向上飘动
                this.y[i]-=this.spd[i]*3*deltaTime;
            }
            // 指定颜色  蓝色 桔色
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            ctx2.drawImage(
                pic,
                this.x[i],   //出生食物在中间, this.l[i]*0.5
                this.y[i],
                this.l[i],
                this.l[i]
                // 浮出屏幕就把食物状态改为死

            );
            if(this.y[i]<10){
                this.alive[i]=false;
            };
        }
    }
}
// 创建函数:监听食物如果不足15个 就出生一个
function  fruitMonitor() {
    // 1:计算状态为true 食物有多少个
    // 2.如果数据少于15
    // 3.创建一个食物
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])num++;
    }
    if(num<7){
        sendFruit();
    }
}
// 创建一个食物
function sendFruit() {
    //查找状态为false 的一个食物
    //让食物出生 ->找一个海葵位置-> 设置xyl位置 状态类型随机, orange blue
    for(var i=0;i<fruit.num;i++){
        // 找一个状态为false 食物
        if(!fruit.alive[i]){
            fruit.born(i);  //出生一个食物
            return;         //退出循环
        }
    }
}
// 5.添加一个(食物)出生的方法
fruitObj.prototype.born=function (i) {
    // console.log(i)
    // 1.随机找一个海葵下标
    // 2.计算食物位置
    // 3.x
    // 4.y
    // 5.长度
    // 6.指定类型 橙色 蓝色
    var aneInx=Math.floor(Math.random()*ane.num);
    this.x[i]=ane.x[aneInx];
    this.y[i]=canHeight-ane.len[i];
    this.l[i]=0;
    this.alive[i]=true;
    this.fruitType[i]=Math.random()<0.9?"orange":"blue";
}
// 6.给食物谈价状态修改方法
fruitObj.prototype.dead=function (i) {
    this.alive[i]=false;
}