# imageSlider使用文档

## html

```html
<link rel="stylesheet" href="imageSlider.css">
<script src="imageSlider.js"></script>

```
## js

```js
const slider = document.querySelector('你的轮播元素名字');
const items = slider.querySelectorAll('你的轮播元素下面的子元素的名字');

boot({
    mode: 'alternat', // 循环的模式,支持 'alternat' 交替循环  'slider' 轮播
    interval: 1000 // 循环时间;
});

```

## 注意事项

轮播需要制定一个高度
