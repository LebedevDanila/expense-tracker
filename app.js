class App {
  constructor() {
    this.history = [];

    /* selectors */
    this.historyList = document.querySelector('#list');
    this.income = document.querySelector('#income');
    this.expense = document.querySelector('#expense');
    this.balance = document.querySelector('#balance');

    /* initialization of the project */
    this.init();
  }
  init = () => {
    document.querySelector('.btn').addEventListener('click', this.addItem);
    this.historyList.addEventListener('click', this.removeItem);
  }
  addItem = (event) => {
    event.preventDefault();

    const titleField = document.querySelector('#field-title');
    const amountField = document.querySelector('#field-amount');

    if(!titleField.value || !amountField.value) {
      alert('Введите значения!');
      return false;
    }

    this.history.push({title: titleField.value, amount: Number(amountField.value)});

    titleField.value = '';
    amountField.value = '';

    this.render();
  }
  removeItem = (event) => {
    if(!event.target.closest('.delete-btn')) return false;

    const id = event.target.dataset.id;

    this.history.splice(id, 1);

    this.render();
  }
  render = () => {
    let incomesTotal = 0;
    let expensesTotal = 0;

    this.historyList.innerHTML = ``;

    this.history.forEach((item, id) => {
      /* show items */
      this.historyList.innerHTML += `
        <li class="${item.amount > 0 ? 'plus' : 'minus'}">
          ${item.title} <span>${item.amount}$</span> <button class="delete-btn" data-id="${id}">x</button>
        </li>
      `;

      /* calculate incomes and expenses */
      if(item.amount > 0) {
        incomesTotal += item.amount;
      } else {
        expensesTotal -= item.amount;
      }
    });

    this.income.innerHTML = '+$' + incomesTotal;
    this.expense.innerHTML = '-$' + expensesTotal;

    /* calculate balance */
    this.balance.innerHTML = '$' + (incomesTotal - expensesTotal);
  }
}

const app = new App();