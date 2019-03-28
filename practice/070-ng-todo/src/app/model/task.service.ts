import { ApiService } from './../service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  list = [];
  constructor(private api: ApiService) { }
  private deleteLocal(id){
    this.list=this.list.filter(it=>it.id!=id);
  }
  private updateLocal(id,row) {
    let index=this.list.findIndex(it=>it.id==id)
    this.list[index]=row;
  }
  create(data:TaskInterface) {
    this.api.send('task/create', data).subscribe((r:any) => {
      this.list.unshift(r.data);
    })
  }
  delete(id:number){
    this.api.send('task/delete',{id}).subscribe((r:any)=>{
      this.deleteLocal(r.data.id);
    })
  }
  update(id:number,row:TaskInterface){
    row.id=id;
    this.api.send('task/update',row).subscribe((r:any)=>{
      this.updateLocal(id,r.data)
    })
  }
  read(param=null){
    this.api.send('task/read').subscribe((r:any)=>{
      this.list=r.data;
    })
  }
  find(id){
    return this.list.find(it=>it.id==id)
  }
}
