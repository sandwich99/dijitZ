define([
        'dojo/Deferred',
        'dojo/_base/declare',
        'dojo/parser',
        'dojo/request/xhr',
        'dojo/json'
        ],function(deferred,declare,parser,ajax,JSON){
	
	
	
	
	var macErrorHanler = function(){
		var response = "{\"STATUS\":-2,\"MESSAGE\":\"'密码器控件未正确安装或被禁用，请正确安装后重启浏览器!'\"}";
		return  JSON.parse('(' + response + ')');
	};
	
	var errorlist = null;
	
	var SZM16A = new declare("macActive",null,{
		
		errorHanler:function(exception){
			var response = "{\"STATUS\":-1,\"MESSAGE\":\""+exception.message+"\"}";
			return  JSON.parse('(' + response + ')');
		},
		
		macErrorHanler:function(){
			alert('进来了');
			var response = "{\"STATUS\":-2,\"MESSAGE\":\"'密码器控件未正确安装或被禁用，请正确安装后重启浏览器!'\"}";
			return  JSON.parse('(' + response + ')');
		},
		
		constructor:function(){
			
			try{
				this.mac_reader = new ActiveXObject("SZM16A.PaymentMac");
				
				var that = this.mac_reader;
				
				//探测端口号，并设置当前通讯端口
				that.ExecuteCommand('{"COMMAND":1}',function(response){
			    	 var jsonresponse = JSON.parse('(' + response + ')');
			    	 if(jsonresponse.STATUS == 0){
					    	var port = jsonresponse.PORT;
					    	var command='{"COMMAND":10,"PORT":"'+port+'"}';
					    	that.ExecuteCommand(command,function(response){
					    	});
					  }
			    	
			    });
			}catch(e){
				this.mac_reader = null;
			}
			
		},
		//读取密码器编号
		read_SN:function(){
			
			var def = new deferred();
			
			try{
				if(this.mac_reader == null){
					
					 def.reject(macErrorHanler());	
				}
				var command = '{"COMMAND":2}'; 
			    this.mac_reader.ExecuteCommand(command,function(jsonResponse){
					     var response = JSON.parse('(' + jsonResponse + ')');
					     def.resolve(response);
				    });
				}catch(e){
			       def.reject(errorHanler(e));	
			}
			return def;
		},
		/**
		* 解锁密码器(异步)
		* unlockPass 解锁密钥 16位
		*/
		unlock:function(unlockPass){
			
			var def = new deferred();
			
			try{
				if(this.mac_reader == null){
					 def.reject(macErrorHanler());	
				}
				 var command = '{"COMMAND":4,"UNLOCKPASS":"'+unlockPass+'"}';
				 this.mac_reader.ExecuteCommand(command,function(response){
						  var jsonResponse = JSON.parse('(' + response + ')');
						  def.resolve(jsonResponse);
				 });
				}catch(e){
					  def.reject(errorHanler(e));	
			}
				
			return def;
			
		},
		//判定密码器是否为空
		IsEmpty:function(){
			
			var def = new deferred();
			
			try{
				if(this.mac_reader == null){
					 def.reject(macErrorHanler());	
				}
				 var command = '{"COMMAND":3,"UNLOCKPASS":"0000000000000000"}';
				 this.mac_reader.ExecuteCommand(command,function(response){
					  var jsonResponse = JSON.parse('(' + response + ')');
					  def.resolve(jsonResponse);
				 });
				}catch(e){
					 def.reject(errorHanler(e));	
			}
				
		    return def;
			
			
		},
		/**
		* 删除账号(异步)
		* unlockPass 解锁密钥 16位
		*/
		Publish:function(unlockPass){
			
			var def = new deferred();
			try{
				   if(this.mac_reader == null){
					    def.reject(macErrorHanler());	
				   }
				   var command = '{"COMMAND":3,"UNLOCKPASS":"'+unlockPass+'"}';
				   this.mac_reader.ExecuteCommand(command,function(response){
						  var jsonResponse = JSON.parse('(' + response + ')');
						  def.resolve(jsonResponse);
				 });
				}catch(e){
					def.reject(errorHanler(e));	
			}
				
		    return def;
			
		},
		/**
		* 删除账号(异步)
		* accNo 账号 32为 ‘0’-‘9’
		*/
		DeleteAccNo:function(accNo){
			
			var def = new deferred();
			try{
				   if(this.mac_reader == null){
					    def.reject(macErrorHanler());	
				   }
				   var command = '{"COMMAND":8,"ACCNO":"'+accNo+'"}';
				   this.mac_reader.ExecuteCommand(command,function(response){
						  var jsonResponse = JSON.parse('(' + response + ')');
						  
						  if(jsonResponse.STATUS == 0){
							  
							  def.resolve(jsonResponse);
						  }
						  else{
							  def.reject(jsonResponse);	
						  }
						  
				 });
				}catch(e){
					def.reject(errorHanler(e));	
			}
				
		    return def;
			
		},
		/**
		* 加载账号(异步)
		* accNo 账号 32为 ‘0’-‘9’
		* keyNO 密钥编号
		* AKZ  支付密钥
		*/
		LoadAccNo:function(accNo,keyNo,akz){
			
			var def = new deferred();
			try{
				   if(this.mac_reader == null){
					    def.reject(macErrorHanler());	
				   }
				   var command = '{"COMMAND":6,"ACCNO":"'+accNo+'","KEYNO":"'+keyNo+'","AKZ":"'+akz+'"}';
				   this.mac_reader.ExecuteCommand(command,function(response){
						  var jsonResponse = JSON.parse('(' + response + ')');
                          if(jsonResponse.STATUS == 0){
							  
							  def.resolve(jsonResponse);
						  }
						  else{
							  def.reject(jsonResponse);	
						  }
				 });
				}catch(e){
					def.reject(errorHanler(e));	
			}
				
		    return def;
			
		},
		/**
		* 生成账号密钥对(异步)
		* accNo 账号 32为 ‘0’-‘9’
		*/
		GetKeyPair:function(accNo){
			

			var def = new deferred();
			try{
				   if(this.mac_reader == null){
					    def.reject(macErrorHanler());	
				   }
				   var command = '{"COMMAND":5,"ACCNO":"'+accNo+'"}';
				   
				   this.mac_reader.ExecuteCommand(command,function(response){
					   
						  var jsonResponse = JSON.parse('(' + response + ')');
                          if(jsonResponse.STATUS == 0){
							  
							  def.resolve(jsonResponse);
						  }
						  else{
							  def.reject(jsonResponse);	
						  }
						  
				 });
				}catch(e){
					def.reject(errorHanler(e));	
			}
				
		    return def;
			
		},
		
		/**
		* 得到错误消息
		* status 状态码
		*/
		GetErrorMessage:function(status){
			
			if(errorlist == null){
				
				ajax("mac/mac/getMacError", {
				     method: "GET",
				     handleAs: "json", 
				     sync: true
				}).then(function(data){
					errorlist = data ;
				}, function(err){
					
				});
				return errorlist[status];
				
			}else{
				alert(errorlist);
				alert(status);
				return errorlist[status];
				
			}
			
		
			
			
			
			
		}
		
		
		
		
		
		
		
	});
	
	
	return {
		getInstance:function(){
			return SZM16A;
		}
	}
	
	
	
});
