import { Task } from './task';
import { Injectable } from '@angular/core';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  list=[];
  constructor(private api:ApiService) { }
  read(param=null){
   this.api.send('task/read').subscribe((r:any)=>{
     this.list=r.data;
   })
  }
  remove(id){
    this.api.send('task/delete',{id}).subscribe((r:any)=>{
      this.removeLocal(id);
    })
  }
  private removeLocal(id) {
    this.list=this.list.filter(it=>it.id!=id)
  }
  update(id,row){
    row.id=id;
    this.api.send('task/update',row).subscribe((r:any)=>{
      this.updateLocal(id,r.data)
    })
  }
  updateLocal(id,row){
    let index=this.list.findIndex(it=>it.id==id)
    this.list[index]=row;
  }
  create(row:Task){
    this.api.send('task/create',row).subscribe((r:any)=>{
      this.list.unshift(r.data)
    })
  }
}
