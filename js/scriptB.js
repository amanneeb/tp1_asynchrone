const arrFilmsStarWars = [];
const arrImagesPlanetes=[];
const tableauPlanetes =[];
const tableauPlanetesNom = [];
let idBtnFilmChoisi;
let intPlaneteAafficher;
let vitesseAffichage;


function recupererLesFilms(){
    fetch("https://swapi.dev/api/films/")
    .then(reponse => reponse.json())
    .then(films => creerTableauFilms(films));
}

function creerTableauFilms(films){
    films.results.forEach(element => {
        arrFilmsStarWars.push(element.title);
    });
    afficherListeFilms(films);
    console.log(films)
}

function afficherListeFilms(films){
    objson = films;   

    for(let intCpt=0; intCpt<3; intCpt++){
        const refUl = document.querySelector("#listeFilms ul");
        let elementLI = document.createElement("li");
        let intIndexFilmChoisi = Math.floor((Math.random()* arrFilmsStarWars.length-1) +1);
        let elementBtn = document.createElement("button");
        elementBtn.setAttribute("type", "button");
        elementBtn.setAttribute("id", intCpt+1);
        elementBtn.textContent =  arrFilmsStarWars[intIndexFilmChoisi];
       
        tableauPlanetes.push(objson.results[intIndexFilmChoisi].planets)
        elementLI.append(elementBtn)
        arrFilmsStarWars.splice(intIndexFilmChoisi, 1);
        refUl.append(elementLI);
    }
    console.log(tableauPlanetes)
}


function afficherVisionneuse(event){    
    if(event.target.tagName === "BUTTON" && event.target.parentNode.parentNode.tagName === "UL"){
        idBtnFilmChoisi = parseInt(event.target.id-1);
        intPlaneteAafficher = 0;
        let lienImg = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher];
        recupererLesPlanetes(lienImg)
    }
}

function recupererLesPlanetes(refImage){
    let apiImage = refImage;
    fetch(apiImage)
    /*.then(reponse => reponse.json())
    .then(planetes => afficherPlanetes(planetes))*/
    .then(function(reponse){
        reponse.json().then(function(json){
            let JSON = json;
            console.log(json);
            afficherPlanetes(JSON);
        })
    })
}

function afficherPlanetes(planets){
    const objPlanetes = planets;
    nomDeLaPlanete = objPlanetes.name.toLowerCase();
    const refImage = document.querySelector("img");
    const refLegende = document.querySelector("figcaption")

    if("../../images/"+nomDeLaPlanete+".jpeg"){
        refImage.src="../../images/"+nomDeLaPlanete+".jpeg";
        refLegende.textContent = nomDeLaPlanete;
    }else{
        refImage.src="../../images/"+nomDeLaPlanete+".jpg";
        refLegende.textContent = nomDeLaPlanete;
    }
    definirVitesseMinuterie()
}

/*
function definirVitesseMinuterie(){
    //console.log(document.getElementById("vitesse").value)
    let vitesseSelectionnee = document.getElementById("vitesse").value;
    switch (vitesseSelectionnee){
        case "lent":
            vitesseAffichage = setInterval(avancerVisionneuse, 1500);
            break;
        case "moyen":
            vitesseAffichage = setInterval(avancerVisionneuse, 1000);
            break;
        case "rapide":
            vitesseAffichage = setInterval(avancerVisionneuse, 500);
            break;
        default: vitesseAffichage = setInterval(avancerVisionneuse, 1500);
    }
}

function modifierVitesseVisionneuse(){
    arreterMinuterie();
    console.log("vitesse modifiée");
    definirVitesseMinuterie();
}

function arreterMinuterie(){
    clearInterval(vitesseAffichage);
}
*/

function avancerVisionneuse(){
    arreterMinuterie();
    if(intPlaneteAafficher<tableauPlanetes[idBtnFilmChoisi].length){
        intPlaneteAafficher++;
        nomDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher];
        //console.log(intPlaneteAafficher);
        console.log(nomDeLaPlanete);
        recupererLesPlanetes(nomDeLaPlanete)
    }
    if(intPlaneteAafficher===tableauPlanetes[idBtnFilmChoisi].length){
        intPlaneteAafficher=0;
        nomDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher];
        //console.log(intPlaneteAafficher);
        console.log(nomDeLaPlanete);
        recupererLesPlanetes(nomDeLaPlanete)
    }
}

function reculerVisionneuse(){
    if(intPlaneteAafficher>0){
        intPlaneteAafficher--;
        nomDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher];
        //console.log(intPlaneteAafficher);
        recupererLesPlanetes(nomDeLaPlanete)
    }
    if(intPlaneteAafficher===0){
        intPlaneteAafficher=tableauPlanetes[idBtnFilmChoisi].length-1;
        nomDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher];
        //console.log(intPlaneteAafficher);
        recupererLesPlanetes(nomDeLaPlanete)
    }
}

/*function arreterMinuterie(){
    document.getElementById("arreter").value = "activer";
    document.getElementById("arreter").id = "activer";
}

function activerMinuterie(){
    document.getElementById("activer").value = "arreter";
    document.getElementById("activer").id = "arreter";
    definirVitesseMinuterie();
}*/


window.addEventListener("load", recupererLesFilms);
window.addEventListener("click", afficherVisionneuse);
document.getElementById("suivant").addEventListener("click", avancerVisionneuse);
document.getElementById("precedent").addEventListener("click", reculerVisionneuse);
//document.getElementById("arreter").addEventListener("click", arreterMinuterie);
//document.getElementById("activer").addEventListener("click", activerMinuterie);
document.getElementById("vitesse").addEventListener("change", modifierVitesseVisionneuse)


