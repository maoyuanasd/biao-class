let todoForm = document.getElementById('todo-form');
let todoInput = todoForm.querySelector('[name=title]');
let todoList = document.getElementById('todo-list');

let catForm = document.getElementById('cat-form');
let catInput = catForm.querySelector('[name=name]');
let catList = document.getElementById('cat-list');
let addCat = document.getElementById('add-cat');


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
    bindToggleCatForm();
    bindCatSubmit();
    bindClickCatForm();
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
    })
}

function createTodo(row) {
    row.cat_id = $currentCatId;
    api('todo/create', row, r => {
        if (r.success) {
            readTodo();
            todoForm.reset();
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
            readTodo();
            todoForm.reset();
            $updatingTodoId = null;
        }
    })
}

function bindTodoSubmit() {
    todoForm.addEventListener('submit', e => {
        e.preventDefault();
        let title = todoInput.value;
        if (title == '')
            return;
        if ($updatingTodoId) {
            updateTodo($updatingTodoId, {
                title
            });
        } else {
            createTodo({
                title
            });
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
                    $updatingTodoId = it.id;
                    todoInput.value = it.title;
                }
            })
        })
    }
}