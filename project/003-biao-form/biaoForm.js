window.biaoForm={
    getData,
    setData, 
}

/**
 * 通过纯数据填充表单（存值）
 * @param {Object} data
 * @param {HTMLFormElement} form
 */

function getData(form) {
    let data = {};
    let inputs = form.querySelectorAll('[name]');
    inputs.forEach(it => {
        switch (it.type) {
            case 'number':
                data[it.name] = parseFloat(it.value);
                break;
            case 'date':
                data[it.name] = it.valueAsDate;
                break;
            case 'week':
                data[it.name] = it.valueAsDate;
                break;
            case 'radio':
                if (!it.checked)
                    return;
                data[it.name] = it.value;
                break;
            case 'checkbox':
                if (!Array.isArray(data[it.name]))
                    data[it.name] = [];
                if (it.checked == true)
                    data[it.name].push(it.value);
                break;
            default:
                data[it.name] = it.value;
                break;
        }
    });
    return data
}
/**
 * 通过纯数据填充表单（存值）
 * @param {Object} data
 * @param {HTMLFormElement} form
 */
function setData(data, form) {
    for (let key in data) {
        let val = data[key];
        let inputs = form.querySelector(`[name=${key}]`);
        switch (inputs.type) {
            case 'radio':
                let radio = form.querySelector(`[type=radio][name=${key}][value=${val}]`);
                radio && (radio.checked = true);
                break;
            case 'checkbox':
                val.forEach(it => {
                    let checkbox = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`);
                    checkbox && (checkbox.checked = true);
                });
                break;
            default:
                inputs.value = val;
                break;
        }
    }
}