class Product {
    name=""
    id=""
    color=""
    price=0
    quantity=0
    img=""
};

//importer json panier
let objBasket = localStorage.getItem("basket")
let objJson = JSON.parse(objBasket)
const basket = objJson
console.log(basket)
let numberObjects = getNumberProduct()
let totalPrice = getTotalPrice()

//chargement articles 
basket.forEach(element => {
    document.getElementById("cart__items").innerHTML += 
                `
                <article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                <div class="cart__item__img">
                  <img src="${element.image}" alt="${element.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${element.name}</h2>
                    <p>${element.color}</p>
                    <p>${element.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
                `;

})

//changement de quantité
document.getElementById("input#quantity")
        addEventListener('change', (event) => {
            let quantity = event.target.value
            addBasket({}, quantity)
        });
//total article
console.log(numberObjects)
document.getElementById("totalQuantity").innerHTML += 
                `${numberObjects}`

console.log(totalPrice)
document.getElementById("totalPrice").innerHTML += 
                `${totalPrice}`


//gestion du formulaire
let formBasket = document.getElementsByClassName("cart__order__form")

addEventListener('submit', function(e) {
  let verifText = /^[a-zA-Z-\séè]$/;
  let firstName = document.getElementById("firstName")

    if(firstName.value.trim()== ""){
      let Error = document.getElementById("firstNameErrorMsg")
      Error.innerHTML = "Le champ First name est requis."
      e.preventDefault()
  } 
  else if(verifText.test(firstName.value) == false){
      let Error = document.getElementById("firstNameErrorMsg")
      Error.innerHTML = "Le champ First name est requis."
      e.preventDefault()
  }
});



//commander