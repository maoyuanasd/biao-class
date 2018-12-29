# dropdown使用文档

## 上手

```html
<link rel="stylesheet" href="biaoDropdown.css">
<script src="biaoDropdown.js"></script>
<script>
    biaoDropdown.boot('a','b') // 变量1 开关的类目  变量2 弹出层的类名
</script>
```
### 选项

```js
popup.boot('#trigger', '#popup', {
    position: 'left-top', // 位置：左上角，支持：center|top|bottom|left|right|top-left|top-right|bottom-left|bottom-right
    keyToHide: 'a', // 关闭快捷键
    on: 'dblclick', // 触发事件 click|dblclick
    offsetX: 100, // 在position基础上的横向偏移量
    offsetY: 100, // 在position基础上的纵向偏移量
});
```
