import { Component, triggerEvent } from '../_util/simply';
import { EmptyFunctionalProps } from './props';
Component(EmptyFunctionalProps, {
    onClickButton: function (e) {
        var item = e.currentTarget.dataset.item;
        triggerEvent(this, 'clickButton', item);
    },
});
