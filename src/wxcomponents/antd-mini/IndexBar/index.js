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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import equal from 'fast-deep-equal';
import { getAllInstanceBoundingClientRect, getInstanceBoundingClientRect, } from '../_util/jsapi/get-instance-bounding-client-rect';
import { Component, getValueFromProps, triggerEventValues, } from '../_util/simply';
import { IndexBarDefaultProps } from './props';
Component(IndexBarDefaultProps, {
    getInstance: function () {
        if (this.$id) {
            return my;
        }
        return this;
    },
    init: function (nextProps) {
        var _this = this;
        var defaultCurrent = nextProps.defaultCurrent, current = nextProps.current, items = nextProps.items;
        this.initItemHeight();
        var initCurrent = this.isControlled(nextProps)
            ? current
            : defaultCurrent;
        var _index = items === null || items === void 0 ? void 0 : items.findIndex(function (u) { return initCurrent === u.label; });
        this.setData({
            currentKey: _index,
            touchKeyIndex: _index,
            touchKey: initCurrent,
        }, function () {
            _this.setData({
                touchKeyIndex: -1,
                touchKey: '',
            });
        });
    },
    isControlled: function (nextProps, valueKey) {
        if (valueKey === void 0) { valueKey = 'current'; }
        if ('controlled' in nextProps) {
            return nextProps.controlled;
        }
        return valueKey in nextProps;
    },
    // 初始化每个块的高度，用已计算滑动距离
    initItemHeight: function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getInstanceBoundingClientRect(this.getInstance(), "#ant-alphabet-0")];
                    case 1:
                        ret = _a.sent();
                        if (ret === null)
                            return [2 /*return*/];
                        height = ret.height;
                        this.setData({ itemHeight: height });
                        return [2 /*return*/];
                }
            });
        });
    },
    onTouchStart: function (e) {
        var moving = this.data.moving;
        var items = getValueFromProps(this, 'items');
        if (moving)
            return;
        var _a = e.currentTarget.dataset.item, item = _a.item, index = _a.index;
        var point = (e && e.touches && e.touches[0]) || {};
        var clientY = point.clientY;
        this.setData({
            touchClientY: clientY,
            touchKeyIndex: index,
            touchKey: items[index].label,
            moving: true,
            showMask: true,
            currentKey: index,
        });
        this.onAlphabetClick(item, index); // 触摸开始
    },
    onAlphabetClick: function (item, index) {
        return __awaiter(this, void 0, void 0, function () {
            var vibrate, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vibrate = getValueFromProps(this, 'vibrate');
                        // @ts-ignore
                        _a = vibrate;
                        if (!_a) 
                        // @ts-ignore
                        return [3 /*break*/, 2];
                        return [4 /*yield*/, wx.vibrateShort()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        // @ts-ignore
                        _a;
                        triggerEventValues(this, 'change', [item, index]);
                        return [2 /*return*/];
                }
            });
        });
    },
    onTouchEnd: function () {
        // 没进入moving状态就不处理
        if (!this.data.moving)
            return;
        this.setData({
            touchKeyIndex: -1,
            touchKey: '',
            showMask: false,
            moving: false,
        });
    },
    onTouchMove: function (e) {
        var _a = this.data, touchClientY = _a.touchClientY, touchKeyIndex = _a.touchKeyIndex, itemHeight = _a.itemHeight, touchKey = _a.touchKey;
        var items = getValueFromProps(this, 'items');
        var point = e.changedTouches[0];
        var movePageY = point.clientY;
        // 滑动距离
        var movingHeight = Math.abs(movePageY - touchClientY);
        // 滑动几个itemHeight的距离即等于滑动了几格，不那么精准，但是几乎可以忽略不计
        var movingNum = parseInt("".concat(movingHeight / itemHeight), 10);
        // 上 or 下
        var isUp = movePageY < touchClientY;
        // 新的触发的索引应该在哪个index
        var newIndex = isUp
            ? touchKeyIndex - movingNum
            : touchKeyIndex + movingNum;
        // 超出索引列表范围 or 索引没变化return
        if (!items[newIndex] || touchKey === items[newIndex].label)
            return;
        // 结算
        this.setData({ touchKey: items[newIndex].label, currentKey: newIndex });
        this.onAlphabetClick(items[newIndex], newIndex);
    },
    onScroll: function (e) {
        var _a = this.data, topRange = _a.topRange, currentKey = _a.currentKey, moving = _a.moving;
        var items = getValueFromProps(this, 'items');
        var scrollTop = e.detail.scrollTop;
        var newIndex = 0;
        if (scrollTop + 1 > topRange[topRange.length - 1]) {
            newIndex = topRange.length;
        }
        else {
            newIndex = topRange === null || topRange === void 0 ? void 0 : topRange.findIndex(function (h) { return scrollTop + 1 < h; });
        }
        if (currentKey !== newIndex - 1 && newIndex - 1 >= 0 && !moving) {
            this.setData({
                currentKey: newIndex - 1,
            });
            this.onAlphabetClick(items[newIndex - 1], newIndex - 1);
        }
    },
    initTopRange: function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getAllInstanceBoundingClientRect(this.getInstance(), '.ant-indexbar-side-list')];
                    case 1:
                        ret = _a.sent();
                        if (ret.length === 0)
                            return [2 /*return*/];
                        arr = [];
                        ret.forEach(function (u) {
                            arr.push(u.top - ret[0].top);
                        });
                        this.setData({ topRange: arr, hasDefaultSlot: !!ret[0].height });
                        return [2 /*return*/];
                }
            });
        });
    },
}, {
    touchClientY: 0,
    touchKeyIndex: -1,
    touchKey: '',
    itemHeight: 16,
    moving: false,
    showMask: false,
    currentKey: 0,
    topRange: [],
    hasDefaultSlot: true,
}, undefined, {
    attached: function () {
        this.init(getValueFromProps(this));
    },
    observers: {
        '**': function (data) {
            var prevData = this._prevData || this.data;
            this._prevData = __assign({}, data);
            if (!equal(prevData.items, data.items)) {
                this.init(data.items);
            }
            if (!equal(prevData.current, data.current)) {
                var _index = data.items.findIndex(function (u) { return data.current === u.label; });
                this.setData({
                    currentKey: _index,
                });
                if (!this.isControlled(data)) {
                    this.setData({
                        touchKeyIndex: _index,
                        touchKey: data.current,
                    });
                }
            }
        },
    },
});
