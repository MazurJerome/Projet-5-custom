//sauvegarde du panier dans local storage
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket))
}

//recuperation du panier
function getBasket(){
    let basket = localStorage.getItem("basket")
    if(basket == null){
        return []
    }
    else {
        return JSON.parse(basket)
    }
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

//suppression d'un produit
function removeFromBasket (product) {
    let basket = getBasket()
    basket = basket.filter (p => p.id != product.id)
    saveBasket(basket)
}

//modification quantité produits +/-
function changeQuantity(product, quantity) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id)
    if(foundProduct != undefined) {
        foundProduct.quantity += quantity
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct)
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
        number += product.quantity
    }
    return number
}

//calcul du prix total
function getTotalPrice() {
    let basket = getBasket()
    let total = 0
    for (let product of basket){
        total += product.quantity * product.price
    }
    return total
}