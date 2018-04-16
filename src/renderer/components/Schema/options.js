export default [
    {
        value: "@boolean",
        label: "布尔值",
    },
    {
        value: "id",
        label: "Id",
        children: [
            { label: "id", value: "@id" },
            { label: "guid", value: "@guid" },
            { label: "增量", value: "@increment" },
        ]
    },
    {
        value: "number",
        label: "数字",
        children: [
            { value: "@natural", label: "自然数" },
            { value: "@integer", label: "整数" },
            { value: "@float(0, 100000000, 2, 2)", label: "浮点数" }
        ]
    },
    {
        value: "string",
        label: "字符串",
        children: [
            {
                value: "character",
                label: "单个字符",
                children: [
                    { value: "@character('lower')", label: "小写" },
                    { value: "@character('upper')", label: "大写" },
                    { value: "@character('number')", label: "数字" },
                    { value: "@character('symbol')", label: "符号" },
                ]
            },
            {
                value: "name",
                label: "名字",
                children: [
                    { value: "@name", label: "英文" },
                    { value: "@cname", label: "中文" },
                ]
            },
            {
                value: "title",
                label: "标题",
                children: [
                    { value: "@title", label: "英文" },
                    { value: "@ctitle", label: "中文" },
                ]
            },
            {
                value: "sentence",
                label: "句子",
                children: [
                    { value: "@sentence", label: "英文" },
                    { value: "@csentence", label: "中文" },
                ]
            },
            {
                value: "paragraph",
                label: "段落",
                children: [
                    { value: "@paragraph", label: "英文" },
                    { value: "@cparagraph", label: "中文" },
                ]
            }
        ]
    },
    {
        value: "datetime",
        label: "时间",
        children: [
            {
                value: "@now",
                label: "现在",
            },
            {
                value: '@datetime("yyyy-MM-dd HH:mm:ss")',
                label: "yyyy-MM-dd HH:mm:ss",
            },
            {
                value: '@datetime("yyyy/MM/dd HH:mm:ss")',
                label: "yyyy/MM/dd HH:mm:ss",
            },
            {
                value: '@datetime("yyyy-MM-dd A HH:mm:ss")',
                label: "yyyy-MM-dd A HH:mm:ss",
            },
            {
                value: '@datetime("yyyy/MM/dd A HH:mm:ss")',
                label: "yyyy/MM/dd A HH:mm:ss",
            },
        ]
    },
    {
        value: "image",
        label: "图片",
        children: [
            {
                value: "@image('600x800', 'color', 'color', 'Hello Mock.js')",
                label: "600x800 (Mock.js)",
            },
            {
                value: "@image('800x600', 'color', 'color', 'Hello Mock.js')",
                label: "800x600 (Mock.js)",
            },
            {
                value: "@image('1024x768', 'color', 'color', 'Hello Mock.js')",
                label: "1024x768 (Mock.js)",
            },
            {
                value: "@image('1600x900', 'color', 'color', 'Hello Mock.js')",
                label: "1600x900 (Mock.js)",
            },
        ]
    },
    {
        value: "web",
        label: "Web",
        children: [
            { label: "URL", value: "@url" },
            { label: "域名", value: "@domain" },
            { label: "协议", value: "@protocol" },
            { label: "邮箱", value: "@email" },
            { label: "IP", value: "@ip" },
        ]
    },
    {
        value: "address",
        label: "地址",
        children: [
            { label: "地区", value: "@region" },
            { label: "省", value: "@province" },
            { label: "市", value: "@city" },
            { label: "县", value: "@county" },
            { label: "省 市 县", value: "@county(true)" },
        ]
    },
]
