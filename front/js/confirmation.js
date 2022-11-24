
//recuperation du numero de commande
function getorderId(urlPage) {
    const url = new URL(urlPage)
    const searchParams = new URLSearchParams(url.search)
    const orderId = searchParams.getAll("orderId")
    return orderId
}

const actualURL = getURL()
const idProduct = getorderId(actualURL)

//affichage du numero de commande
const commande = document.getElementById("orderId")
commande.innerHTML = `${idProduct}`

//une fois la commande validé, on vide le panier
localStorage.clear()
