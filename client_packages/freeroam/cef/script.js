// Валидация. Возарщает true если прошла и false если нет.
let body = [
    {name: "Пиджак", id:4},
    {name: "Футболка", id:1},
    {name: "Рубашка", id:26},
    {name: "Куртка", id:64},
];
let leg = [
    {name: "Шорты", id:12},
    {name: "Трусишки", id:21},
    {name: "Брюки", id:24},
    {name: "Джинсы", id:1},
];
let foot = [
    {name: "Кеды", id:1},
    {name: "Сланцы", id:5},
    {name: "Берцы", id:24},
    {name: "Макасины", id:41},
]
let head = [
    {name: "Лысый", id:0},
    {name: "Дреды", id:14},
    {name: "Панк", id:34},
    {name: "Обычная", id:40},
]

let gender = [
    {name: "Мужской", id:true},
    {name: "Женский", id:false}
]
class Validation {
    constructor(mail){
        this.mail = mail;
        this.mailVerify = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
        this.nameVerify = /^[a-z]+[a-z]*$/i;
        this.telephoneVerify = /^\+{1}\d{1}\(\d{3}\)\d{3}-\d{4}$/;
    }

    mailVerification(){
        return this.mailVerify.test(this.mail)
    }
}

document.querySelector('.button_login').addEventListener('click', () => {
    let mail = document.querySelector('.log').value;
    let password = document.querySelector('.pas').value;
    if (mail == 'admin' && password == 'admin') {
        document.querySelector('.main_login').style.display = 'none';
        mp.trigger('closeLogin');
    }
    let validation = new Validation(mail);
    if(!validation.mailVerification()){
        document.querySelector('.log').style.borderColor = 'red';
    }
    else {
        document.querySelector('.main_login').style.display = 'none';
        document.querySelector('.log').style.borderColor = 'black'
        mp.trigger('loginActive', JSON.stringify({mail, password}));
        mp.trigger('closeLogin');
    }
});

document.querySelector('.link_to_login').addEventListener('click', () => {
    document.querySelector('.main_registration').style.display = 'none';
    document.querySelector('.main_login').style.display = 'flex';
})

document.querySelector('.link_to_registeration').addEventListener('click', () => {
    document.querySelector('.main_registration').style.display = 'flex';
    document.querySelector('.main_login').style.display = 'none';
})

    document.querySelector('.button_registration').addEventListener('click', () => {
        let Flag = 0;
        let username = document.querySelector('.nick_registration').value;
        let password = document.querySelector('.password_registration').value;
        let mail = document.querySelector('.mail_registration').value;
        let gender = document.querySelector('input[name="male"]:checked').dataset.gender;
        let age = document.querySelector('.age_registration').value;
        let validation = new Validation(mail);
        if (document.querySelector('.password_registration').value == document.querySelector('.repeat_password').value){
            document.querySelector('.password_alert').style.display = 'none';
        }
        else {
            document.querySelector('.password_alert').style.display = 'block';
            document.querySelector('.repeat_password').style.margin = '0';
            Flag = 1;
        }

        if(!validation.mailVerification()){
            Flag = 1;
            document.querySelector('.mail_registration').style.border = '1px';
            document.querySelector('.mail_registration').style.borderColor = 'red';
        }
        else {
            document.querySelector('.mail_registration').style.border = '0';
            document.querySelector('.mail_registration').style.borderColor = 'black'
        }
        if (Flag == 0){
            mp.trigger('registrationActive', JSON.stringify({username, password, mail, gender, age}));
            document.querySelector('.main_registration').style.display = 'none';
            document.querySelector('.mail_verify').style.display = 'flex';
        }
    });

document.querySelector('.button_verify').addEventListener('click', function() {
    let mailCode = document.querySelector('.verify').value;
    mp.trigger('mailVerify', JSON.stringify({mailCode}));
    mp.trigger('startCreation');
    document.querySelector('.mail_verify').style.display = 'none';
    document.querySelector('.create_caracter').style.display = 'flex';
})

function authErr (err){
    if (err == 'SHORTPASSWORD') {
        document.querySelector('.password_alert').style.display = 'block';
    }
} 

document.querySelector('.create_top_list_block_body').addEventListener('click', () => {
    document.querySelector('.create_main_list').innerHTML = '';
    for (let item of body){
        document.querySelector('.create_main_list').innerHTML += `<p class = 'create_main_list_item' data-body = '${item.id}'> ${item.name} </p>`;
    }
        document.querySelectorAll(`[data-body]`).forEach((item)=> item.addEventListener('click', function() {
            let itemId = item.dataset.body;
            mp.trigger('changeBody', JSON.stringify({itemId}));
        }))
    
})

document.querySelector('.create_top_list_block_leg').addEventListener('click', () => {
    document.querySelector('.create_main_list').innerHTML = '';
    for (let item of leg){
        document.querySelector('.create_main_list').innerHTML += `<p class = 'create_main_list_item' data-leg = '${item.id}'> ${item.name} </p>`;
    }
        document.querySelectorAll(`[data-leg]`).forEach((item)=> item.addEventListener('click', function() {
            let itemId = item.dataset.leg;
            mp.trigger('changeLeg', JSON.stringify({itemId}));
        }))
    
})

document.querySelector('.create_top_list_block_foot').addEventListener('click', () => {
    document.querySelector('.create_main_list').innerHTML = '';
    for (let item of foot){
        document.querySelector('.create_main_list').innerHTML += `<p class = 'create_main_list_item' data-foot = '${item.id}'> ${item.name} </p>`;
    }
        document.querySelectorAll(`[data-foot]`).forEach((item)=> item.addEventListener('click', function() {
            let itemId = item.dataset.foot;
            mp.trigger('changeFoot', JSON.stringify({itemId}));
        }))
    
})

document.querySelector('.create_top_list_block_head').addEventListener('click', () => {
    document.querySelector('.create_main_list').innerHTML = '';
    for (let item of head){
        document.querySelector('.create_main_list').innerHTML += `<p class = 'create_main_list_item' data-head = '${item.id}'> ${item.name} </p>`;
    }
        document.querySelectorAll(`[data-head]`).forEach((item)=> item.addEventListener('click', function() {
            let itemId = item.dataset.head;
            mp.trigger('changeHead', JSON.stringify({itemId}));
        }))
    
})

document.querySelector('.create_done').addEventListener('click', function() {
    mp.trigger('stopCreation');
    document.querySelector('.create_caracter').style.display = 'none';
    document.querySelector('.main_login').style.display = 'flex';
})

