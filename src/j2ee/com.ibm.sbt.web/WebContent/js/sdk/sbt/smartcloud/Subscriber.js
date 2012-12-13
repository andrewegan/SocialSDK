/*
 * � Copyright IBM Corp. 2012
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at:
 * 
 * http://www.apache.org/licenses/LICENSE-2.0 
 * 
 * Unless required by applicable law or agreed to in writing, software 
 * distributed under the License is distributed on an "AS IS" BASIS, 
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or 
 * implied. See the License for the specific language governing 
 * permissions and limitations under the License.
 */
/**
 * Social Business Toolkit SDK.
 * @author Vimal Dhupar 
 * Definition of a Subscriber Helper for getting the Subscriber ID for a Smartcloud User.
 */
define(['sbt/_bridge/declare','sbt/Endpoint','sbt/smartcloud/core'],
		function(declare,Endpoint,core) {

/**
 * sbt.Subscriber.
 */
declare("sbt.Subscriber", null, {
	endpoint		: null, 
	constructor: function(endpoint,callback) {
		this.endpoint = endpoint; 
		if(callback) this.load(callback);
	},
	load : function(callback){
		var _self=this;
		this.endpoint.xhrGet({
				serviceUrl:	"/manage/oauth/getUserIdentity", 
				loginUi: this.endpoint.loginUi,
				handleAs:	"json",
				load: function(response) {
					callback(_self,response);
				},
				error: function(error){
					callback(_self,null);
					console.log("Error fetching feed for getUserIdentity");
				}
			});
	},
	getSubscriberId: function (response) {
	    if (response && response.subscriberid) {
	        return response.subscriberid;
	    }
		return null;
	}
});
return sbt.Subscriber;
});