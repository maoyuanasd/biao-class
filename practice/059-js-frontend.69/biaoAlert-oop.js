;
(function () {
    class biaoAlert {
        constructor(title, {
            desc,
            onclick,
            onopen,
            onclose,
            containerClass = 'biao-alert-container',
            timeout = 5000,
            clickToClose = true,
            type = 'info'
        } = {}) {
            this.title = title;
            this.desc = desc;
            this.onclick = onclick;
            this.onopen = onopen;
            this.onclose = onclose;
            this.containerClass = containerClass;
            this.timeout = timeout;
            this.clickToClose = clickToClose;
            this.type = type;
            this.container = null;
            this.prepareEnv();
            this.render();
            this.showAlert();
            this.bindClickEvent();
        };
        prepareEnv() {
            this.container = this.getContainer();
            if (this.getContainer())
                return;
            let container = this.container = document.createElement('div');
            container.classList.add(this.containerClass);
            document.body.appendChild(container);
        };
        getContainer() {
            return document.querySelector('.' + this.containerClass)
        }
        render() {
            let el = document.createElement('div');
            el.classList.add('biao-alert');
            el.classList.add(this.type);
            el.innerHTML = `<div class="inner">
           <div class="title">${this.title}</div>
           ${this.desc ? `<div class="desc">${this.desc}</div>` : '' }
       </div>`;
            this.el = el;
        }
        showAlert() {
            this.container.appendChild(this.el);
            this.onopen && this.onopen(this);
            if (!this.timeout)
                return;
            setTimeout(() => {
                this.deletAlert();
            }, this.timeout)
        }
        deletAlert() {
            this.el.remove();
            this.onclose && this.onclose();
        }
        bindClickEvent(){
            this.el.addEventListener('click',e=>{
                if(this.clickToClose==true)
                this.deletAlert();
                this.onclick && this.onclick(this);
            })
        }
    };
    window.biaoAlert = biaoAlert;

})();