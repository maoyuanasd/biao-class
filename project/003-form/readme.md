# form使用文档

## html

```html
<script src="form.js"></script>

```
## js

```js
// 取数据
let data=form.getData(你的form的名字);
    console.log(data);

// 存数据
let user = {
    name: '王花花',
    age: 18,
    email: '8888@qq.com',
    birthday: '1991-02-03',
    gender: 'female',
    orientation: ['male', 'car', ],
    balance: 1000,
  };
  form.setData(user,你的form的名字);
```

## 注意事项

轮播需要指定一个高度
