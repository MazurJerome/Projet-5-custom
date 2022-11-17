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
                    <p>${element.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" onChange="changeQuantityCart(this.value,this.id);" class="itemQuantity" name="itemQuantity" id="${element.id}+${element.color}" color="${element.color}" min="1" max="100" value="${element.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onClick= "suppressionItem(this.parentElement)" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
                `;

})
//changement de la quantite via input
function changeQuantityCart(quantity, idC){
  const tabIdC = idC.split('+')
  const id = tabIdC[0]
  const color = tabIdC[1]

  changeQuantity(id, quantity, color)
  numberObjects = getNumberProduct()
  document.getElementById("totalQuantity").innerHTML = `${numberObjects}`
  totalPrice = getTotalPrice()
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`
}
//suppression via bouton
function suppressionItem(item) {
  console.log(item)
  let elem = item.parentElement
  console.log(elem)
  let elem1 = elem.nextSibling
  console.log(elem1)

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