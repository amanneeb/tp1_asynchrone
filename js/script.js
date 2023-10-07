const sectionListe = document.getElementById("liste");
let tabInformation;
let intCpt = 0;


function obtenirInformations(){
    fetch("https://randomuser.me/api?results=10")
    //.then(informations=>informations.json())
    .then(function(informations){
        informations.json().then(function(json){
            let JSON = json;
            console.log(json);
            afficherListeAleatoireUtilisateurs(JSON);
        })
    })
}

function afficherListeAleatoireUtilisateurs(objJSON){
    let informations = objJSON;
    let listeUL = document.createElement("ul");
    sectionListe.append(listeUL);
    tabInformation = informations.results;
    //console.log(informations.results)

    tabInformation.forEach(element => {
        intCpt++;
        let elementLi = document.createElement("li");
        let elementBtn = document.createElement("button");
        let elementImg = document.createElement("img");
        let prenom = element.name.first;
        console.log(prenom);
        elementImg.src = element.picture.large;
        elementImg.alt = "Afficher la fiche de "+ prenom;
        elementBtn.setAttribute("data-index-user", intCpt);
        elementLi.append(elementImg);       
        listeUL.append(elementBtn);
        elementBtn.append(elementImg);
    });
}

function afficherFiche(index){
    console.log(index);
    document.querySelector("#fiche h2").textContent=tabInformation[index-1].name.first + " " + tabInformation[index-1].name.last;
    document.querySelector("#fiche img").src = tabInformation[index-1].picture.large;
    document.querySelector("#fiche img").alt = "Afficher la fiche de " +  tabInformation[index-1].name.first;
    let arrLi = document.querySelectorAll("#fiche li");
    arrLi[0].textContent = tabInformation[index-1].location.street.number + " " + tabInformation[index-1].location.street.name
    arrLi[1].textContent = tabInformation[index-1].location.city;
    arrLi[2].textContent = tabInformation[index-1].location.state;
    arrLi[3].textContent = tabInformation[index-1].location.postcode;
}

function recupererIndexBouton(e){
    if(e.target.tagName==="BUTTON" || e.target.parentNode.tagName==="BUTTON"){
        let dataIndex
        if(e.target.tagName==="BUTTON"){
            dataIndex = e.target.getAttribute("data-index-user");
        }
        if(e.target.parentNode.tagName==="BUTTON"){
            dataIndex = e.target.parentNode.getAttribute("data-index-user");
        }
        console.log(dataIndex);
        afficherFiche(dataIndex);
    }
}


window.addEventListener("load", obtenirInformations);
window.addEventListener("click", recupererIndexBouton);