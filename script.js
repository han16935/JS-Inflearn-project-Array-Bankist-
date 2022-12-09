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

const inputLoginUsername = document.querySelector('.login__input--user');
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
containerApp.style.opacity = 1;

// 입금, 출금 내역 표시 함수
const displayMovements = function (arr) {
  arr.forEach(function (money, i) {
    const type = money > 0 ? 'deposit' : 'withdrawal';
    const movementsHTML = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">${
      i + 3
    } ${type.toUpperCase()}</div>
  <div class="movements__date">3 days ago</div>
  <div class="movements__value">${money}€</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', movementsHTML);
  });
};
displayMovements(movements);

// Summary 구현 함수(로그인 X)
const displaySummary = function () {
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
};

displaySummary();