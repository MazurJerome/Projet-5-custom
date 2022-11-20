//sauvegarde du panier dans local storage
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket))
}

//recuperation du panier et création en cas d'absence
function getBasket(){
    let basket = localStorage.getItem("basket")
    if(basket == null){
        return []
    }
    else {
        return JSON.parse(basket)
    }
}

//calcul du prix total
function getTotalPrice() {
    let total = 0
    for (let product of basket){
        total += product.quantity * product.price
    }
    return total
  }

//ajout du produit dans le panier
function addBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id)
    let foundProductColor = basket.find(p => p.color == product.color)
    if(foundProduct != undefined && foundProductColor != undefined) {
        foundProduct.quantity = foundProduct.quantity*1 +product.quantity*1
    }
    else {
        basket.push(product)
    }
    saveBasket(basket)
}

//suppression d'un produit en prenant l'index en fonction de l'id et de la couleur
function removeFromBasket (product, color) {
    let basket = getBasket()
    for (let index of basket)
    if( index.id == product && index.color == color){
    const indexT = basket.indexOf(index)
    basket.splice(indexT, 1)
}
    saveBasket(basket)
}

//modification quantité produits +/-
function changeQuantity(product, quantity, color) {
    let basket = getBasket()
    let foundProduct = basket.filter(p => p.id == product)
    let foundProductColor = foundProduct.find(p => p.color == color)
    if(foundProduct != undefined && foundProductColor != undefined) {
        foundProductColor.quantity = quantity
        if(foundProductColor.quantity <= 0){
            removeFromBasket(foundProductColor.id, foundProductColor.color)
            window.location.reload()
        }
        else {
            saveBasket(basket)
        }
    }
    
}

//calcul du nombre de produits
function getNumberProduct(){
    let basket = getBasket()
    let number = 0
    for (let product of basket){
        number += product.quantity*1
        saveBasket(basket)
    }
    return number
}

