###	关于CheDabang.js背景
如同往常一般，在博客论坛的溜达的时候。看见有人询问canvas画数据图画，不由的就拿起自己桌子上的《高三》温习了一下好久用到的canvas知识点。
打算自己练手用canvas画几个数据图，在画的时候脑子迸出一个想法。写上一堆数据图留着自己以后用。


###  使用说明：
1、折线图：
```
 new Line(data,id); 语法的格式
```
**具体实例**
```
<script type="text/javascript">
	var data = {
		0: 260,
		1: 200,
		2: 168,
		3: 450,
		4: 360,
		5: 320,
		6: 237,
		7: 189,
		8: 257,
		9: 389,
		10: 289,
		11: 236
	}
	var line = new Line(data, "#line");
</script>
```

这里首先按照此格式设置一个折线图的数据点，之后实例化Line构造函数。传入data数据，和你的canvasID值。之后就能够生成一个折线图。
2、饼状图：
```
new Pie(data,id);语法的格式
```
**具体实例**
```
<script type="text/javascript">
	var data = {
		0: 260,
		1: 200,
		2: 168,
		3: 450,
		4: 360,
		5: 320,
		6: 237,
		7: 189,
		8: 257,
		9: 389,
		10: 289,
		11: 236
	}
	var pie = new pie(data, "#pie");
</script>
```