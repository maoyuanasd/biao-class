class Task implements TaskInterface{
    title:string;
    id?:number;
    completed?: boolean =false;
    toggle(){
        this.completed=!this.completed
    }
    setCompleted(val:boolean){
        this.completed=val
    }
}