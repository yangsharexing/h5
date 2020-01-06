/**
 * 用于将$('form').serializeArray()获取的数组转换为对象
 */
window.formArray2Data=function(array=[]){
    var data={};
    for (var i = 0; i < array.length; i++) {
        data[array[i].name]=array[i].value;
    }
    return data;
};

function formatDate(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + '-';
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return YY + MM + DD +" "+hh + mm + ss;
}