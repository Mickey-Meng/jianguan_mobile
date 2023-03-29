//vant ui
import Vant from 'vant';

document.addEventListener('plusready', function () {
    var first = null;
    plus.key.addEventListener('backbutton', function () {
      if (!first) {
        first = new Date().getTime(); //记录第一次按下回退键的时间
        var urls = location.hash.split('/')[1]
        //var Currenturls = location.hash.split('/')[0]
  
        if (urls == "NewD" || urls == "StartScan") {
          // alert(urls);
          //history.go(-1);
        } else {
          history.back(-1);
        }
        setTimeout(function () {
          //0.5s中后清除，因为1s的间隔相对于太长，这样连续按两次就退出去，效果不好
          first = null;
        }, 500);
      } else {
        if (new Date().getTime() - first < 500) {
          // //如果两次按下的时间小于0.5s，同上
          // plus.runtime.quit(); //那么就退出app
          Vant.Dialog.confirm({
            message: '是否退出APP？',
          }).then(() => {
            plus.runtime.quit();
          }).catch(() => {
            // on cancel
          });
        }
      }
    });
  })
