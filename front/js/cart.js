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


//changement de la quantite via input
function changeQuantityCart(quantity, idC){
  const tabIdC = idC.split('+')
  const id = tabIdC[0]
  const color = tabIdC[1]

  changeQuantity(id, quantity, color)
  basket.forEach(element => {
    if (element.id == id ){
      element.quantity = quantity
  }
  })
  
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

//test de toute les valeurs du formulaire
function testFormulaire (contact){
  let test = true
  for (const value in contact) {
    if (contact[value] == "0" ){
      test = false
    }
  }
  return test
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
      setTimeout(resolve,n*1000);
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
  let contact = {
    firstName: 0,
    lastName: 0,
    address: 0,
    city: 0,
    email: 0
  }

  
  //verification des formulaires
  form.firstName.addEventListener("change", function() {verifText(this,textRegExp)})
  form.lastName.addEventListener("change", function() {verifText(this,textRegExp)})
  form.address.addEventListener("change", function() {verifText(this,AdressRegExp)})
  form.city.addEventListener("change", function() {verifText(this,textRegExp)})
  form.email.addEventListener("change", function() {verifText(this,mailRegExp)})
  

  const verifText = function(text, regexp){
    const testInput = regexp.test(text.value)

    let messageForm = text.nextElementSibling
    if (testInput) {
      messageForm.innerHTML = "valide"
      messageForm.style.color = "#1CDB8C"
      let val = text.name
      contact[val] = text.value

    }
    else {
      messageForm.innerHTML = "non valide"
      messageForm.style.color = "#DB1C1C"
      console.log(text.value)
      let val = text.name
      contact[val] = "0"
    }
  }


  

//commander
function getFormData() { // Cette fonction enverra le tableau products et l'objet contact en cliquant sur le bouton "finaliser", en complément sendFormData()
  let products = [];
  for (let i = 0; i < basket.length; i++) {  // Itération du nombre d'articles par ID, pour l'envoi au serveur sous forme de tableau
   for (let j = 0; j < basket[i].quantity; j++) {
      products.push(basket[i].id);
    }
  }

  sendFormData({contact, products}); // Appel de la formule ci-dessous en prenant comme arguments les articles commandées et les infos du formulaire
}
function sendFormData(data) {
  fetch(APIProducts + "order", { // "order" pour la requette de commande
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response)
       // 201 si OK

      return response.json()
    })
    .then((response) => {
      const commande = response.orderId
      console.log(commande)
      window.location.href = "./confirmation.html?orderId="+commande // La page de confirmation est chargée
    })

    .catch((error) => {
      alert("Les informations ne sont pas en mesure d'être transmises à notre serveur", error)
    });

    console.log(data)   
}




const commande = document.getElementById("order")
      commande.addEventListener('click', (event) => {
      event.preventDefault()
      const valideForm = testFormulaire (contact)
      if(valideForm){
        getFormData()
      }
  })
