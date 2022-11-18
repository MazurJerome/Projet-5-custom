function Recup (basket){
  fetch(APIProducts)
    .then(data => data.json())
    .then(jsonProduct => {
      jsonProduct.forEach(element => {
        basket.forEach(prod => {
          if(element._id == prod.id){
            prod.name = element.name
            prod.price = element.price
            prod.imageUrl = element.imageUrl
            prod.altTxt = element.altTxt
          }
        })
        })  
  })
}

//calcul du prix total
function getTotalPrice() {
  let total = 0
  for (let product of basket){
      total += product.quantity * product.price
  }
  return total
}


//importer json panier
let objBasket = localStorage.getItem("basket")
let objJson = JSON.parse(objBasket)
let basket = objJson
//recuperation du reste des infos produits
let recuperation = Recup(basket)
console.log(basket)

let numberObjects = getNumberProduct()
let totalPrice = getTotalPrice()
//chargement articles 

function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*100);
  });
}
async function myAsyncFunction(){
  await delay(1);
  
  basket.forEach(element => {
    document.getElementById("cart__items").innerHTML += 
                `
                <article class="cart__item" data-id="${element.id}" data-color="${element.color}">
                <div class="cart__item__img">
                  <img src="${element.imageUrl}" alt="${element.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${element.name}</h2>
                    <p>${element.color}</p>
                    <p>${element.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" onChange="changeQuantityCart(this.value,this.id);" class="itemQuantity" name="itemQuantity" id="${element.id}+${element.color}" color="${element.color}" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onClick= "suppressionItem(this.id)" id="${element.id}" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
                `;

})


totalPrice = getTotalPrice()
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`
}

myAsyncFunction();

//changement de la quantite via input
function changeQuantityCart(quantity, idC){
  const tabIdC = idC.split('+')
  const id = tabIdC[0]
  const color = tabIdC[1]

  changeQuantity(id, quantity, color)
  basket.forEach(element => {
    if (element.id = id ){
      element.quantity = quantity
  }
  });
  
  numberObjects = getNumberProduct()
  document.getElementById("totalQuantity").innerHTML = `${numberObjects}`
  
  totalPrice = getTotalPrice()

  document.getElementById("totalPrice").innerHTML = `${totalPrice}`
  
}
//suppression via bouton
function suppressionItem(item) {
  let panier = getBasket()
  panier = panier.filter (p => p.id != item)
  saveBasket(panier)
  window.location.reload()
  
}

//total article

document.getElementById("totalQuantity").innerHTML += 
                `${numberObjects}`

document.getElementById("totalPrice").innerHTML += 
                `${totalPrice}`
//gestion du formulaire

  let form = document.querySelector(".cart__order__form")
  let textRegExp = new RegExp('^[A-Za-z\é\è\ê\ô\ë\ï\ \-]{2,10}$')
  let AdressRegExp = new RegExp('^[0-9A-Za-z\é\è\ê\ô\ë\ï\ \-]+$')
  let mailRegExp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

  
  //verification des formulaires
  form.firstName.addEventListener("change", function() {verifText(this,textRegExp)})
  form.lastName.addEventListener("change", function() {verifText(this,textRegExp)})
  form.city.addEventListener("change", function() {verifText(this,textRegExp)})
  form.address.addEventListener("change", function() {verifText(this,AdressRegExp)})
  form.email.addEventListener("change", function() {verifText(this,mailRegExp)})
  

  const verifText = function(text, regexp){
    const testInput = regexp.test(text.value)

    let messageForm = text.nextElementSibling
   
    if (testInput) {
      messageForm.innerHTML = "valide"
      messageForm.style.color = "#1CDB8C"
    }
    else {
      messageForm.innerHTML = "non valide"
      messageForm.style.color = "#DB1C1C"
    }
  }


  

//commander