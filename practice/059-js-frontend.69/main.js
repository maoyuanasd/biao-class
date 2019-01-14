let todoForm = document.getElementById('todo-form');
let todoFieldset=todoForm.querySelector('fieldset');
let todoInput = todoForm.querySelector('[name=title]');
let todoList = document.getElementById('todo-list');
let todoDesc = todoForm.querySelector('[name=todo-desc]');
let notifyDate = todoForm.querySelector('[name=notify_date]')
let notifyTime = todoForm.querySelector('[name=notify_time]')
let more = document.getElementById('more');
let moreTrigger = document.getElementById('more-trigger');
let sound = document.getElementById('sound');
let setAsCurrent = document.getElementById('set-as-current');

let catForm = document.getElementById('cat-form');
let catInput = catForm.querySelector('[name=name]');
let catList = document.getElementById('cat-list');
let addCat = document.getElementById('add-cat');

let timer;
let $todoList;
let $catList;
let $updatingTodoId = null;
let $updatingCatId = null;
let $currentCatId = null;
boot();

function boot() {
    readCat();
    readTodo();
    bindEvents();
}

function bindEvents() {
    bindTodoSubmit();
    bindClickTodoForm();
    bindToggleCatForm();
    bindCatSubmit();
    bindClickCatForm();
}

function bindClickTodoForm() {
    todoForm.addEventListener('click', e => {
        let target = e.target;
        if (target == moreTrigger)
            toggleMore();
        if (target == setAsCurrent) {
            fillCurrentDate();
        }
    })
}

function fillCurrentDate() {
    let d = new Date;

    // ['2018-12-20', '14:22:02.278Z']
    let arr          = toLocalIsoString(d).split('T');
    // '14:22:02'
    let time         = arr[ 1 ].split('.')[ 0 ];
    // ['14', '22', '02']
    let timeArr      = time.split(':');
    // '2018-12-20'
    notifyDate.value = arr[ 0 ];
    // '14:22'
    notifyTime.value = timeArr[ 0 ] + ':' + timeArr[ 1 ];
}

function toLocalIsoString(date) {
    let d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return d.toISOString();
}

function toggleMore() {
    setMoreVisible(more.hidden);
}

function setMoreVisible(visible) {
    more.hidden = !visible;
    if (more.hidden == true)
        moreTrigger.innerText = '展开';
    if (more.hidden == false)
        moreTrigger.innerText = '收起';
}

function bindCatSubmit() {
    catForm.addEventListener('submit', e => {
        e.preventDefault();
        let name = catInput.value;
        if ($updatingCatId) {
            updateCat($updatingCatId, {
                name
            });
        } else {
            createCat({
                name
            });
        }
        setCatFormVisible(false);

    })
}

function bindClickCatForm() {
    catForm.addEventListener('click', e => {
        let target = e.target;
        if (target.classList.contains('cancel'))
            setCatFormVisible(false);

    })
}

function bindToggleCatForm() {
    addCat.addEventListener('click', e => {
        setCatFormVisible(true);
        catInput.focus();
    })
}

function setCatFormVisible(visible = true) {
    catForm.hidden = !visible;
    addCat.hidden = visible;
    if (catForm.hidden) {
        catForm.reset();
        $updatingTodoId = null;
    }
}

function readCat() {
    api('cat/read', null, r => {
        $catList = r.data || [];
        $catList.unshift({
            id: null,
            name: '默认',
        });
        console.log(r);
        renderCat();
        highlightCurrentCat();
    })
}

function createCat(row) {
    api('cat/create', row, r => {
        if (r.success) {
            readCat();
        }
    })
}

function removeCat(id) {
    if (!confirm('确认删除'))
        return;
    api('cat/delete', {
        id
    }, r => {
        readCat();
    })
}

function updateCat(id, row) {
    api('cat/update', {
        id,
        ...row
    }, r => {
        if (r.success) {
            readCat();
        }
    })
}

function highlightCurrentCat() {
    let items = catList.children;
    for (let i = 0; i < items.length; i++) {
        let it = items[i];
        if (it.$id == $currentCatId)
            it.classList.add('active');
        else
            it.classList.remove('active');
    }
}

