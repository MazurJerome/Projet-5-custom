
//url de la page
function getURL() {
    return window.location.href
}
//id du produit
function getID(urlPage) {
    const url = new URL(urlPage)
    const searchParams = new URLSearchParams(url.search)
    const id = searchParams.getAll("id")
    return id
}
//verification de l'existance du produit
function verifProduct (id) {
    let ok = false
    fetch(APIProducts)
        .then(response => response.json())
        .then (function(jsonListeProducts) {
            for( let jsonProduct of jsonListeProducts){
                if(jsonProduct._id == id){
                    console.log(jsonProduct._id)
                    console.log(id)
                    console.log("ok")
                    ok = true
                    }
                else{console.log(jsonProduct._id)}
                console.log(ok)
            }
            if(ok != true){
                document.location = 'index.html'
            }
        })
        
}


const actualURL = getURL()
const idProduct = getID(actualURL)
const verif = verifProduct(idProduct[0])

//ajout du produit
fetch(APIProducts + idProduct)
    .then(data => data.json())
    .then(jsonProduct => {
        document.querySelector(".item__img").innerHTML = `<img src="${jsonProduct.imageUrl}" alt="${jsonProduct.altTxt}"></img>`
        document.querySelector("#title").innerHTML = `${jsonProduct.name}`
        document.querySelector("#price").innerHTML = `${jsonProduct.price}`
        document.querySelector("#description").innerHTML = `${jsonProduct.description}`

        //recuperation couleur
        const colorTab = jsonProduct.colors.length
        for (let i = 0; i < colorTab; i++) {
            let newOption = document.createElement('option')
            const valeur = jsonProduct.colors[i]
            newOption.setAttribute("value", valeur)
            newOption.innerHTML = valeur
            document.querySelector("#colors").append(newOption)
        }
        //recuperation quantité
        document.getElementById("input#quantity")
        addEventListener('change', (event) => {
            const quantity = event.target.value
        });

        document.getElementById("addToCart").addEventListener("click", (e) => {
            e.preventDefault()
            //si couleur et quantite defini
            if (quantity.value > 0 && colors.value != "") {
                addBasket({
                    "id": idProduct[0],
                    "color": colors.value,
                    "quantity": quantity.value
                })
                alert("article(s) ajouté(s)")
                //redirection acceuil
                document.location = 'index.html'
            }
            else {
                alert("veuillez saissir une couleur et un nombre")
            }

        })
    });

