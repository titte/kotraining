var adminVM = (function () {

    var me = {
        init: function (settings) {
            me.settings = settings;

            $.ajax({
                type: 'GET',
                url: me.settings.rootUrl + 'api/site/GetCategories',
                success: function (data) {
                    me.categories(new CategoryVM(data,undefined,me.posts));

                    $.ajax({
                        type: 'GET',
                        url: me.settings.rootUrl + 'api/blogpost',
                        contentType: 'application/json',
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                me.posts.push(new PostVM(me.settings, data[i]));
                            }
                        }
                    });
                }
            });
        },
        categories: ko.observable(),
        getCategoriesTree: function(){
            return ko.mapping.fromJS(ko.mapping.toJS(me.categories));
        },
        posts: ko.observableArray(),
        newPost: function () {
            me.setAsActive('editpost', new PostVM(me.settings));
        },
        updatePost: function (post) {
            post.updatePost(function (data) {
                if (post.postId() <= 0) {
                    post.postId(data.postId);
                    me.posts.unshift(post);
                }
            })
        },
        homeClicked: function () {
            me.setAsActive('listallpostsdetailed', me.posts);
        },
        postClicked: function (vm) {
            me.setAsActive('editpost', vm);
        },
        categoryClicked: function(category){
            me.setAsActive('categoriespostsdetailed',category);
        },
        tagClicked: function (tag) {
            if (Object.prototype.toString.call(tag) === '[object String]') {
                tag = ko.utils.arrayFilter(me.tags(), function (item) {
                    return tag === item.title;
                })[0];
            }
            me.setAsActive('taggedpostsdetailed', tag);
        },
        editPost: function (post) {
            me.activeVM(post);
        },
        removePost: function (post) {
            me.posts.remove(post);
        }
    };

    me.activeVM = ko.observable(me.posts);
    me.activeVM.templateType = 'listallpostsdetailed';
    me.setAsActive = function (templateType, vm) {
        me.activeVM.templateType = templateType;
        me.activeVM(vm);
    };

    //Måste läggas till efter literalen "me" eftersom att en computed kommer att evalueras vid skapande och vi refererar till me i den
    me.recentPosts = ko.computed(function () {
        return me.posts.slice(0, 5);
    });

    me.tags = ko.computed(function () {
        var tagsHash = {},
            tags = [];
        ko.utils.arrayForEach(me.posts(), function (item) {
            var itemTags = item.tags().split(',');
            if (itemTags[0])
                for (var i = 0; i < itemTags.length; i++) {
                    itemTags[i] = itemTags[i].replace(/(^[\s]+|[\s]+$)/g, ''); //Ta bort whitespace från början/slut
                    if (tagsHash.hasOwnProperty(itemTags[i]))
                        tagsHash[itemTags[i]].push(item);
                    else
                        tagsHash[itemTags[i]] = [item];
                }
        });
        for (var prop in tagsHash)
            if (tagsHash.hasOwnProperty(prop))
                tags.push({ title: prop, items: tagsHash[prop] });
        return tags;
    });

    return me;
})();