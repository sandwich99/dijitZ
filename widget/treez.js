define([
	'dojo/store/JsonRest',
	'assets/widget/gridz',
	'gridx/Grid',
	'gridx/core/model/cache/Async',
	'gridx/modules/Tree',
	'gridx/modules/ColumnResizer',
	// 'gridx/modules/extendedSelect/Row',
	'gridx/modules/select/Row',
	'gridx/modules/CellWidget',
	'gridx/modules/IndirectSelect',
	'gridx/modules/VirtualVScroller',
	'dojo/_base/declare',
	'dojo/store/Observable',
	'gridx/modules/RowHeader'
	],function(Store,Gridz,Grid,Cache,Tree,ColumnResizer,SelectRow,CellWidget,IndirectSelect
		,VirtualVScroller,declare,Observable,RowHeader){

		return declare(Gridz,{
			id:'',
			constructor:function(target,structure,dom,idProperty){

				// this._base = target;
				// if(!idProperty){
				// 	idProperty=structure[0].field;
				// }
				// this.id=idProperty;
				// var jsonStore = new Store({
				// 	target:target,
				// 	idProperty:idProperty,
				// 	maxLevel: 4,
				// 	maxChildrenCount: 20,
				// 	hasChildren:function(id,item){
				// 		return item&&item.isLeaf;
				// 	}
				// 	,
				// 	getChildren:function(item){
				// 		return this.query(item);
				// 	}
				// });

				this.jsonStore.hasChildren=function(id,item){
					return item&&item.isLeaf;
				}
				this.jsonStore.getChildren=function(item){
				 		return this.query(item);
				}



				// var store = Observable(jsonStore);

				this.modules=[
							Tree,
							ColumnResizer,
							SelectRow,
							CellWidget,
							// IndirectSelect,
							VirtualVScroller,
							RowHeader];



				// this.grid = new Grid({
				// 	cacheClass:Cache,
				// 	store:store,
				// 	structure:structure,
				// 	modules:[
				// 		Tree,
				// 		ColumnResizer,
				// 		ExtendedSelectRow,
				// 		CellWidget,
				// 		IndirectSelect,
				// 		VirtualVScroller,
				// 		RowHeader
				// 	],
				// 	autoHeight: true,
		  //       	pageSize:40,
		  //       	filterServerMode: false
				// });

				// if(dom){
				// 	this.grid.placeAt(dom);
				// }
			},

		// placeAt:function(dom){
		// 	this.grid.placeAt(dom);
		// },
		// startup:function(){
		// 	this.grid.startup();
		// },
		addRowClickCallback:function(callback){
			var g = this.grid;
			g.connect(g,"onRowClick",callback);
		},
		addNodeChild:function(parentItem,item){
			this.add(item);
		}
//		addButton:function(button){
//			this.grid.toolBar.widget.addChild(button);
//		},
//		refresh:function(){			
//			var g=this.grid,m=g.model;
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			m.clearCache();
//			g.body.refresh();
//		},
//		query:function(option){
//			var g =this.grid,m=g.model;
//
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			m.clearCache();
//			m.query(option);
//			g.body.refresh();
//		},
//		update:function(obj,option){
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			this.store.put(obj,option);
//
//		},
//		add:function(obj){
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}			
//			this.store.put(obj);
//
//		},
//		remove:function(id){
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			this.store.remove(id);
//
//		},
//		row:function(rowIds){
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			return this.grid.row(rowIds);
//		},
		// destroy: function(){
		// 	this.grid._uninit();
		// 	this.grid.inherited(arguments);
		// }
//		getSelected:function(){
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			return this.grid.select.row.getSelected();
//		},
//		getSelectItem:function(){
//			var rowids = this.grid.select.row.getSelected(),
//			that=this;
//			if(this.urlParamLifecycle){
//				this.clearUrlParam();
//			}
//			if(rowids){
//				if(rowids.length<2){
//					 
//				var item =	this.grid.row(rowids).item();
//				return this.jsonStore.get(item[that.id]);
//				}
//				console.log("you secected multi-line");
//			}
//			console.log("you hava not selected any one");
//		}
//
		});


	});