import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-black-board2',
  templateUrl: './black-board2.component.html',
  styleUrls: ['./black-board2.component.css']
})
export class BlackBoard2Component implements OnInit {
  visible:boolean=true;
  state:{content:string,read:boolean};
  expandBoundary: number = 120;
  expand:boolean=false;
 @Input() editorVisible:boolean=false;
 @Input() width:number;
  constructor() { 
    this.sync();
    if(!this.state.content || this.state.read)
    this.visible=false;
  }
  sync(){
    if(this.state==undefined)
    this.state=JSON.parse(localStorage.getItem('BLACK_BOARD.state')) ||{}
    else
    localStorage.setItem('BLACK_BOARD.state',JSON.stringify(this.state));
  }
  readToggle(){
    this.state.read=!this.state.read;
    if(this.state.read)
    this.visible=false;
    this.sync();
  }
  editToggle(){
    this.editorVisible=!this.editorVisible
  }
  doneEditing(){
    this.state.read=false;
    this.editorVisible=false;
    this.sync();
  }

  ngOnInit() {
  }

}
