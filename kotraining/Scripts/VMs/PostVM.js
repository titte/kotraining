var PostVM = (function () {

    function PostVM(settings, initPostData) {
        var me = this;

        me.settings = settings;

        me.postId = ko.observable(initPostData ? initPostData.postId : -1);
        me.title = ko.observable(initPostData ? initPostData.title : '').extend({ editableText: false });
        me.slug = ko.computed(function () {
            return me.title().replace(' ', '-');
        });
        me.content = ko.observable(initPostData ? initPostData.content : '').extend({ editableText: false });
        me.tags = ko.observable('');
        me.displayTags = ko.computed(function () {
            return me.tags().split(',');
        });

        var updatePost = function (success) {
            if (me.title())
                $.ajax({
                    type: 'post',
                    url: me.settings.rootUrl + 'api/blogpost',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: ko.toJSON(me),
                    success: success
                });
        },
        delayUpdate = function () {
            setTimeout(function () {
                if (me.postId() > 0) {
                    updatePost();
                }
            }, 5000);
        };

        me.title.subscribe(function () {
            updatePost(function () {
            });
        });

        me.updatePost = updatePost;
    };

    return PostVM;

})();