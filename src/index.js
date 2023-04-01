let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function buildCard(toy){
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src='${toy.image}' class='toy-avatar'>
      <p>${toy.likes}</p>
      <button class = "like-btn">Like!</button>
  `
  document.querySelector("#toy-collection").appendChild(card)
  
  card.querySelector(".like-btn").addEventListener("click", () => {
    toy.likes++
    card.querySelector('p').textContent=toy.likes
    updateToyLike(toy)
  })
}

function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(item => buildCard(item))
  })
}
function initialize(){
  getAllToys()
}

initialize()

function handleSubmit(e){
  e.preventDefault();
  let toyObject = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  buildCard(toyObject)
  getNewToy(toyObject)
}

document.querySelector('form').addEventListener('submit', handleSubmit)

function getNewToy(toyObject){
  fetch('http://localhost:3000/toys', {
  method: 'POST',    
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(toyObject)
  })
  .then(resp => resp.json())
}

function updateToyLike(toyObject){
  fetch(`http://localhost:3000/toys/${toyObject.id}`, {
    method: 'PATCH',
    headers:{
      'Content-Type' : 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObject)
  })
  .then (resp => resp.json())
}