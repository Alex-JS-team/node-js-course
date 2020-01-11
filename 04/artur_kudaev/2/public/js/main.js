var render = function (template, node) {
	node.innerHTML = template;
};

var data = [
  {id: 0, name:"Овсяная каша с фруктами", img:"i/im1.jpg", price: 25, filter: "one"},
  {id: 1, name:"Яичница глазунья с овощами на сковородке", img:"i/im2.jpg", price: 25, filter: "two"},
  {id: 2, name:"Сет азербайджанский завтрак", img:"i/im3.jpg", price: 30, filter: "free"},
  {id: 3, name:"Яичница с помидорами по-бакински", img:"i/im4.jpg", price: 45, filter: "one"},
  {id: 4, name:"Сырники со сметаной", img:"i/im5.jpg", price: 45, filter: "two"},
  {id: 5, name:"Шпинатный крем-суп", img:"i/im6.jpg", price: 50, filter: "free"},
  {id: 6, name:"Суп Пити", img:"i/im7.jpg", price: 85, filter: "one"},
  {id: 7, name:"Борщ украинский", img:"i/im8.jpg", price: 95, filter: "two"},
  {id: 8, name:"Суп Кюфта Бозбаш", img:"i/im9.jpg", price: 100, filter: "free"},
  {id: 9, name:"Картофель фри", img:"i/im10.jpg", price: 125, filter: "one"},
  {id: 10, name:"Картофель по-домашнему", img:"i/im11.jpg", price: 135, filter: "two"},
  {id: 11, name:"Рис с овощами", img:"i/im12.jpg", price: 150, filter: "free"}
];

var writePrice = document.getElementById('write-price');
var writeNum = document.getElementById('price-num');
var priceNum = 0;
var priceIndex = 0;
var editData = data;
var maxPrice = 200;

function filter(str, n) {
   editData = data.filter(item => {
     return item.filter == str && item.price < n;
  })
}

function select1() {
  var e = document.getElementById("filter");
  var i = e.options[e.selectedIndex].value;

  var a = document.getElementById("filter1");
  var c = a.options[a.selectedIndex].value;

  if(c == 0) {
    c = maxPrice;
  }
  if(i == 1) {
    i = 'one';
  }else if(i == 2) {
    i = 'two'
  }else if(i == 3) {
    i = 'free'
  }else if(i == 0){
      editData = data.filter(item => {
        return item.filter != 'er' && item.price < c;
    })
    console.log(c)
    return start()
  }

  filter(i, c);
  start();
}

function setPrice(e) {
  let inputValue = e.parentElement.querySelector('.qty__item').value;
  if(!inputValue == 0) {
    priceNum += inputValue * data[e.getAttribute('data-btn')].price;
    writePrice.innerHTML = priceNum;
    priceIndex += Number(inputValue);
    writeNum.innerHTML = priceIndex;
  }
  replaceP();
  replaceN();
}

function replaceP() {
  if(priceNum === 0) {
    writePrice.innerHTML = 'XXX';
  }
}
replaceP()

function replaceN() {
  if(priceIndex === 0) {
    writeNum.innerHTML = 'XXX';
  }
}
replaceN()

function resetFields() {
  writePrice.innerHTML = 'XXX';
  writeNum.innerHTML = 'XXX';
}

document.querySelector('.btn-check').onclick = () => {
  document.querySelector('.modal-wrap').style.display = 'flex';
}

send = (e)=> {
  e.preventDefault()
  var name = document.querySelector('.name').value;
  var email = document.querySelector('.email').value;
  var spanName = document.querySelector('.name-wrap > .error');
  var spanEmail = document.querySelector('.email-wrap > .error');
  var nameErr = 'Введите мининмум 5 символов';
  var emailErr = 'Введите верный email';

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  var statusN = false;
  var statusE = false;

  if(name.length < 5) {
    spanName.innerHTML = nameErr;
  } else {
    spanName.innerHTML = '';
    statusN = true
  }
  if (!validateEmail(email)) {
    spanEmail.innerHTML = emailErr;
  } else {
    spanEmail.innerHTML = '';
    statusE = true
  }

  if(statusN && statusE) {
    document.querySelector('.modal-wrap').style.display = 'none';
    resetFields();
    document.getElementById("myForm").reset();
    setTimeout(()=>alert('Спасибо за покупку'),500)
  }
}

document.getElementById('send').addEventListener('click', send)

function start() {
  var template = editData.map(data=>
      `<div class="product-box__item">
        <h3 class="product-box__title">${data.name}</h3>
        <div class="product-box__img">
            <img class="img-fluid" src="${data.img}">
        </div>
        <div class="product-box__meta">
            <p>${data.price} грн.</p>
            <div class="qty">
                <input class="qty__item" min="0" value="0" type="number"> Кол
            </div>
            <button class="product-box__btn" onclick="setPrice(this)"  data-btn="${data.id}">Добавить</button>
        </div>
    </div>`
  ).join('');

  render(template, document.querySelector('#main'));
}

start()
