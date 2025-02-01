import { Component, getValueFromProps, triggerEvent } from '../_util/simply';
import { PostscriptProps } from './props';
Component(PostscriptProps, {
    checkMaxLength: function (value) {
        var maxLength = Number(getValueFromProps(this, 'maxLength') || -1);
        if (maxLength !== -1 && value.length > maxLength) {
            return value.slice(0, maxLength);
        }
        return value;
    },
    handleInput: function (val) {
        var value = val;
        value = val.detail;
        this.setData({ content: value });
        triggerEvent(this, 'change', value);
    },
    handleQuickInput: function (e) {
        var value = e.currentTarget.dataset.value;
        var combineSymbol = getValueFromProps(this, 'combineSymbol');
        var result = this.checkMaxLength(combineSymbol
            ? "".concat(this.data.content ? "".concat(this.data.content).concat(combineSymbol) : '').concat(value)
            : value);
        this.setData({ content: result });
        triggerEvent(this, 'change', result);
    },
}, {
    content: '',
});
