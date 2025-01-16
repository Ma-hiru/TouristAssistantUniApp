import isFunction from 'lodash.isfunction';
import { Component, getValueFromProps, triggerEvent } from '../_util/simply';
import { componentsProps } from './props';
Component(componentsProps, {
    getCurTapVoucher: function (event) {
        var index = event.currentTarget.dataset.index;
        var dataSource = getValueFromProps(this, 'dataSource');
        return dataSource[index];
    },
    handleVoucherTap: function (e) {
        triggerEvent(this, 'voucherTap', this.getCurTapVoucher(e), e);
    },
    handleBtnTap: function (e) {
        var voucher = this.getCurTapVoucher(e);
        var _a = getValueFromProps(this, ['onBtnTap', 'onTap']), onBtnTap = _a[0], onTap = _a[1];
        if (isFunction(onBtnTap)) {
            triggerEvent(this, 'btnTap', voucher, e);
        }
        else if (isFunction(onTap)) {
            triggerEvent(this, 'tap', voucher, e);
        }
    },
}, undefined, undefined, undefined);
