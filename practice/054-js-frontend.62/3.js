window.aaa={
    boot
}
function boot(num,sel){
  let  obj={};
  let form=document.querySelector(sel);
  
  kkk(num,obj);
form.addEventListener('submit',e=>{
  e.preventDefault();
  loop(obj);
})  
}
function kkk(num,obj){
    obj.arr=[];
    for(let i=0; i<num;i++){
        obj.arr.push(i);
    }
}
function loop(obj){
  obj.arr.forEach(it => {
      console.log(obj.arr.length);
  });
}