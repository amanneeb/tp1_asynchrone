/**
 * @file "Programmation spécialisée - TP1 - Liste utilisateurs"
 * @author Anaïs Mannée-Batschy
 * @version 0.0.1
 */

const sectionListe = document.getElementById("liste");
let tabInformation;
let intCpt = 0;


/**
 * Récupérer les informations des utilisateurs sur l'API
 */
function obtenirInformations(){
    fetch("https://randomuser.me/api?results=10")
    .then(informations => informations.json())
    .then(utilisateurs => afficherListeAleatoireUtilisateurs(utilisateurs))
}

/**
 * Afficher au hasard dix utilisateurs dans la liste des utilisateurs
 * @param {object} objJSON 
 */
function afficherListeAleatoireUtilisateurs(objJSON){
    let informations = objJSON;
    let listeUL = document.createElement("ul");
    sectionListe.append(listeUL);
    tabInformation = informations.results;

    tabInformation.forEach(element => {
        intCpt++;
        let elementLi = document.createElement("li");
        let elementBtn = document.createElement("button");
        let elementImg = document.createElement("img");
        let prenom = element.name.first;

        elementImg.src = element.picture.large;
        elementImg.alt = "Afficher la fiche de "+ prenom;
        elementBtn.setAttribute("data-index-user", intCpt);
        elementBtn.append(elementImg);
        elementLi.append(elementBtn);       
        listeUL.append(elementLi);
        
    });
}

/**
 * Insérer les informations de l'utilisateur dans la fiche
 * @param {number} index 
 */
function afficherFiche(index){
    document.getElementById("fiche").removeAttribute("hidden");
    document.querySelector("#fiche h2").textContent=tabInformation[index-1].name.first + " " + tabInformation[index-1].name.last;
    document.querySelector("#fiche img").src = tabInformation[index-1].picture.large;
    document.querySelector("#fiche img").alt = "Afficher la fiche de " +  tabInformation[index-1].name.first;
    let arrLi = document.querySelectorAll("#fiche li");
    arrLi[0].textContent = tabInformation[index-1].location.street.number + " " + tabInformation[index-1].location.street.name
    arrLi[1].textContent = tabInformation[index-1].location.city;
    arrLi[2].textContent = tabInformation[index-1].location.state;
    arrLi[3].textContent = tabInformation[index-1].location.postcode;
}

/**
 * Récupérer et transmettre la valeur de l'attribut data-index-user
 * @param {event} e 
 */
function recupererIndexBouton(e){
    if(e.target.tagName==="BUTTON" || e.target.parentNode.tagName==="BUTTON"){
        let dataIndex
        if(e.target.tagName==="BUTTON"){
            dataIndex = e.target.getAttribute("data-index-user");
        }
        if(e.target.parentNode.tagName==="BUTTON"){
            dataIndex = e.target.parentNode.getAttribute("data-index-user");
        }
        afficherFiche(dataIndex);
    }
}


window.addEventListener("load", obtenirInformations);
window.addEventListener("click", recupererIndexBouton);