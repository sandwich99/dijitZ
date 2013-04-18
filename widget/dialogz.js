define([
	'dojo/_base/declare',
	'dojo/text!./template/dialogz.html',
	'dijit/Dialog',
	"dijit/_OnDijitClickMixin",
	"dijit/_TemplatedMixin",
	'dijit/_WidgetsInTemplateMixin',
	'dijit/form/Button'
	],function(declare,template,Dialog,_OnDijitClickMixin,_TemplatedMixin,_WidgetsInTemplateMixin){

		return declare("dialogz",[Dialog,_OnDijitClickMixin,_TemplatedMixin,_WidgetsInTemplateMixin],{

			templateString:template,

			postCreate:function(){
				this.inherited(arguments);
			}

		})




	});