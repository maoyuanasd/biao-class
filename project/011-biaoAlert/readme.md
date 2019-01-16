# biaoAlert使用文档

## 上手

```html
<link rel="stylesheet" href="biaoAlert.css">
<body>
</body>
<script src="biaoAlert-oop.js">
</script>
```

### 选项

```js
// 第一个传参 标题
// 第二个传参 配置
let b= new biaoAlert('余额不足，请充值', {
  desc    : '请前往我的余额进行充值', //描述
  type    : 'warn', // 信息类型
  timeout : 2000, // 多久自动消失
  onclick (config) { // 点击时做什么
    document.body.appendChild(config.el);
    console.log(config);
  },
  onopen () { // 信息显示时做什么
    console.log('打开');
  },
  onclose () { // 信息关闭时做什么
    console.log('关闭');
  },
});

```
