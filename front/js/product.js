
function getURL(){
    return window.location.href
}
function getID(urlPage){
    const url = new URL(urlPage);
    const searchParams = new URLSearchParams(url.search); 
    const id = searchParams.getAll("id") 
    return id
}
//recuperation du produit


const actualURL = getURL()
const idProduct = getID(actualURL)

fetch("http://localhost:3000/api/products/"+idProduct)
    .then (data => data.json())
    .then(jsonProduct => {
        document.querySelector(".item__img").innerHTML = `<img src="${jsonProduct.imageUrl}" alt=${jsonProduct.altTxt}></img>`
        document.querySelector("#title").innerHTML = `${jsonProduct.name}`
        document.querySelector("#price").innerHTML = `${jsonProduct.price}`
        document.querySelector("#description").innerHTML = `${jsonProduct.description}`
        document.querySelector("#colors").innerHTML = `<option value="vert">vert</option>
        <option value="blanc">blanc</option>`
        
        return console.log(jsonProduct)
        });


console.log(actualURL)
console.log(idProduct)

