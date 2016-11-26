!(function(doc, win) {
    var docEle = doc.documentElement,//获取html元素
        event = "onorientationchange" in window ? "orientationchange" : "resize",//判断是屏幕旋转还是resize;
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 100 * (width / 1125) + "px");//设置html的fontSize，随着event的改变而改变。
        };
     
    win.addEventListener(event, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
 
}(document, window));
$(function(){
  //保存准考证
  $("#save img").mousedown(function(){
  	$(this).attr("src","img/imges/保存准考证按钮_按下.png");
  });
  $("#save img").mouseup(function(){
  	$(this).attr("src","img/imges/保存准考证按钮_弹起.png");
  	if ($("#number").val().length!=13)
  	{
  		$("#tip").show(30);
  	}
  	else{
		alert("保存成功！");
		$("#save img").attr("src","img/imges/修改准考证按钮_弹起.png");
		$("#save").attr({id:"modify"});
		$("#tip").hide();
		//不可编辑
  	    $("#ename input").attr("readonly",true);
  	    $("#enum input").attr("readonly",true);
  	    dim.ajax.setAsync(true).setUrl("/test.php").setMethod("POST").setData({
					name: "hello",
					age: 12
			}).whenSuccess(function(data) {
			document.write(data);
			}).start();

//		location.reload();
//		$(this).attr("src","img/imges/修改准考证按钮_弹起.png");
  	}
  })
  //修改准考证
  $("#modify img").mousedown(function(){
  	$(this).attr("src","img/images/修改准考证按钮_按下.png");
  })
  $("#modify img").mouseup(function(){
  	$(this).attr("src","img/imges/修改准考证按钮_弹起.png");
  	$("#tip").hide(30);
  	//可编辑
  	$("#name").attr("readonly",false);
  	$("#number").attr("readonly",false);
  	//清空输入框成原样
  	$("#number").val("");
  	$("#number").attr("placeholder","准考证号（13位）");
  	$(this).attr("src","img/imges/保存准考证按钮_弹起.png");
//	$("#modify").attr("id","#save");
  })
})
