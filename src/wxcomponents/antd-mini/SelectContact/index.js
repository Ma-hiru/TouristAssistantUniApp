import { Component, getValueFromProps, triggerEvent } from '../_util/simply';
import { SelectContactDefaultProps, } from './props';
import { AlphabetMap, getFirstLetterInMap, getId } from './util';
Component(SelectContactDefaultProps, {
    init: function () {
        var platform;
        // @ts-ignore
        platform = wx.getDeviceInfo().platform;
        this.setData({
            isIOS: /ios/gi.test(platform),
        });
        try {
            var _a = getValueFromProps(this, ['recommendContactsList', 'allContactsList']), recommendContactsListFromProps = _a[0], allContactsListFromProps = _a[1];
            var recommendContactsList = this.handleRecommendContacts(recommendContactsListFromProps);
            /** 全部联系人 */
            var allContactsList = this.handleAllContacts(allContactsListFromProps);
            /** 展示的联系人列表 */
            var contactsList = recommendContactsList.concat(allContactsList);
            /** 字母表 */
            var alphabet = this.generateAlphabet(contactsList);
            this.setData({
                recommendContactsList: recommendContactsList,
                allContactsList: allContactsList,
                alphabet: alphabet,
            });
        }
        catch (error) {
            var onError = getValueFromProps(this, 'onError');
            onError && onError(error);
            this.setData({
                contactListEmpty: true,
            });
        }
        finally {
            this.setData({
                loading: false,
            });
        }
    },
    /** 搜索栏输入 */
    onSearchInput: function (searchValue) {
        // 无搜索内容时
        if (!searchValue) {
            this.setData({
                searchValue: '',
                searchList: [],
                searchStatus: 'normal',
            });
        }
        else {
            this.setData({
                searchValue: searchValue,
                searchStatus: 'loading',
                searchList: [],
            });
            var searchContacts = getValueFromProps(this, 'searchContacts');
            var _a = searchContacts({
                keyword: searchValue,
            }).userInfos, userInfos = _a === void 0 ? [] : _a;
            // 将 em 标签包含的内容高亮显示
            userInfos.forEach(function (item) {
                item.nodes = [];
                item.displayName
                    .replace(/<\/em>/g, '<em>')
                    .split('<em>')
                    .forEach(function (str, index) {
                    if (index % 2) {
                        item.nodes.push({
                            text: str,
                            className: 'display-name__light',
                        });
                    }
                    else {
                        item.nodes.push({
                            text: str,
                            className: 'display-name__normal',
                        });
                    }
                });
                item.displayName = item.displayName
                    .replace(/<\/em>/g, '<em>')
                    .replace(/<em>/g, '');
            });
            this.setData({
                searchList: userInfos,
                searchStatus: userInfos.length > 0 ? 'normal' : 'empty',
            });
        }
    },
    /** 清空输入框内容 */
    onSearchClear: function () {
        this.setData({
            searchValue: '',
            searchList: [],
            searchStatus: 'normal',
        });
    },
    /** 输入框聚焦 */
    onSearchFocus: function () {
        this.setData({
            showSearch: true,
        });
    },
    /** 搜索栏返回 */
    onSearchCancel: function () {
        this.setData({
            searchValue: '',
            showSearch: false,
            searchStatus: 'normal',
            searchList: [],
        });
    },
    /** 联系人点击事件 */
    onItemClick: function (e) {
        var _a = e.currentTarget.dataset, item = _a.item, personSource = _a.personSource;
        triggerEvent(this, 'select', {
            userInfo: item,
            personSource: personSource,
            sessionId: getValueFromProps(this, 'sessionId'),
        });
    },
    /** 处理 推荐联系人 数据 */
    handleRecommendContacts: function (recommendUserInfos) {
        var recommendContactsList = recommendUserInfos.length === 0
            ? []
            : [
                {
                    name: '推荐',
                    value: recommendUserInfos,
                    className: 'first-level',
                    personSource: 'recommend',
                },
            ];
        return recommendContactsList;
    },
    /** 处理 全部联系人 数据 */
    handleAllContacts: function (contacts) {
        if (contacts.length === 0) {
            return [];
        }
        var allContactsList = [];
        var allContactsTempKey = [];
        contacts.forEach(function (item) {
            var firstLetter = getFirstLetterInMap(item.displayName);
            if (allContactsTempKey.indexOf(firstLetter) === -1) {
                allContactsList.push({
                    name: firstLetter,
                    value: [item],
                    personSource: 'all',
                });
                allContactsTempKey.push(firstLetter);
            }
            else {
                for (var index = 0; index < allContactsList.length; index++) {
                    if (allContactsList[index].name === firstLetter) {
                        allContactsList[index].value.push(item);
                    }
                }
            }
        });
        allContactsList.sort(function (a, b) {
            return AlphabetMap[a.name] > AlphabetMap[b.name] ? 1 : -1;
        });
        allContactsList.unshift({
            name: '全部联系人',
            value: [],
            className: 'first-level',
            personSource: 'all',
        });
        return allContactsList;
    },
    /** 根据 展示的联系人列表 生成 字母表 */
    generateAlphabet: function (contactsList) {
        var alphabet = [];
        contactsList.forEach(function (item) {
            if (item.name === '推荐') {
                alphabet.push('推');
            }
            else if (item.name !== '全部联系人') {
                alphabet.push(item.name);
            }
        });
        return alphabet;
    },
    /** 字母表滚动 */
    onScrollIntoView: function (alphabetItem) {
        var toView = getId(alphabetItem);
        this.setData({ toView: toView });
    },
    handleSearch: function () {
        this.setData({ searchable: true });
    },
    handleCancelSearch: function () {
        this.setData({ searchable: false });
    },
}, {
    /** 推荐联系人 */
    recommendContactsList: [],
    /** 全部联系人 */
    allContactsList: [],
    /** 字母表 */
    alphabet: [],
    /** 滚动到的 Element id */
    toView: '',
    /** 联系人为空 */
    contactListEmpty: false,
    /** 数据加载中 */
    loading: true,
    /** 输入框占位文案 */
    placeholder: '输入手机号、电子邮箱、好友姓名查找',
    /** 是否展示搜索页 */
    showSearch: false,
    /** 搜索关键词 */
    searchValue: '',
    /** 搜索页状态 */
    searchStatus: 'normal',
    /** 搜索结果 */
    searchList: [],
    /**
     * 是否是 IOS
     *
     * 由于 Andriod 对于 sticky 的兼容性太差（会覆盖右侧索引表），暂时只开放 IOS 的 sticky
     */
    isIOS: false,
    /** 全局删除推荐好友标识 */
    deleteRecommendUserFlag: false,
    /** 是否正在搜索 */
    searchable: false,
    onScrollIntoView: null,
}, [], {
    attached: function () {
        this.init();
        this.setData({ onScrollIntoView: this.onScrollIntoView.bind(this) });
    },
});
