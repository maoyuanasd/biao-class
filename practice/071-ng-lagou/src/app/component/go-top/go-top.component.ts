import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-top',
  templateUrl: './go-top.component.html',
  styleUrls: ['./go-top.component.css']
})
export class GoTopComponent implements OnInit {
  visibal: boolean = false;
  constructor() { }
 html=window.document.documentElement;
  ngOnInit() {
    window.addEventListener('scroll', e => {
      let scrolledTooMuch = this.html.scrollTop - window.innerHeight > 0
      this.visibal = scrolledTooMuch ? true : false;
    })
  }

  goTop(){
     let oneStep=()=>{
       let top =this.html.scrollTop
       if(top<=0)
       return
       let step=top*0.1
       window.scrollTo(0,top-step)
       requestAnimationFrame(oneStep)
     }
     requestAnimationFrame(oneStep)
  }
  goTopByInterval(){
    let timer=   setInterval(()=>{
      let top=this.html.scrollTop ;
      if(top<=0)
      clearInterval(timer)
      let step=top*0.04;
       window.scrollTo(0,top-step)
     },10)
  }
}
