require(["sbt/dom", "sbt/config", "sbt/connections/controls/astream/ActivityStreamWrapper"], function(dom, config, ActivityStreamWrapper) {
    config.Properties["loginUi"] = "popup";
    var activityStreamWrapper = new ActivityStreamWrapper({
        feedUrl : "/basic/rest/activitystreams/urn:lsid:lconn.ibm.com:communities.community:%{sample.communityId}/@all/@status?rollup=true",
        activityStreamNode : "activityStream",
        shareBoxNode: "inputForm"
    });

    dom.byId("activityStreamDiv").appendChild(activityStreamWrapper.domNode);
    activityStreamWrapper.startup();
});