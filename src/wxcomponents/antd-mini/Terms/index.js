import equal from 'fast-deep-equal';
import createValue from '../mixins/value';
import { Component, getValueFromProps, triggerEvent, triggerEventValues, } from '../_util/simply';
import { DefaultProps } from './props';
Component(DefaultProps, {
    dealAllCountdown: function (val) {
        var _this = this;
        // 如果时间表的没有变，直接返回
        var newCountdownRecord = val.map(function (item) { return item.countdownTime; });
        if (equal(this.countdownTimeRecord, newCountdownRecord))
            return;
        this.setData({
            countdownArr: new Array(val.length),
        });
        newCountdownRecord.forEach(function (item, index) {
            if (item && item !== _this.countdownTimeRecord[index]) {
                _this.dealCountdown(item, index);
            }
        });
        this.countdownTimeRecord = newCountdownRecord; // 缓存每一项的倒计时时间，用来对比每一项的倒计时是否变化，决定要不要重置倒计时
    },
    dealCountdown: function (timeNum, index) {
        var _this = this;
        if (this.countdownTimerArr[index]) {
            clearTimeout(this.countdownTimerArr[index]);
        }
        var countdownArr = this.data.countdownArr;
        countdownArr[index] = timeNum;
        this.setData({
            countdownArr: countdownArr,
        });
        var countdownTimer = function (time) {
            countdownArr[index] = time;
            _this.setData({
                countdownArr: countdownArr,
            });
            _this.timer = setTimeout(function () {
                if (time - 1 > 0) {
                    countdownTimer(time - 1);
                }
                else {
                    countdownArr[index] = 0;
                    _this.setData({
                        countdownArr: countdownArr,
                    });
                    var buttons = getValueFromProps(_this, 'buttons');
                    var item = buttons[index];
                    triggerEventValues(_this, 'countdownFinish', [item, index]);
                }
            }, 1000);
        };
        countdownTimer(timeNum);
    },
    onCheckChange: function (value) {
        var checked;
        checked = value.detail;
        this.setData({
            checked: checked,
        });
        triggerEvent(this, 'checkChange', checked);
    },
    onTermPrefixTap: function () {
        var checked = this.data.checked;
        this.setData({
            checked: !checked,
        });
        triggerEvent(this, 'termPrefixTap', !checked);
    },
    onTermTap: function (event) {
        var _a = event.currentTarget.dataset, item = _a.item, index = _a.index;
        triggerEventValues(this, 'termTap', [item, index], event);
    },
    onButtonTap: function (event) {
        var _a = event.currentTarget.dataset, item = _a.item, index = _a.index;
        var checked = this.data.checked;
        triggerEventValues(this, 'buttonTap', [item, index, checked], event);
    },
    onReadSwiperTap: function (event) {
        var index = event.currentTarget.dataset.index;
        this.onReadChange({ detail: { current: index } });
    },
    onReadChange: function (event) {
        var current = event.detail.current;
        this.update(current);
        triggerEvent(this, 'readChange', current, event);
    },
}, {
    checked: false,
    countdownArr: [],
}, [
    createValue({
        valueKey: 'readCurrent',
        defaultValueKey: 'defaultReadCurrent',
    }),
], {
    attached: function () {
        this.countdownTimeRecord = []; // 缓存记录需要倒计时的项和时间，变化时用于判断要不要重置倒计时
        this.countdownTimerArr = []; // 记录倒计时timerId，方便销毁组件时销毁
        var buttons = getValueFromProps(this, 'buttons');
        if (Array.isArray(buttons) &&
            buttons.length &&
            buttons.some(function (item) { return item.countdownTime; })) {
            // 数组形式
            this.dealAllCountdown(buttons);
        }
    },
    observers: {
        'buttons': function (data) {
            if (Array.isArray(data.buttons) &&
                data.buttons.length &&
                data.buttons.some(function (item) { return item.countdownTime; })) {
                // 数组形式
                this.dealAllCountdown(data.buttons);
            }
        },
    },
});
