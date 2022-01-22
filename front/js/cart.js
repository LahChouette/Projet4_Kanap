let produitLocalStorage = JSON.parse(localStorage.getItem("panier"));

// affiche le total //
let produitTotalPrix = document.getElementById('totalPrice');
let produitTotalQuantite = document.getElementById('totalQuantity');
let calculprixtotal = 0
let calculquantitetotal = 0


let displayTotal = () => {
  produitTotalPrix.innerHTML = calculprixtotal;
  produitTotalQuantite.innerHTML = calculquantitetotal;
}

let updateTotal = (prixTotal, quantitetotal) => {
  calculprixtotal += prixTotal
  calculquantitetotal += quantitetotal
  displayTotal()
}

function getPanier(){
    
  // Produit du Panier //
  const element2 = document.querySelector("#cart__items");
  let structurePanier = [];

  // Récupération du prix total//
  //affichePrixTotal = document.getElementById('totalPrice');
  //let prixtotal = []
  
  // **************************************************
  
  //let produitTotalPrix = document.getElementById('totalPrice');
  prixtotal = 0;
  
  // *****************************************************
  
  // Récupération quantité total //
  //affichequantiteTotal = document.getElementById('totalQuantity');
  //let qtttotal = [];
  
  // ******************************************************
  
  //let produitTotalQuantite = document.getElementById('totalQuantity');
  quantitetotal = 0;
  
  // si le panier est vide //
   
    if (produitLocalStorage === null){

    } else {
      
      // affiche le panier si il n'est pas vide //
        for (i = 0; i < produitLocalStorage.length; i++){
            structurePanier = structurePanier + `
            <article class="cart__item" data-id="${produitLocalStorage[i].id}" data-color="${produitLocalStorage[i].couleur}">
              <div class="cart__item__img">
                  <img src="${produitLocalStorage[i].img}" alt="Photographie d'un canapé ${produitLocalStorage[i].nom}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${produitLocalStorage[i].nom}</h2>
                  <p>${produitLocalStorage[i].couleur}</p>
                  <p>${produitLocalStorage[i].prix} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté :${produitLocalStorage[i].quantite}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[i].quantite}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>`;
            // addition quantité et prix total //
            let quantitepanier = Number(produitLocalStorage[i].quantite);
            quantitetotal += quantitepanier;
            prixtotal += (produitLocalStorage[i].quantite * produitLocalStorage[i].prix);
            
            // *******************************************
            
            // récupération des prix et quantité dans le panier et injecte dans prixtotal et qtttotal // 
            /* let prixProduit = produitLocalStorage[i].prix;
            prixtotal.push(prixProduit);
            let quantitepanier = Number(produitLocalStorage[i].quantite);
            qtttotal.push(quantitepanier);*/
        }
          // addition des prix et quantité total //
          /*const prixTotals = prixtotal.reduce((acc, cur) => acc + cur, 0);
          const quantitetotal = qtttotal.reduce((acc, cur) => acc + cur, 0);*/

        // insertion html dans la page panier //
        if (i === produitLocalStorage.length){
            element2.innerHTML = structurePanier;
            //produitTotalQuantite.innerHTML = quantitetotal;
            //produitTotalPrix.innerHTML = prixtotal;
            updateTotal(prixtotal, quantitetotal)
        }
    }
}
getPanier();



function qttModif() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let q = 0; q < qttModif.length; q++){
      qttModif[q].addEventListener("change" , () => {
        // Selection de l'element à modifier en fonction de son id et couleur //
        let quantityModif = produitLocalStorage[q].quantite;
        let qttModifValue = qttModif[q].valueAsNumber;

        const resultFind = produitLocalStorage.find((elm) => elm.qttModifValue !== quantityModif);

        resultFind.quantite = qttModifValue;
        produitLocalStorage[q].quantite = resultFind.quantite;

        localStorage.setItem("panier", JSON.stringify(produitLocalStorage));

        // test //
        //location.reload();

      })
  }
}
qttModif();

