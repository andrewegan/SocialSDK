require(["sbt/connections/CommunityService", "sbt/dom"], 
    function(CommunityService, dom) {
	    var createRow = function(title, communityUuid, isSub) {
	        var table = dom.byId("communitiesTable");
	        var tr = document.createElement("tr");
	        table.appendChild(tr);
	        var td = document.createElement("td");
	        td.appendChild(dom.createTextNode(title));
	        tr.appendChild(td);
	        td = document.createElement("td");
	        td.appendChild(dom.createTextNode(communityUuid));
	        tr.appendChild(td);
	        td = document.createElement("td");
	        td.appendChild(dom.createTextNode(isSub));
	        tr.appendChild(td);
	    };
    
    	var communityService = new CommunityService();
    	communityService.getPublicCommunities({ ps: 10 }).then(
            function(communities){
                if (communities.length == 0) {
                	dom.setText("content", "There are no public communities.");
                } else {
                    for(var i=0; i<communities.length; i++){
                        var community = communities[i];
                        var title = community.getTitle(); 
                        var communityUuid = community.getCommunityUuid(); 
                        var isSub = community.isSubCommunity();
                        createRow(title, communityUuid, isSub);
                    }
                }
            },
            function(error){
                dom.setText("content", "Error code:" +  error.code + ", message:" + error.message);
            }       
    	);
    }
);