var CategoryVM = (function () {

    function CategoryVM(data, parent, postsRef) {
        var me = this;
        me.categoryId = ko.observable(data.categoryId);
        me.title = ko.observable(data.title);
        me.nodes = ko.observableArray();
        me.parent = ko.observable(parent);
        me.isOpen = ko.observable(!Boolean(parent));
        me.posts = ko.computed(function () {
            return ko.utils.arrayFilter(postsRef(), function (post) {
                return post.categoryId() === me.categoryId();
            });
        });

        me.depth = ko.computed(function () {
            var depth = 0;
            if (me.parent())
                (deeper = function (parent) {
                    depth = depth + 1;
                    if (parent.parent())
                        deeper(parent.parent());
                })(me.parent());
            return depth;
        });

        me.isAncestorToOrIs = function (descendantId) {
            var retval = false;
            (goDeeper = function (category) {
                if (category.categoryId() === descendantId)
                    retval = true;
                for (var i = 0; i < category.nodes().length; i++)
                    goDeeper(category.nodes()[i]);
            })(me);
            return retval;
        };

        if (data.nodes)
            for (var i = 0; i < data.nodes.length; i++) {
                me.nodes.push(new CategoryVM(data.nodes[i], me, postsRef));
            }
    }
    return CategoryVM;
})();