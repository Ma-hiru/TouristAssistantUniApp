var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Component, getValueFromProps, triggerEventValues, } from '../../src/_util/simply';
import { ConversationsProps } from './props';
var maxTouchMove = 10;
Component(ConversationsProps, {
    onTouchStart: function (e) {
        // 这里需要通过 Touch 来实现点击效果，因为微信 movable-view 中的内容都不支持Tap
        var touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
    },
    onItemTap: function (e) {
        var touchEndX = e.changedTouches[0].clientX;
        var touchEndY = e.changedTouches[0].clientY;
        var deltaX = Math.abs(touchEndX - this.touchStartX);
        var deltaY = Math.abs(touchEndY - this.touchStartY);
        if (deltaX < maxTouchMove && deltaY < maxTouchMove) {
            var _a = e.currentTarget.dataset, item = _a.item, index = _a.index;
            triggerEventValues(this, 'itemTap', [item, index], e);
        }
    },
    onButtonTap: function (menu, e) {
        var menus = getValueFromProps(this, 'menus');
        var menuInfo, itemInfo;
        var _a = menu.currentTarget.dataset, itemW = _a.item, indexW = _a.index;
        menuInfo = __assign(__assign({}, menus[menu.detail.btnIdx]), { index: menu.detail.btnIdx });
        itemInfo = __assign(__assign({}, itemW), { index: indexW });
        triggerEventValues(this, 'menuItemTap', [menuInfo, itemInfo], e);
    },
});
