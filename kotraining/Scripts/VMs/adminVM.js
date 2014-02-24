//Create your mainVM JS object here

$(document).ready(function () {
    $("#frmCreate").hide();
    $("#frmRecent").hide();

    $("#btnCreate").click(function () {
        $("#frmCreate").show();
        $("#frmRecent").hide();
    });
});


var categories = [{ name: "Ett", v: "1" }, { name: "Två", v: "2" }, { name: "Tre", v: "3" }];

var PostVm = function () {
    var self = this;
    self.title = ko.observable();
    self.slug = ko.observable();
    self.category = ko.observableArray(categories);
    self.content = ko.observable();
    //this.tags = ko.observableArray();
    self.tags = ko.observable();

    $("#frmCreate").hide();
    $("#frmRecent").hide();

    //self.openItem = function (item) {
    //    $("#frmRecent").show();
    //    self.title = item.title;
    //};
};

var AdminVm = {

    recentList: new function () {
        this.recentPosts = ko.observableArray();
        this.tagPost = ko.observableArray();
        this.postToAdd = ko.observable(new PostVm());
        //this.categories = PostVm.category;
        this.addItem = function () {
            this.recentList.recentPosts.push(this.recentList.postToAdd());
            this.recentList.tagPost.push(this.recentList.postToAdd());
            this.recentList.postToAdd(new PostVm());
        },
        this.openItem = function (item) {
            $("#frmRecent").show();
            AdminVm.postToAdd(item);
        };

        //PostVm.category(categories);
        //this.recentList.PostVm.category(categories);
    }//,
    //tagsList: new function() {
    //    this.tagPost = ko.observableArray();
    //    this.postToAdd = ko.observable(new PostVm());
    //    this.addItem = function () {
    //        this.tagsList.tagPost.push(this.tagsList.postToAdd());
    //        //this.recentList.tagsList.push(this.recentList.postToAdd());
    //        //this.tagsList.tagList.push("Kalle");
    //        this.tagsList.postToAdd(new PostVm());
    //    };
    //}
};

