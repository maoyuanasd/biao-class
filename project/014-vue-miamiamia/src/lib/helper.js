export function fileUrl(fileData){
    return 'https://' + fileData._base_url + '/' + fileData._key;
}
export function url(part) {
    return location.origin + '/' + part;
  }
  export function obj2Arr(obj){
      let arr=[];
     for(let key in obj){
         arr.push(obj[key]);
     }
     return arr;
  }