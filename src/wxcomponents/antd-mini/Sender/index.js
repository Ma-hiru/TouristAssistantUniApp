import { Component, getValueFromProps, triggerEvent, triggerEventOnly } from '../../src/_util/simply';
import { SenderProps } from './props';
Component(SenderProps, {
    handleMainBtn: function () {
        var loading = getValueFromProps(this, ['loading'])[0];
        if (loading) {
            this.handleCancel();
        }
        else {
            this.handleSubmit();
        }
    },
    handleSubmit: function () {
        var value = getValueFromProps(this, ['value'])[0];
        triggerEvent(this, 'submit', value);
    },
    handleCancel: function () {
        triggerEventOnly(this, 'cancel');
    },
    handleInput: function (e) {
        triggerEvent(this, 'change', e.detail.value);
    },
}, {}, [], {
    multipleSlots: true,
});
