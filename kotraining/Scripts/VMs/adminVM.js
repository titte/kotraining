//Create your mainVM JS object here

$(document).ready(function () {
    $("#frmCreate").hide();
    $("#frmRecent").hide();

    $("#btnCreate").click(function () {
        $("#frmCreate").show();
        $("#frmRecent").hide();
    });
});

// Using the Revealing pattern, where only the functions returned from the objects are exposed (vm is also self-instanciating)
var vm = (function () {

    var Post = function () {
        var self = this;
        self.title = ko.observable();
        self.slug = ko.observable();
        self.category = ko.observableArray(categories);
        self.content = ko.observable();
        self.tags = ko.observable();
    };

    function addPost() {
        recentPosts.push(postToAdd());
        tags.push(postToAdd.tags); // TODO: - Need to convert tags
        postData = new Post();
    };

    function openItem(item) {
        $("#frmCreate").hide();
        $("#frmRecent").show();     // TODO: - Move view logic outside vm!
        vm.postToAdd(item);
    };

    // TODO: Start - Replace with data from database
    var categoryData = [{ name: "Ett", v: "1" }, { name: "Två", v: "2" }, { name: "Tre", v: "3" }]; 
    var tagData = [{ name: "Tag1", v: "1" }, { name: "Tag2", v: "2" }]; 
    var examplePost = new Post();
    examplePost.title = 'Post no1';
    examplePost.slug = '/';
    examplePost.category = '1';
    var recentPostData = [examplePost];
    // TODO: End - Replace with data from database

    var postData = new Post();
    postData.title = 'Hello';
    var postToAdd = ko.observable(postData);
    var tags = ko.observableArray(tagData);
    var categories = ko.observableArray(categoryData);
    var recentPosts = ko.observableArray(recentPostData);

    // Using the Revealing pattern, where only the functions returned from the objects are exposed
    var vm = {
        postToAdd : postToAdd,
        recentPosts: recentPosts,
        tags: tags,
        categories: categories,
        addPost: addPost,
        openItem: openItem
    };

    return vm;
})();
ko.applyBindings(vm);

// Debug stuff
ko.bindingHandlers.debug =
{
    init: function (element, valueAccessor) {
        console.log('Knockoutbinding:');
        console.log(element);
        console.log(valueAccessor());
    }
};

