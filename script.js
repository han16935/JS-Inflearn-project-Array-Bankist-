'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

// inputLoginUsername.value에는 form 내부 txt가 저장
const inputLoginUsername = document.querySelector('.login__input--user');
// inputLoginUserPin.value에는 form 내부 txt가 저장
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// nav 아래 보이도록

// 입금, 출금 내역 표시 함수
const displayMovements = function (user) {
  containerMovements.innerHTML = '';
  user.movements.forEach(function (money, i) {
    const type = money > 0 ? 'deposit' : 'withdrawal';
    const movementsHTML = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type.toUpperCase()}</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${money}€</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', movementsHTML);
  });
};

/* Summary 구현 함수(로그인 X)
   - summary의 value--in : deposit의 합,
   - summary의 value--out : withdrawl의 합,
   - summary의 value--interest : interest의 합  
*/

const displaySummary = function (account) {
  let depositSum = 0;
  let withdrawlSum = 0;
  const movementsArr = document.querySelectorAll('.movements__value');
  movementsArr.forEach(function (money, i) {
    const euroMoney = money.textContent;
    const strMoney = euroMoney.slice(0, euroMoney.length - 1);
    const result = Number(strMoney);
    result > 0 ? (depositSum += result) : (withdrawlSum += result);
  });
  labelSumIn.textContent = `${depositSum}€`;
  labelSumOut.textContent = `${-withdrawlSum}€`;
  labelSumInterest.textContent = `${
    (depositSum * account.interestRate) / 100
  }€`;
};

/*
  calcDisplayBalance 함수
     - class="balance__value" 태그에 현재 계좌의 
       총액을 표기 
*/

const calcDisplayBalance = function (user) {
  const balance = user.movements.reduce((acc, v) => {
    return acc + v;
  }, 0);
  labelBalance.textContent = `${balance}€`;
};

/*
    user id 산출
      - user 객체에서 owner 속성을 가져와 이름 첫 글자의 소문자로 이루어진 문자열을 만들어 username 속성 만들기

      ex) 'Jonas Schmedtmann' => js
*/

const createUserName = function (accArr) {
  accArr.forEach(function (user, i) {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

//
btnLogin.addEventListener('click', function (e) {
  // button 태그에 type='submit' 입력하면 엔터 버튼 누름에 반응
  e.preventDefault(); // 브라우저가 'click' 동작에 대해 기본적인 반응을 하지 않도록(위 코드가 없으면 click이 잠깐 출력되다가 없어짐(prevent form from submitting))
  const inputId = inputLoginUsername.value;
  const inputPw = Number(inputLoginPin.value);
  const user = accounts.find(
    account => account.username === inputId && account.pin === inputPw
  );
  if (!user) console.log(`Please write valid data.`);
  else {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome Back, ${user.owner.split(' ')[0]}`;
    displayMovements(user);
    displaySummary(user);
    calcDisplayBalance(user);
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur(); // 로그인 후 pin form 에서 커서 깜박거리는 것을 없애줌
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferToUserName = inputTransferTo.value;
  const transferMoney = Number(inputTransferAmount.value);
  const transferToUser = accounts.find(
    (account, i) => account.owner === transferToUserName
  );
  console.log(transferToUser);
  const type = transferMoney > 0 ? 'deposit' : 'withdrawl';
  /*
  if (type === 'deposit') {
    user.movements.push(transferMoney);
    transferToUser.movements.push(-transferMoney);
  }

  if (type === 'withdrawl') {
    user.movements.push(-transferMoney);
    transferToUser.movements.push(-transferMoney);
  }
  */
});