function supprimeProduit(){
  let btn_supprimer = document.querySelectorAll(".deleteItem");
  
  for (let k = 0; k < btn_supprimer.length; k++){
      btn_supprimer[k].addEventListener("click", (event) => {
          let article = event.target.closest('article')
         
          // Selection de l'element a supprimer //
          let idSupprime = article.dataset.id
          let couleurSupprime = article.dataset.color

          // Selectionne les elements a garder et supprime l'élément selectionné avec le bouton //
          produitLocalStorage = produitLocalStorage.filter( el => el.id !== idSupprime || el.couleur !== couleurSupprime );

          localStorage.setItem("panier", JSON.stringify(produitLocalStorage));
          
          // refresh rapide //
          location.reload()
          // message quand on supprime un element //
          article.remove()
          alert("Ce produit a bien été supprimé du panier");
      })
  }
}
supprimeProduit();

function getFormulaire(){
  let formulaire = document.querySelector(".cart__order__form");
  
  // création des regexp pour validation //
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let adressRegExp = new RegExp("^[a-zA-Z0-9 ,.'-]{3,}$");
  let nomRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  
  // écouter la modification du prenom //
  formulaire.firstName.addEventListener('change', function() {
    validfirstName(this);
  });
  // Test l'expression reguliere //
  const validfirstName = function(inputfirstName) {
    let firstNameErrorMsg = inputfirstName.nextElementSibling;

    if (nomRegExp.test(inputfirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
        return true;
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }
  };
  // écouter la modification du nom //
  formulaire.lastName.addEventListener('change', function() {
    validlastName(this);
  });
  // Test l'expression reguliere //
  const validlastName = function(inputlastName) {
    let lastNameErrorMsg = inputlastName.nextElementSibling;
  
    if (nomRegExp.test(inputlastName.value)) {
        lastNameErrorMsg.innerHTML = '';
        return true;
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }
  };
  // écouter la modification de l'adresse //
  formulaire.address.addEventListener('change', function() {
    validaddress(this);
  });
  // Test l'expression reguliere //
  const validaddress = function(inputaddress) {
    let addressErrorMsg = inputaddress.nextElementSibling;

    if (adressRegExp.test(inputaddress.value)) {
      addressErrorMsg.innerHTML = '';
      return true;
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      return false;
    }
  };

  // écouter la modification de city //
  formulaire.city.addEventListener('change', function() {
    validcity(this);
  });
  // Test l'expression reguliere //
  const validcity = function(inputcity) {
    let cityErrorMsg = inputcity.nextElementSibling;

    if (nomRegExp.test(inputcity.value)) {
        cityErrorMsg.innerHTML = '';
        return true;
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        return false;
    }
  };
  
  // écouter la modification de l'email //
  formulaire.email.addEventListener('change', function() {
    validEmail(this);
  });
  // Test l'expression reguliere //
  const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
        return true;

    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        return false;
    }
  };
  
  // validation bouton
  formulaire.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validfirstName(formulaire.firstName) && validlastName(formulaire.lastName) && validaddress(formulaire.address) && validcity(formulaire.city) && validEmail(formulaire.email)){
      envoyeFormulaire();
    }
  })
}
getFormulaire();

function envoyeFormulaire(){
    //Récupération des coordonnées du formulaire client
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');
    
    // récupération des produit dans panier //
    let commande = [];
    for (let c = 0; c <produitLocalStorage.length;c++) {
      commande.push(produitLocalStorage[c].id);
    }
    
    // le formulaire + les produit dans le panier //
    const order = {
      contact : {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: commande,
    }

    const aEnvoyer = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 
        "Content-Type": "application/json" 
      },
    };

    fetch("http://localhost:3000/api/products/order", aEnvoyer)
    .then((response) => response.json())
    .then((rep) => {
        console.log(rep);
        localStorage.removeItem('panier');
        //localStorage.setItem("orderId", rep.orderId);
        document.location.href = "confirmation.html?id="+rep.orderId;
        
    })
  //}) 
};