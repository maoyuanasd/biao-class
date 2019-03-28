import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-black-board',
  templateUrl: './black-board.component.html',
  styleUrls: ['./black-board.component.css']
})
export class BlackBoardComponent implements OnInit {
 @Input()  visible:boolean =true;
 @Input()  editorVisible: boolean = false;
 @Input()  expandBoundary:number=120;
 @Input()  expand:boolean =false;
 @Input() width:number;
   state: { content?: string, read?: boolean }
   constructor() {

    this.sync();
    if(this.state.read || !this.state.content)
    this.visible = false;
    
   }
  
   toggle(){
     this.visible=!this.visible;
   }
   toggleEdit(){
     this.editorVisible=!this.editorVisible;
   }
   sync(){
     if (this.state === undefined)
     this.state = JSON.parse(localStorage.getItem('BLACK_BOARD.state')) || {};
   else
     localStorage.setItem('BLACK_BOARD.state', JSON.stringify(this.state));
   }
   toggleRead(){
     this.state.read=!this.state.read;
     if(this.state.read)
     this.visible=false;
     this.sync();
   }
   doneEditing(){
     this.editorVisible=false;
     this.state.read=false;
     this.sync();
   }
  
  ngOnInit() {
  }

}
