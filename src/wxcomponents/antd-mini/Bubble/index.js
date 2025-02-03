import { Component, getValueFromProps, triggerEventOnly } from '../_util/simply';
import { BubbleProps } from './props';
Component(BubbleProps, {
    startTyping: function () {
        var _this = this;
        var _a = getValueFromProps(this, [
            'loading',
            'typing',
            'content',
        ]), loading = _a[0], typing = _a[1], content = _a[2];
        if (loading) {
            return;
        }
        if (content) {
            var typingOptions = typing
                ? typing === true
                    ? { step: 1, interval: 100 }
                    : typing
                : false;
            if (typingOptions) {
                var _b = typingOptions.step, step_1 = _b === void 0 ? 1 : _b, _c = typingOptions.interval, interval_1 = _c === void 0 ? 100 : _c;
                var bubbleText_1 = content;
                // todo 待优化
                var typingLoop_1 = function (length, typedLength) {
                    var typingText = bubbleText_1.slice(0, typedLength);
                    _this.setData({
                        bubbleText: typingText,
                    });
                    if (typedLength < length) {
                        setTimeout(function () {
                            typingLoop_1(length, typedLength + step_1);
                        }, interval_1);
                    }
                    else {
                        triggerEventOnly(_this, 'typingComplete');
                    }
                };
                typingLoop_1(bubbleText_1.length, step_1);
            }
            else {
                this.setData({
                    bubbleText: content,
                });
                triggerEventOnly(this, 'typingComplete');
            }
        }
    },
}, {
    bubbleText: '',
}, [], {
    options: {
        // 使用基础库内置的数据变化观测器
        observers: true,
        multipleSlots: true,
    },
    observers: {
        loading: function (loading) {
            if (!loading) {
                this.startTyping();
            }
        },
    },
    attached: function () {
        this.startTyping();
    },
});