function renderCat() {
    catList.innerHTML = '';
    $catList.forEach(it => {
        let item = document.createElement('div');
        item.$id = it.id;
        item.classList.add('item');
        item.innerHTML = `<span class="name">${it.name}</span>
       <span class="operations">
           <button class="fill">更新</button>
           <button class="delete">删除</button>
       </span>`;
        catList.appendChild(item);
        item.addEventListener('click', e => {
            let klass = e.target.classList;
            if (klass.contains('delete'))
                removeCat(it.id);
            if (klass.contains('fill')) {
                setCatFormVisible(true);
                catInput.value = it.name;
                $updatingCatId = it.id;
            }
            $currentCatId = it.id;
            highlightCurrentCat();
            readTodo();
        })
    })
}
// todo
function readTodo(params) {
    params = params || {};
    params.where = {
        and: {
            cat_id: $currentCatId,
        },
    };
    api('todo/read', params, r => {
        $todoList = r.data || [];
        console.log(r);
        renderTodo();
        notify();
    })
}

function createTodo(row) {
    row.cat_id = $currentCatId;
    api('todo/create', row, r => {
        if (r.success) {
            afterTodoChange ();
        }
    })

}

function setCompletedTodo(id, completed) {
    api('todo/update', {
        id,
        completed
    }, r => {
        if (r.success) {
            readTodo();
        }
    })
}

function removeTodo(id) {
    if (!confirm('确认删除'))
        return;
    api('todo/delete', {
        id
    }, r => {
        readTodo();
    })
}

function updateTodo(id, row) {
    api('todo/update', {
        id,
        ...row
    }, r => {
        if (r.success) {
            afterTodoChange ();
            $updatingTodoId = null;
        }
    })
}
function afterTodoChange (){
    readTodo();
    todoForm.reset();
    setMoreVisible(false);
    todoFieldset.disabled=false;
    todoInput.focus();
}
function bindTodoSubmit() {
    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        let row = {
            title: todoInput.value,
            desc: todoDesc.value,
        }
        if (notifyDate.value && notifyTime.value)
            row.notified_at = notifyDate.value + ' ' + notifyTime.value + ':00';


        if (row.title == '')
            return;
            console.log(todoFieldset)
            todoFieldset.disabled=true;
        if ($updatingTodoId) {
            updateTodo($updatingTodoId, row);
        } else {
            createTodo(row);
        }

    })
}

function renderTodo() {
    todoList.innerHTML = '';
    if ($todoList) {
        $todoList.forEach(it => {
            let item = document.createElement('div');
            item.classList.add('todo-item');
            item.innerHTML =
                `<div class="checkbox">
                        <input class="completed" type="checkbox" ${it.completed? 'checked':''}>
                    </div>
                    <div class="title">
                        ${it.title}
                    </div>
                    <div class="operations">
                        <button class="fill">更新</button>
                        <button class="delete">删除</button>
                    </div>`;
            todoList.appendChild(item);
            let checkbox = item.querySelector('.completed');
            checkbox.addEventListener('change', e => {
                setCompletedTodo(it.id, checkbox.checked);
            })
            let operations = item.querySelector('.operations');
            operations.addEventListener('click', e => {
                target = e.target;
                if (target.classList.contains('delete'))
                    removeTodo(it.id);
                if (target.classList.contains('fill')) {
                    if (it.notified_at) {
                        let dateArr = it.notified_at.split(' ');
                        let notifyTimeArr = dateArr[1].split(':');
                        notifyDate.value = dateArr[0];
                        notifyTime.value = notifyTimeArr[0]+':'+notifyTimeArr[1];
                    }
                    $updatingTodoId = it.id;
                    todoDesc.value = it.desc;
                    todoInput.value = it.title;
                    setMoreVisible(true);
                }
            })
        })
    }
}

function notify() {
    if (timer)
        return;
    timer = setInterval(() => {
        let now = Date.now();
        $todoList.forEach(it => {
            let d = new Date(it.notified_at);
            let then=d.getTime();
            if (now < then - 10 * 60 * 1000 || it.notified ||it.completed || then==0)
                return;
            new biaoAlert(it.title, {
                desc: it.desc,
            });
            playSound();
            let notified = it.notified = true;
            updateTodo(it.id, {
                notified
            })
        })
    }, 1000)
}

function playSound() {
    sound.play();
}