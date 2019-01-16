import biaoForm from './biaoForm';
let user = {
    name: '王花花',
    age: 18,
    email: '8888@qq.com',
    birthday: '1991-02-03',
    gender: 'female',
    orientation: ['male', 'car', ],
    balance: 1000,
};
let bfb=biaoForm('#b');
bfb.setData(user);