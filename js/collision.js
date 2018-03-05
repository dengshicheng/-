// 碰撞检测
// 1.大鱼碰到食物的检测
function momFruitsCollision() {
    // 1.2获取每一个食物
    for(var i=0;i<fruit.num;i++){
        // 1.3判断食物状态是否为true
        if(fruit.alive[i]){
            // 1.4获取大鱼与食物的距离
           var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);// 返回的是距离的平方
            // 1.5如果小鱼与食物距离小鱼30px 吃食物
           if(l<900){
               // 1.6不推荐:如下方法修改当前食物状态
               // fruit.alive[i]=false;
               fruit.dead(i);
           }
        }
    }
}
// 2.小鱼碰到大鱼的检测
function momBabyCollision() {
    var l=calLength2(baby.x,baby.y,mom.x,mom.y);
    if(l<900){
        // baby.babyBodyIndex=0;
        baby.restart();
    }
}