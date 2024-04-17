const cocktailList = document.getElementById('cocktailList');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalIngredients = document.getElementById('modalIngredients');
const comments = document.getElementById('comments');
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

// Fetch cocktails from API
fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    data.drinks.forEach(cocktail => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `<h3>${cocktail.strDrink}</h3><img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" style="width:100%"><p>${cocktail.strInstructions}</p>`;
      card.addEventListener('click', () => openModal(cocktail));
      cocktailList.appendChild(card);
    });
  });

// Open modal with cocktail details
function openModal(cocktail) {
  modalTitle.textContent = cocktail.strDrink;
  modalIngredients.textContent = `Ingredients: ${getIngredients(cocktail)}`;
  modal.style.display = 'block';
  fetchComments(cocktail.idDrink);
}

// Get ingredients for a cocktail
function getIngredients(cocktail) {
  let ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }
  return ingredients.join(', ');
}

// Fetch comments for a cocktail
function fetchComments(cocktailId) {
  // Fetch comments from your backend using the cocktailId
  // For now, let's assume the comments are hardcoded
  const dummyComments = [
    { user: 'User1', comment: 'Great cocktail!' },
    { user: 'User2', comment: 'I love it!' }
  ];
  comments.innerHTML = '';
  dummyComments.forEach(comment => {
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.textContent = `${comment.user}: ${comment.comment}`;
    comments.appendChild(commentElement);
  });
}

// Submit comment
commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const comment = commentInput.value;
  if (comment.trim() !== '') {
    // Send comment to your backend
    // For now, let's assume the comment is added to the DOM
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');
    commentElement.textContent = `User: ${comment}`;
    comments.appendChild(commentElement);
    commentInput.value = '';
  }
});

// Close modal
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('close')) {
    modal.style.display = 'none';
  }
});

// Like functionality (not implemented)
// You can add this feature similarly to the comment functionality
