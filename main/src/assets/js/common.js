//arrGetMode：传入一个纯数字数组，输出众数
function arrGetMode(arr){
    var arrMap = new Map();
    var key = arr[0],
        value = 1;
    arr.forEach((item, index) => {
        if (arrMap.get(item) !== undefined) {
            let num = arrMap.get(item);
            arrMap.set(item, ++num);
        } else {
            arrMap.set(item, 1);
        }
        if (arrMap.get(item) > value) {
            key = item;
            value = arrMap.get(item);
        }
    });
    return [key,value];
}
// sleep:延迟执行ms微秒
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export {arrGetMode,sleep}