export function fileUrl(fileData){
    return 'https://' + fileData._base_url + '/' + fileData._key;
}