define([
        'dojo/store/JsonRest',
        'gridx/Grid',
        'gridx/core/model/cache/Async',
        'gridx/modules/SingleSort',
        'gridx/modules/ColumnResizer',
        'dojo/store/Observable',
        'gridx/modules/pagination/Pagination',
        'gridx/modules/pagination/PaginationBar',
        "gridx/modules/CellWidget",
        'gridx/modules/IndirectSelect',
        'gridx/modules/RowHeader',
        'gridx/modules/select/Row',
        'gridx/modules/ToolBar',
        "dijit/_WidgetBase",
        'dojo/_base/declare',
        'dojo/parser',
        'dojo/_base/connect'
        ],function(Store,Grid,Cache,Sort,ColumnResizer,Observable,Pagination,PaginationBar,
                CellWidget,IndirectSelect,RowHeader,SelectRow,ToolBar,_WidgetBase,declare,parser,connect){
	
	//TODO list
    //了解JsonRest回调机制,解决add数据后无Id
    //研究gridx model cache 实现,使tree叶子节点可以冒泡为分支节点
    //修改treez的结构,使用treez,使用者应该自己实现hasChildren() 和getParent()方法



	var alive =3 //一直有效,直到被覆盖
		temp = 2,//临时
		waitRemove = 1,//等待删除
		empty = 0;//无参数
	
	var _formatUrl = function(url){
		return	(url+'/').replace(/\/+/g,"/");
	}


	var errhandler = function(err){

	}
	return	declare("gridz",null,{
		id:'',
		urlParamLifecycle:empty,
		modules:[Sort,
	             ColumnResizer,
	             Pagination,
	             PaginationBar,
	             CellWidget,
	             // IndirectSelect,
	             RowHeader,
	             SelectRow,
	             ToolBar],
	    domNode:'',
	    structure:null,
	    rowClickHandle:null,
		
		constructor:function(target,columns,dom,idProperty){
		
			if(!idProperty){
				idProperty=columns[0].field;//如果没有ID,则默认column的第一个字段为ID;
			}
			this.id=idProperty;
			this.structure=columns;
			var that = this;
			this.baseTarget = target;
			this.jsonStore = new Store({
				target:target,
				sortParam:"sort",
				idProperty:idProperty,
				headers:{"If-Modified-Since":"0"}
			});
			// var store = this.store;
			
			if(dom){
			this.domNode=dom;
			}
		},
		addUrlParam:function(param,isAlive){
			
			var t = this.baseTarget;
			
			this.jsonStore.target=_formatUrl(t+"/"+param+"/");
			if(isAlive){
				this.urlParamLifecycle=alive;//是否保持URL
			}else{	
			this.urlParamLifecycle=temp;
			}
			return this;
		},
		placeAt:function(dom){
			this.domNode=dom;
			// this.grid.placeAt(dom);
		},
		startup:function(){
			function selectClickRow(node){
				that.grid.select.row.clear();
				that.grid.select.row.selectById(node.rowId);
			}
			var that = this;
			this.store = new Observable(this.jsonStore);
			var g=this.grid = new Grid({
		        cacheClass: Cache,
		        store: that.store,
		        structure: that.structure,
		        modules:that.modules,
	        	autoHeight: true,
	        	pageSize:40,
	        	filterServerMode: false
		    });
		    this.rowClickHandle=g.connect(g,"onRowClick",selectClickRow);
			g.placeAt(this.domNode);
			g.startup();
		},
//		addButton:function(button){
//			this.grid.toolBar.widget.addChild(button);
//		},
		refresh:function(){			
			var g=this.grid,m=g.model;
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			m.clearCache();
			g.body.refresh();
		},
		query:function(option){
			var g =this.grid,m=g.model;

			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			m.clearCache();
			m.query(option);
			g.body.refresh();
		},
		update:function(obj,option){
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			this.store.put(obj,option);

		},
		add:function(obj){
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}			
			this.store.put(obj);

		},
		remove:function(id){
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			this.store.remove(id);

		},
		row:function(rowIds){
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			return this.grid.row(rowIds);
		},
		destroy: function(){
			connect.disconnect(this.rowClickHandle);
			this.grid._uninit();
			this.grid.inherited(arguments);
		},
		getSelected:function(){
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			return this.grid.select.row.getSelected();
		},
		getSelectItem:function(){

			var rowids = this.grid.select.row.getSelected(),
			that=this;
			if(this.urlParamLifecycle){
				this.clearUrlParam();
			}
			if(rowids){
				if(rowids.length<2){
					 
				var item =	this.grid.row(rowids).item();
				return this.jsonStore.get(item[that.id]);
				}
				console.log("you secected multi-line");
			}
			console.log("you hava not selected any one");
		},
		clearUrlParam:function(){
			var tmp = this.urlParamLifecycle;
			if(tmp===waitRemove){
				this.jsonStore.target = this.baseTarget;
				this.urlParamLifecycle=empty;
			}
			if(tmp===temp){
				this.urlParamLifecycle=waitRemove;
			}

			return this;
		}
		
	});
	
	
	
	
	
	
	
	
	
	
	
});
