define([
	'dojo/_base/Deferred',
//	'dijit/Dialog',
	'assets/widget/dialogz',
//	'dijit/form/Button',
	'dojo/_base/lang'
	],function(Deferred,Dialog,lang){
		return function(content,title){
			//callback,failback
			var dfd = new Deferred();

			//dfd.then(callback,failback);
//			success = lang.hitch(dfd,dfd.callback),
//			fail = lang.hitch(dfd,dfd.errback);
			var	c = 	document.createElement('div');
			c.innerHTML=content;
			new Dialog({
				title:title?title:"提示",
				onSubmit:function(){
					dfd.resolve();
					this.destroyRecursive();
				},
				onCancel:function(){
					dfd.reject();
					this.destroyRecursive();
				}
			},c).show();
			return dfd;
		}





	});