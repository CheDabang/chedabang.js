/**
 * 作者：车大棒
 * 开发日期：2016/11/15
 * 描述：通用图形库
 * 版权声明:
 *  (1) 本文件中的JavaScript代码与注释版权归原作者所有
 *  (2) 本文件中的中文注释版权归本人所有. 请自由下载与传播本文件,但请勿用于商业用途
 */
function getClass(classname) //  类的写法
{
	//判断支持否
	if(document.getElementsByClassName) {
		return document.getElementsByClassName(classname);
	}
	var arr = []; //用于返回 数组
	var dom = document.getElementsByTagName("*");
	for(var i = 0; i < dom.length; i++) // 遍历所有的 盒子
	{
		var txtarr = dom[i].className.split(" "); // 分割类名 并且 转换为数组
		//  ["demo","test"];
		for(var j = 0; j < txtarr.length; j++) // 遍历 通过类名分割的数组
		{
			if(txtarr[j] == classname) {
				arr.push(dom[i]); // 我们要的是 div
			}
		}
	}
	return arr;
}

function $(str) {
	var s = str.charAt(0); //  一个s 的变量 存放是 符号  #  .
	var ss = str.substr(1); // demo
	switch(s) {
		case "#":
			return document.getElementById(ss);
			break;
		case ".":
			return getClass(ss);
			break;
		default:
			return document.getElementsByTagName(str);
	}
}

function Line(data, id) {
	this.draw = $(id).getContext("2d");
	this.data = data;
	this.drawLine();
	this.point();
}
Line.prototype = {
	contructor: Line,
	drawLine: function() {
		var draw = this.draw;
		//开始绘制路径
		draw.beginPath();

		//绘制Y轴
		draw.moveTo(50, 550);
		draw.lineTo(50, 50);

		//绘制Y轴箭头
		draw.moveTo(45, 60);
		draw.lineTo(50, 50);
		draw.lineTo(55, 60);

		//绘制x轴
		draw.moveTo(50, 550);
		draw.lineTo(900, 550);

		//绘制X轴箭头
		draw.moveTo(890, 545);
		draw.lineTo(900, 550);
		draw.lineTo(890, 555);

		//设立原点0，以及x轴、y轴
		draw.font = "bold 16px Microsoft Yahei"
		draw.textAlign = "center";
		draw.fillText("0", 45, 566);
		draw.fillText("Y轴", 50, 45);
		draw.fillText("X轴", 916, 555)

		//绘制坐标轴辅助线
		var x1 = 50;
		var x2 = 850;
		var x3 = 50;
		var y = 550;
		var yt = 0;
		var xt = 0;

		//折线加点
		var x = 100;
		var k1 = 0;
		for(var k in data) {
			if(k == 0) {
				draw.moveTo(x, data[k]);
				draw.arc(x, data[k], 5, 0, 2 * Math.PI, false);
			} else {
				draw.lineTo(x, data[k]);
				draw.arc(x, data[k], 5, 0, 2 * Math.PI, false);
			}
			x += 60;
			var k1 = parseInt(k) + 1;

		}

		//绘制基本辅助线
		for(var i = 1; i <= 9; i++) {
			y -= 50;
			yt += 50;
			draw.moveTo(x1, y);
			draw.lineTo(x2, y);
			draw.textAlign = "end";
			draw.fillText(yt, x1, y);
			//draw.textAlign = "start";
		}

		//绘制底部轴
		for(var i = 1; i <= 12; i++) {
			xt++;
			x3 += 60;
			draw.fillText(xt + "月", x3, 566);
		}
		draw.stroke();
		draw.closePath();
		draw.save();
	},
	point: function() {
		var draw = this.draw;
					var x = 100;
					draw.beginPath();
					draw.fillStyle = "red";
					for(var k in data) {
						draw.beginPath();
						draw.fillStyle = "red";
						if(k == 0) {
							draw.arc(x, data[k], 5, 0, 2 * Math.PI, true);
						} else {
							draw.arc(x, data[k], 5, 0, 2 * Math.PI, true);
						}
						x += 60;
						draw.closePath();
						draw.fill();
					}
	
		draw.fillStyle = "red"; //填充颜色,默认是黑色
		draw.fill(); //画实心圆
		draw.closePath();

	}
}