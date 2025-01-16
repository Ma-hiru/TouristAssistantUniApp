import { Component, getValueFromProps, triggerEvent, triggerEventOnly, } from '../_util/simply';
import { NumberInputProps } from './props';
var UNIT_LIST = [
    '百',
    '千',
    '万',
    '十万',
    '百万',
    '千万',
    '亿',
    '十亿',
    '百亿',
    '千亿',
];
Component(NumberInputProps, {
    // 统一处理输入值
    update: function (value) {
        this.setUnit(value);
        triggerEvent(this, 'change', value);
    },
    handleInput: function (val) {
        var value = val;
        value = val.detail;
        // 处理金额输入格式
        var formattedValue = this.formatAmount(value);
        var checkedValue = this.checkMaxValue(formattedValue);
        this.update(checkedValue);
    },
    handleQuickInput: function (e) {
        var value = e.currentTarget.dataset.value;
        this.update(value);
    },
    formatAmount: function (value) {
        var _a;
        // 移除非数字和小数点
        value = value.replace(/[^\d.]/g, '');
        // 保留两位小数
        var parts = value.split('.');
        if (parts.length > 2) {
            // 移除多余的小数点
            value = parts[0] + '.' + parts[1];
        }
        if (((_a = parts[1]) === null || _a === void 0 ? void 0 : _a.length) > 2) {
            // 保留两位小数
            value = parts[0] + '.' + parts[1].slice(0, 2);
        }
        return value;
    },
    checkMaxValue: function (value) {
        var maxValue = getValueFromProps(this, 'maxValue');
        if (Number(value) > maxValue) {
            return maxValue;
        }
        return value;
    },
    handleLinkTap: function () {
        triggerEventOnly(this, 'linkTap');
    },
    setUnit: function (value) {
        var intValue = parseInt(value);
        var unit = '';
        if (intValue) {
            unit = UNIT_LIST[intValue.toString().length - 3] || '';
        }
        this.setData({ unit: unit });
    },
}, {
    unit: '',
}, undefined, {
    attached: function () {
        this.triggerEvent('ref', this);
    },
});
