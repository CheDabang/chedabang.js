/**
 * 作者：车大棒
 * 开发日期：2016/11/15
 * 描述：通用框架
 * 版权声明:
 *  (1) 本文件中的JavaScript代码与注释版权归原作者所有
 *  (2) 本文件中的中文注释版权归本人所有. 请自由下载与传播本文件,但请勿用于商业用途
 */
function getClass(classname)   //  类的写法
   {
       //判断支持否
       if(document.getElementsByClassName)
       {
           return document.getElementsByClassName(classname);
       }
       var arr = []; //用于返回 数组
       var dom = document.getElementsByTagName("*");
       for(var i=0;i<dom.length;i++)  // 遍历所有的 盒子
       {
           var txtarr = dom[i].className.split(" "); // 分割类名 并且 转换为数组
           //  ["demo","test"];
           for(var j=0;j<txtarr.length;j++)  // 遍历 通过类名分割的数组
           {
               if(txtarr[j] == classname)
               {
                   arr.push(dom[i]); // 我们要的是 div
               }
           }
       }
       return arr;
   }

    function $(str) {
        var s = str.charAt(0);   //  一个s 的变量 存放是 符号  #  .
        var ss = str.substr(1);  // demo
        switch(s)
        {
            case "#":
                return document.getElementById(ss);
            break;
            case ".":
                return getClass(ss);
            break;
            default :
                return document.getElementsByTagName(str);
        }
    }
