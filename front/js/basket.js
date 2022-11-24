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
function getTotalPrice(listProducts) {
    let total = 0
    
    for (let product of basket){
        listProducts.forEach(element => {
            if(element._id== product.id){
                for (let productOption of product.option){
                    total += productOption.quantity*element.price
                    }
            }   
        })
        
    }
     return total
    
 
  }

//ajout du produit dans le panier
function addBasket(product) {
    let basket = getBasket()
    let foundProduct = basket.find(p => p.id == product.id)
    let foundProductColor = basket.find(p => p.color == product.option[0])
    //si l'objet existe de la bonne couleur, change la quantite
    if(foundProduct != undefined && foundProductColor != undefined) {
        foundProduct.option.quantity = foundProduct.option.quantity*1 +product.option.quantity*1
    }
    //si l'objet existe mais pas de la bonne couleur, rajoute un objet avec couleur et quantite
    else if ( foundProduct != undefined) { 
        let newOption = product.option[0]
        prod = foundProduct.option
        prod.push(newOption)
        foundProduct.option = prod
    }
    //si l'objet n'existe pas d, rajoute un objet
    else {
        basket.push(product)
    }
    saveBasket(basket)
}

//suppression d'un produit en prenant l'index en fonction de l'id et de la couleur
function removeFromBasket (product, color) {
    let basket = getBasket()
    for (let index of basket)
    if( index.id == product){
        let option = index.option
        for (let optionProd of option)
        if(optionProd.color == color){
            const indexT = option.indexOf(optionProd)
            option.splice(indexT, 1)
            if (option.length != true){
                const indexP = basket.indexOf(index)
                basket.splice(indexP, 1)
            }

    }
}
    saveBasket(basket)
}

//modification quantité produits +/-
function changeQuantity(product, quantity, color) {
    let foundProduct = basket.filter(p => p.id == product)//[id option[{}{}]]
    let option = foundProduct[0].option
    let foundProductColor = option.find(element => element.color == color)
    if(foundProduct != undefined && foundProductColor != undefined) {
        foundProductColor.quantity = quantity
    }
        
    if(foundProductColor.quantity <= 0){
            removeFromBasket(foundProductColor.id, foundProductColor.color)
            window.location.reload()
        }
        else {
            saveBasket(basket)
        }
    }

//calcul du nombre de produits
function getNumberProduct(){
    let basket = getBasket()
    let number = 0
    for (let product of basket){
        for (let productOption of product.option){
            number += productOption.quantity*1
            saveBasket(basket)
        }
    }
    return number
}

