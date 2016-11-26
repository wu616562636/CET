function dim(pattern) {
    return document.querySelectorAll(pattern);
}
dim.prototype = {};
dim.component = [];

Array.prototype.removeAt = function(index) {
	for (var i = index, len = this.length; i < len; i++) {
		this[i] = this[i+1];
	}
	this.pop();
	return this;
}
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim=function(){
    return this.replace(/(^\s*)/g,"");
}
String.prototype.rtrim=function(){
   return this.replace(/(\s*$)/g,"");
}


dim.component.build = function(tag, component, properties) {
	return {
		tag: tag,
		component: component,
		properties: properties
	}
}

dim.component.submit = function(tag) {
	this.every(function(value) {
		if (value.tag === tag) {
			dim[tag] = value.component;
			for (var item in value.properties) {
				dim[tag][item] = value.properties[item];
			}
			return false;
		}
		return true;
	});
}
dim.component.add = function(tag, component, properties) {
	var com = dim.component.build(tag, component, properties);
	if (this.every(function(value, index) {
		if (value.tag === tag) {
			dim.component[index] = com;
			return false;
		} else {
			return true;
		}
	})) {
		this.push(com);
	}
	this.submit(tag);
}
dim.component.replace = function(tag, component, properties) {
	dim.component.add(tag, component, properties);
}
dim.component.remove= function(tag) {
	this.every(function(value, index) {
		if (value.tag === tag) {
			dim.component.removeAt(index);
		}
	});
}

//定义组件

//第一个组件，ajax
function getXMLHttpRequest(){
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest;
	} else if (window.ActiveXObject) {
		try {
			return new ActiveXObject("MSXML2.XMLHTTP");
		} catch(error) {
			try {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} catch (error) {
				console.log("XMLHTTPRequest does not support in your broswer");
				console.log(error);
			}
		}
	}
}
dim.namespace = {};
with(dim.namespace) {
	ajax = function(){};
	ajax.prototype.instance = getXMLHttpRequest();
	ajax.prototype.ajaxDefaultProperties = function() {};
	ajax.prototype.ajaxDefaultProperties.prototype = {
		method: "get",
		url: window.location,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		data: "engined=DIM",
		async: true,
		type: "JSON",
		timeout: 0,
		user: {
			username: null,
			password: null
		},
		success: function(data, xhr) {},
		error: function(xhr) {},
		complete: function(data, status) {},
		open: function(xhr) {},
		send: function(xhr) {},
		begin: function(xhr) {}
	};
	ajax.prototype.properties = new ajax.prototype.ajaxDefaultProperties();
	ajax.prototype.instance.onreadystatechange = function() {
		var xhr = this,
		    ajaxProperties = dim.ajax.properties;
		switch(this.readyState) {
			case 0:
			    break;
			case 1:
			    ajaxProperties.open(xhr);
			    break;
			case 2:
			    ajaxProperties.send(xhr);
			    break;
			case 3:
			    ajaxProperties.begin(xhr);
			    break;
			case 4:
			    if (this.status == 200) {
					if (!!xhr.responseXML) {
						ajaxProperties.success(xhr.responseXML, xhr);
						ajaxProperties.complete(xhr.responseXML, xhr.status == 200 ? 1 : 0);
					} else {
			    		ajaxProperties.success(xhr.responseText, xhr);
						ajaxProperties.complete(xhr.responseText, xhr.status == 200 ? 1 : 0);
			    	}
			    } else {
			    	ajaxProperties.error(xhr);
			    }
				ajaxProperties = new ajax.prototype.ajaxDefaultProperties();
			    break;

		}
	}
	dim.component.add("ajax", new ajax(), {
		status: {
			SUCCESS: 1,
			ERROR: 0
		},
		whenSuccess: function(fun) {
			this.properties.success = fun;
			return this;
		},
		whenError: function(fun) {
			this.properties.error = fun;
			return this;
		},
		whenComplete: function(fun) {
			this.properties.complete = fun;
			return this;
		},
		whenOpen: function(fun) {
			this.properties.open = fun;
			return this;
		},
		whenSend: function(fun) {
			this.properties.send = fun;
			return this;
		},
		setHeader: function(name, value) {
			this.properties.header[name] = value;
			return this;
		},
		setAsync: function(bool) {
			this.properties.async = bool;
			return this;
		},
		setData: function(data, type) {
			var str = "";
			for (var item in data) {
				str += item + "=" + data[item] + "&";
			}
			this.properties.data = str;
			return this;
		},
		setLoginKey: function(user) {
			this.properties.user = user;
		},
		setUrl: function(url) {
			this.properties.url = url;
			return this;
		},
		setMethod: function(method) {
			this.properties.method = method;
			return this;
		},
		setObject: function(object) {
			var proes = this.properties;
			for (var item in object) {
				if (item in this.proes) {
					proes[item] = object[item];
				}
			}
			return this;
		},
		start: function() {
			var properties = this.properties,
			    xhr = this.instance;
		    if (properties.method.toUpperCase() == "GET") {
				with (properties) {
					xhr.open("GET", url + "?" + data, async, user.username, user.password);
					for (var name in header) {
						xhr.setRequestHeader(name, header[name]);
					}
					xhr.send(null);
				}
			} else if (properties.method.toUpperCase() == "POST") {
				with(properties) {
					xhr.open("POST", url, async, user.username, user.password);
					for (var name in header) {
						xhr.setRequestHeader(name, header[name]);
					}
					xhr.send(data);
				}
			}
			return this;
		},
		stop: function() {
			this.instance.abort();
			return this;
		},
		clear: function() {
			this.properties = new ajax.prototype.ajaxDefaultProperties();
			return this;
		},
		setBegin: function(fun) {
			this.properties.begin = fun;
			return this;
		}
	});
}
//dim.ajax.setAsync(true).setUrl("/test.php").setMethod("POST").setData({
//	name: "hello",
//	age: 12
//}).whenSuccess(function(data) {
//	document.write(data);
//}).start();
