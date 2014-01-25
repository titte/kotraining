var PostVM = (function () {

    function PostVM(settings, initPostData) {
        var me = this;

        me.settings = settings;

        me.postId = ko.observable(initPostData ? initPostData.postId : -1);
        me.createdOn = ko.observable(initPostData ? initPostData.createdOn : new Date());
        me.title = ko.observable(initPostData ? initPostData.title : '').extend({ editableText: false });
        me.categoryId = ko.observable(initPostData ? initPostData.categoryId : undefined);
        me.category = ko.observable();
        me.category.subscribe(function (newValue) {
            me.categoryId(newValue.categoryId());
            me.isEditingCategory(false);
        })
        me.isEditingCategory = ko.observable(false);
        me.slug = ko.computed(function () {
            var slug = me.title();
            if (me.category())
                (getAncestorName = function (category) {
                    slug = category.title() + '/' + slug;
                    var parent = ko.isObservable(category.parent) ? category.parent() : category.parent;
                    if (parent)
                        getAncestorName(parent);
                })(me.category());
            return '/' + slug.replace(' ', '-');
        });
        me.content = ko.observable(initPostData ? initPostData.content : '').extend({ editableText: false });
        me.tags = ko.observable(initPostData ? initPostData.tags : '');
        me.displayTags = ko.computed(function () {
            var tags = me.tags().split(',')
            for (var i = 0; i < tags.length; i++) {
                tags[i] = tags[i].replace(/(^[\s]+|[\s]+$)/g, '');
            }
            return tags;
        });

        me.updatePost = updatePost = function (success) {
            if (me.title()) {
                var data = ko.toJS(me);
                delete data.category;
                $.ajax({
                    type: me.postId() > 0 ? 'put' : 'post',
                    url: me.settings.rootUrl + 'api/blogpost',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: ko.toJSON(data),
                    success: success
                });
            }
        };
    };

    return PostVM;

})();