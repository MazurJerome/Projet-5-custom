//
//
// fonctions
//
//
function productsFull (prod){
  fetch(APIProducts)
    .then(data => data.json())
    .then(jsonProduct => {
      for (i=0; i<jsonProduct.length;i++){
        prod[i]=jsonProduct[i]
      }
  })
}
//recuperation des infos non sauvegarder dans le local storage
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
//
//recuperation de la couleur
function changeQuantityCart(quantity, idC){
  const tabIdC = idC.split('+')
  const id = tabIdC[0]
  const color = tabIdC[1]
//changement de la quantité du produit de la couleur recuperé au dessus
  changeQuantity(id, quantity, color)
  //recuperation et affichage du nombre de produit et du prix total
  numberObjects = getNumberProduct()
  document.getElementById("totalQuantity").innerHTML = `${numberObjects}`

  totalPrice = getTotalPrice(listProducts)
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`
  
}

//suppression via bouton et rechargement pour actualiser
function suppressionItem(item) {
  let panier = getBasket()
  const tabIdC = item.split('+')
  const id = tabIdC[0]
  const color = tabIdC[1]
  //on prend bien l id et la couleur pour supprimer uniquement le produit voulu
  removeFromBasket(id, color)
  window.location.reload()
  
}

//verification de toutes les donnees du formulaire, si une seule est mauvaise return false
function testFormulaire (contact){
  let test = true
  for (const value in contact) {
    if (contact[value] == "0" ){
      test = false
    }
  }
  return test
}

// fonction qui permet de differe le chargement des articles
function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000)
  })
}

//fonction de chargement articles (1 seconde apres le chargement de la page pour recup tout les produits et leurs infos)
async function chargementProducts(){
  await delay(1)
  
  basket.forEach(element => {
    for (const product of element.option) {
      const productColor = product[0]
      const productQauntity = product[1]
      document.getElementById("cart__items").innerHTML += 
                `
                <article class="cart__item" data-id="${element.id}" data-color="${product.color}">
                <div class="cart__item__img">
                  <img src="${element.imageUrl}" alt="${element.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${element.name}</h2>
                    <p>${product.color}</p>
                    <p>${element.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" onChange="changeQuantityCart(this.value,this.id);" class="itemQuantity" name="itemQuantity" id="${element.id}+${product.color}" color="${product.color}" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onClick= "suppressionItem(this.id)" id="${element.id}+${product.color}" >Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
                `

}
    })
    
// on actualise le prix total
  totalPrice = getTotalPrice(listProducts)
  document.getElementById("totalPrice").innerHTML = `${totalPrice}`
  objBasket = localStorage.getItem("basket")
  basket = JSON.parse(objBasket)
}

//fonction de test des formulaires, prend la valeur a tester et la regexp a appliquer
function verifText(text, regexp){
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

//fonction pour creer le tableau products( a partir de basket) et l'envoyer avec l'objet contact en cliquant sur commander,
// a la fonction sendFormData()
function getFormData() { 
  let products = [];
  // creation d un tableau contenant tous les id
  for (let i = 0; i < basket.length; i++) {  
   for (let j = 0; j < basket[i].quantity; j++) {
      products.push(basket[i].id);
    }
  }
  // Appel de la fonction ci-dessous en prenant comme arguments les articles commandées et les infos du formulaire
  sendFormData({contact, products}); 
}

//fonction d'envoi de la requete post pour recuperer le numero de commande
function sendFormData(data) {
  fetch(APIProducts + "order", { //order pour la requette de commande
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
       // 201 si OK
      return response.json()
    })
    .then((response) => {
      //creation de l'url contenant le numero de commande et chargement de la page de confirmation
      const commande = response.orderId
      console.log(commande)
      window.location.href = "./confirmation.html?orderId="+commande
    })
//verification d'erreur
    .catch((error) => {
      alert("Les informations ne sont pas en mesure d'être transmises à notre serveur", error)
    })  
}
//
//fin des fonctions
//
//debut du code
//
  
//importer du panier a partir du locla storage
let listProducts = []
productsFull(listProducts)
let objBasket = localStorage.getItem("basket")
let basket = JSON.parse(objBasket)

//recuperation du reste des infos produits
let recuperation = Recup(basket)
//chargement des produits
chargementProducts()
//calcul du total
let numberObjects = getNumberProduct()
//affichage de la quantite de produits et du prix total
document.getElementById("totalQuantity").innerHTML += 
                `${numberObjects}`
//gestion du formulaire
//declaration des differentes regexp
  let form = document.querySelector(".cart__order__form")
  let textRegExp = new RegExp('^[A-Za-z\é\è\ê\ô\ë\ï\ \-]{2,10}$')
  let AdressRegExp = new RegExp('^[0-9A-Za-z\é\è\ê\ô\ë\ï\ \-]+$')
  let mailRegExp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
//creation du formulaire de contact pour la requte post (si reste a 0 -> infos non rempli ou non valide)
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
//detection de click sur le bouton commander et envoie de requete si le formulaire est correctement rempli
const commande = document.getElementById("order")
      commande.addEventListener('click', (event) => {
      event.preventDefault()
      const valideForm = testFormulaire (contact)
      if(valideForm){
        getFormData()
      }
  })
