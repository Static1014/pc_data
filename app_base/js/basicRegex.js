//身份证验证
function sfzReg(val){
	var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; // 数字
	if(val != null && val != ""){
	 	if(!reg.test(val)){
				alert('身份证件格式不正确');
				return false;
		}
	 	var c = 0;
	    var p = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	    for (var i = 0; i < 17; i++) {
	        var n = val.substr(i, 1);
	        n = parseInt(n);
	        c += p[i] * n;
	    }
	    var y = c % 11;
	    var r = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
	    var v = r[y];
	    if (v == 10)
	        v = 'x';
	    var l = val.substr(17, 1);
	    if (v != l.toLowerCase()) {
	    	alert('身份证件格式不正确');
			return false;
	    }
	}else{
		alert('身份证件不能为空');
		return false;
	}
	return true;
}

//手机正则表达式验证
function phoneReg(val){
	  var re = /^1\d{10}$/;//手机号码正则表达式
	  if(val != null && val != ""){
		  if(!re.test(val)){
		  alert('您输入的手机号码格式有错误，请重新填写！');
		  return false;
		  }
	  }
	  else{
			alert('手机号码不能为空');
			return false;
		}
  return true;
}
 

//校验固定电话
 function gddhReg(val){
	  var re = /^0\d{2,3}-?\d{7,8}$/;
	  if(val != null && val != ""){
		  if(!re.test(val)){
		  alert('您输入的固定电话格式有错误，请重新填写！');
		  return false;
		  }
	  }
	  else{
			alert('固定电话不能为空');
			return false;
	  }
  return true;
}

//校验手机和固定电话
  function phoneAndgddhReg(val,str){
	  var re = /^((0\d{2,3}-?\d{7,8})|(1\d{10}))$/;
	  if(val != null && val != ""){
		  if(!re.test(val)){
		  alert(str+'有错误，请重新填写！');
		  return false;
		  }
	  }
	  else{
		alert(str+'不能为空');
		return false;
	  }
	  return true;
}

//邮政编码
function yzbmReg(val,str){
	  var re = /^[0-9]\d{5}(?!\d)$/;
	  if(val != null && val != ""){
		  if(!re.test(val)){
		  alert(str+'格式不正确，请重新填写！');
		  return false;
		  }
	  }
	  else{
		alert(str+'不能为空');
		return false;
	  }
	  return true;
}


//验证数字
function numReg(val,str){
	  var re = /^[0-9]*$/;
	  if(val != null && val != ""){
		  if(!re.test(val)){
		 	 alert(str+'含有非法的字符！');
		  	 return false;
		  }
	  }
	  else{
	  	  alert(str+'不能为空！');
		  return false;
	  }
	  
	  return true;
}

//验证字符和数字
function numAndStrReg(val){
	  var re = /^[A-Za-z0-9]+$/;
	  if(val != null && val != ""){
		  if(!re.test(val)){
		 	 alert('您输入的内容含有非法的字符！');
		  	 return false;
		  }
	  }
	 return true; 
}

//验证非负整数和正浮点数
function floatReg(val,str){
	//var re = /^([1-9]\d*\.\d{1,})|(0\.\d{1,})|([0-9]\d*)$/;
	var re = /^\d+(\.\d+)?$/;
	if(val != null && val != ""){
		  if(!re.test(val)){
		 	 alert(str+'含有非法的字符！');
		 	 return false;
		  }
	}
	else{
		alert(str+'不能为空！');
		return false;
	}
	return true;
}

 



