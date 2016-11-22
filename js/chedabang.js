/**
 * 作者：车大棒
 * 开发日期：2016/11/15
 * 描述：通用图形库
 * 版权声明:
 *  (1) 本文件中的JavaScript代码与注释版权归原作者所有
 *  (2) 各位童鞋可以自由下载与传播本文件,但请勿用于商业用途。<(￣︶￣)>(*^__^*)<(￣︶￣)>
 */
function getClass(classname) //  类的写法
{
	//判断支持否
	if(document.getElementsByClassName) {
		return document.getElementsByClassName(classname);
	}
	var arr = []; //用于返回 数组选项
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
	this.id = $(id);
	this.drawLine();
}
Line.prototype = {
	contructor: Line,
	drawLine: function() {
		var data1 = new Object; //实例化一个data1，避免影响data。
		for(var k in data) {
			data1[k] = parseInt(this.id.offsetHeight - 50 - data[k]);
		}
		//补充一点，把这个玩意放到里面，然后再实例化。就不会造成原始的data数据修改。
		//这里的for循环恨重要，因为canvas的坐标轴起始点和平时咱们见到的折线图坐标不一样的。
		//所以需要for循环对这个数组值进行倒换。
		//（说实话这个超级简单的问题，根本就是小学生的算术，我当时第一想到却是利用排序。看到知识会的多也不是好事呀）
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
			//这些坐标轴以后估计得简化一下，这个轴线的浪费的代码太少了。
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
		for(var k in data1) {
			if(k == 0) {
				draw.moveTo(x, data1[k]);
			} else {
				draw.lineTo(x, data1[k]);
			}
			x += 60;

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
		
		//画坐标小圆点
		var x = 100;
		for(var k in data1) {
			draw.beginPath();
			draw.fillStyle = "red";
			if(k == 0) {
				draw.arc(x, data1[k], 5, 0, 2 * Math.PI, true);
			} else {
				draw.arc(x, data1[k], 5, 0, 2 * Math.PI, true);
			}
			x += 60;
			draw.closePath();
			draw.fill();
			//这里一定要注意呀，这个每画一个点都必须开始路径，并结束。否则颜色填充会填充出一大堆问题。
		}
	}
}

function Pie(data, id) {
	this.draw = $(id).getContext("2d");
	this.data = data;
	this.pie();
}
Pie.prototype = {
	contructor: Pie,
	pie: function() {
		var draw = this.draw;
		var num = 0;
		for(var k in data) {
			num += parseInt(data[k]);
		}
		colors = ["blue", "#49be38", "red", "green", "yellow", "pink", "#ff3365", "orange", "purple"]
		var startAngle = 0;
		var endAngle = 0;
		for(var k in data) {
			//绘制饼状图
			var endAngle = endAngle + 2 * Math.PI * (data[k] / num);
			draw.beginPath();
			draw.fillStyle = colors[k % 9];
			draw.moveTo(300, 300);
			draw.arc(300, 300, 200, startAngle, endAngle, false);
			draw.closePath();
			draw.fill();
			startAngle = endAngle;
			//绘制文字和形状
			draw.fillRect(700, 30 * (parseInt(k) + 1), 50, 20);
			draw.font = "bold 16px Microsoft Yahei";
			draw.textBaseline = "top"; //设置文本基线，一个冷门知识点。主要是因为老外的英语
			draw.moveTo(800, 30);
			draw.fillText("第" + (parseInt(k) + 1) + "个月份额", 760, 30 * (parseInt(k) + 1));
			var percent = Math.round((data[k] / num) * 10000) / 100 + "%";
			//var percent =(data[k]/num).toFixed(4) + "%";  原本这样能够得到四位小数点，但是一旦再乘上100，那么就会出问题。有几个数小数位变的很长。
			draw.fillText(percent, 870, 30 * (parseInt(k) + 1));
			//绘制矩形
			/*var ha = 0.034000000000001.toFixed(4)*100;
			console.log(ha);   例如这里输出就是3.4000000000000004*/

		}
	}
}


//绘制柱状图
function Bar(data, id) {
	this.draw = $(id).getContext("2d");
	this.data = data;
	console.log(this.data);
	this.id = $(id);
	this.bar();
}
Bar.prototype = {
	contructor: Bar,
	bar: function() {
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
		draw.fillText("Y轴", 50, 50);
		draw.fillText("X轴", 916, 550)

		//绘制坐标轴辅助线
		var x1 = 50;
		var x2 = 850;
		var x3 = 50;
		var y = 550;
		var yt = 0;
		var xt = 0;

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

		//绘制矩形
		var data1 = new Object;
		for(var k in data) {
		data1[k] = parseInt(this.id.offsetHeight - 50 - data[k]);
		}
		var x = 80;
		for(var k in this.data) {
			draw.beginPath();
			draw.fillStyle = "#008cd6";
			draw.fillRect(x, data1[k],30,data[k]);
			draw.closePath();
			x += 60;

		}
	}
}