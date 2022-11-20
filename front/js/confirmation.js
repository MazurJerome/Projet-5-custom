//url de la page
function getURL() {
    return window.location.href
}
//id du produit
function getorderId(urlPage) {
    const url = new URL(urlPage)
    const searchParams = new URLSearchParams(url.search)
    const orderId = searchParams.getAll("orderId")
    return orderId
}

const actualURL = getURL()
const idProduct = getorderId(actualURL)

const commande = document.getElementById("orderId")
commande.innerHTML = `${idProduct}`