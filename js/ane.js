//1.海葵类
var aneObj=function () {
    // 保存每个海葵x坐标
    this.x=[];
    // 保存每个海葵高度
    this.len=[];
}
// 2.保存海葵个数
aneObj.prototype.num=50;
// 3.初始化方法
aneObj.prototype.init=function() {
    for (var i = 0; i < this.num; i++) {
        // 3.1初始化每一个海葵x
        this.x[i]=i*16+Math.random()*20;
        // 3.2初始化每一个海葵高度
        this.len[i]=200+Math.random()*50;
    }
}
// 4.绘制方法
aneObj.prototype.draw=function(){
    // 4.0 保存海葵状态
    ctx2.save();
    // 4.1海葵颜色
    ctx2.strokeStyle="#3b154e";
    // 4.11透明度
    ctx2.globalAlpha=0.2;
    // 4.12 描边宽度
    ctx2.lineWidth=20;
    // 4.13 圆角
    ctx2.lineCap="round";
    // 4.1创建循环绘制每一个海葵
    for(var i=0; i<this.num;i++){
        ctx2.beginPath();
        // 4.2移动到底端
        ctx2.moveTo(this.x[i],canHeight);
        // 4.3向上描制一条直线
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);
        // 4.4描边
        ctx2.stroke();
    }
    // 4.10 恢复状态值
    ctx2.restore();
}

