//url de la page
function getURL(){
    return window.location.href
}
//id du produit
function getID(urlPage){
    const url = new URL(urlPage);
    const searchParams = new URLSearchParams(url.search); 
    const id = searchParams.getAll("id") 
    return id
}

const actualURL = getURL()
const idProduct = getID(actualURL)
//ajout du produit
fetch("http://localhost:3000/api/products/"+idProduct)
    .then (data => data.json())
    .then(jsonProduct => {
        document.querySelector(".item__img").innerHTML = `<img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt}"></img>`
        document.querySelector("#title").innerHTML = `${jsonProduct.name}`
        document.querySelector("#price").innerHTML = `${jsonProduct.price}`
        document.querySelector("#description").innerHTML = `${jsonProduct.description}`

        const colorTab = jsonProduct.colors.length
        for ( let i = 0; i < colorTab; i++){
            let newOption = document.createElement('option')
            const valeur = jsonProduct.colors[i]
            newOption.setAttribute("value", valeur)
            newOption.innerHTML =valeur
            document.querySelector("#colors").append(newOption)
        }

        return jsonProduct
        });

