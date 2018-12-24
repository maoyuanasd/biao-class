# table使用文档

## 上手

```html
<table id="order">
    <thead></thead>
    <tbody></tbody>
  </table>
  <script src="table.js"></script>
```

### 选项

```js
// 第一个传参 你的表格的名字 
// 第二个传参 你的数据索引
// 第三个传参 你的数据
// 第四个传参 你的行为 
table.boot('#order', orderThead, orderList, [{
      name: '删除',
      class: 'delet',
      action: (id, tr, i) => {
        orderList.forEach((el, index) => {
          if (el.id == id) {
            orderList.splice(index, 1);
          }
        });
        tr.remove();
        console.log(orderList)
      }
    }, {
      name: '修改',
      class: 'change',
      action: (id, tr, i) => {
        let children = tr.children;
        let startIndex = 0;
        for (let key in orderThead) {
          let td = children[startIndex];
          order = orderList[i]
          val = order[key];
          td.innerHTML = `<input value=${val}>`;
          let input = td.querySelector('input');
          input.addEventListener('keyup', e => {
            if (e.key != 'Enter')
              return;
            let newVal = input.value;
            let inputs=tr.querySelectorAll('input')
            
            td.innerHTML = val = newVal;
          })
          startIndex++;
        }
  
      }
});
```
