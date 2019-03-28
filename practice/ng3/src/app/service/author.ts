export default class Author {
    static instance=null;
    name='王花花';
    age=18;
    constructor(){
        if (Author.instance) {
            throw 'Author is a singleton, please use Author.new() to get the instance';
          }
    }
    static new(){
        if(!Author.instance){
            Author.instance=new Author();
        }
        return Author.instance;
    }
    greeting(){
        return `Yo,我叫${this.name}`;
    }
}