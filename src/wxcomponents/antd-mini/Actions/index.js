import { Component, triggerEvent } from '../../src/_util/simply';
import { ActionsProps } from './props';
Component(ActionsProps, {
    handleTapAction: function (e) {
        var action = e.currentTarget.dataset.action;
        triggerEvent(this, 'itemTap', action);
    },
});
