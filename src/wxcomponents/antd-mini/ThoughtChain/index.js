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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { Component, getValueFromProps, triggerEventValues, } from '../../src/_util/simply';
import { ThoughtChainProps } from './props';
Component(ThoughtChainProps, 
// methods
{
    onContentTap: function (e) {
        triggerEventValues(this, 'contentTap', [e], e);
    },
    onTitleTap: function (e) {
        var _a = getValueFromProps(this, ['collapsible', 'onExpand']), collapsible = _a[0], onExpand = _a[1];
        if (!collapsible)
            return;
        // 受控模式
        if (onExpand && (collapsible === null || collapsible === void 0 ? void 0 : collapsible.expandedKeys)) {
            var expandedKeys = collapsible.expandedKeys;
            var key = e.currentTarget.dataset.key;
            var isExpandNow = expandedKeys.includes(key);
            var newExpandedKeys = __spreadArray([], expandedKeys, true);
            if (isExpandNow) {
                newExpandedKeys.splice(newExpandedKeys.indexOf(key), 1);
            }
            else {
                newExpandedKeys.push(key);
            }
            triggerEventValues(this, 'expand', [newExpandedKeys, key]);
        }
        else {
            var key = e.currentTarget.dataset.key;
            var foldStatusMap = __assign({}, this.data.foldStatusMap);
            var isFold = foldStatusMap[key];
            foldStatusMap[key] = !isFold;
            this.setData({
                foldStatusMap: foldStatusMap,
            });
        }
    },
}, 
// data
{
    foldStatusMap: {},
}, 
// mixins
undefined, 
// 生命周期方法
{});
