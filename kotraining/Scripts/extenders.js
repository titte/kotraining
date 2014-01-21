ko.extenders.delayedSubscribe = function (target, options) {
    target.subscribe(function () {
        clearTimeout(target._delayedCallback);
        target._delayedCallback = setTimeout(options.callback, options.delay);
    });
}

ko.extenders.editableText = function (target, initial) {
    target.editingText = ko.observable(initial);

    target.editText = function () {
        target.editingText(true);
    };

    target.stopEditingText = function () {
        target.editingText(false);
    };
    return target;
};