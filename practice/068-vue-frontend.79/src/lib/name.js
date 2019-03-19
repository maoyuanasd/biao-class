export default function (row){
  return  row.$user? (row.$user.name || row.$user.username):'已注销'
}