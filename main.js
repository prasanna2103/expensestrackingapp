const form = document.querySelector('form');
const expensesDiv = document.querySelector('#expenses');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const expenseAmount = form.elements.expenseAmount.value;
  const description = form.elements.description.value;
  const category = form.elements.category.value;

  const expense = { expenseAmount, description, category };

  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  expensesDiv.innerHTML = expenses
    .map(
      (expense, index) => `
        <div>
          <p>Amount: $${expense.expenseAmount}</p>
          <p>Description: ${expense.description}</p>
          <p>Category: ${expense.category}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
          <button class="edit-btn" data-index="${index}">Edit</button>
        </div>
      `
    )
    .join('');

  form.reset();
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.dataset.index;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    expensesDiv.innerHTML = expenses
      .map(
        (expense, index) => `
          <div>
            <p>Amount: $${expense.expenseAmount}</p>
            <p>Description: ${expense.description}</p>
            <p>Category: ${expense.category}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
            <button class="edit-btn" data-index="${index}">Edit</button>
          </div>
        `
      )
      .join('');
  }

  if (event.target.classList.contains('edit-btn')) {
    const index = event.target.dataset.index;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const expense = expenses[index];

    form.elements.expenseAmount.value = expense.expenseAmount;
    form.elements.description.value = expense.description;
    form.elements.category.value = expense.category;

    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
});

