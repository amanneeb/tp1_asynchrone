/**
 * @file "Programmation spécialisée - TP1 - Visionneuse"
 * @author Anaïs Mannée-Batschy 
 * @version 0.0.1
 *  
 */
const arrFilmsStarWars = [];
const arrPlanetesJSON = [];
const tableauPlanetes =[];
const refImage = document.querySelector("img");
const refLegende = document.querySelector("figcaption");
const refBtnArreterActiver = document.querySelector(".btn_visio");
let idBtnFilmChoisi;
let intPlaneteAafficher;
let vitesseAffichage;
let apiImage


/**
 * Recupérer la liste des films sur l'API
 */
function recupererLesFilms(){
    fetch("https://swapi.dev/api/films/")
    .then(reponse => reponse.json())
    .then(films => creerTableauFilms(films));
}

/**
 * Créer un tableau des films à partir de la liste récupérer sur l'API
 * @param {object} films 
 */
function creerTableauFilms(films){
    films.results.forEach(element => {
        arrFilmsStarWars.push(element.title);
    });
    afficherListeFilms(films);
}

/**
 * Afficher trois films parmi les films présents dans la liste
 * @param {object} films 
 */
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

}

/**
 * Dévoiler la visionneuse et choisir l'image initiale
 * @param {event} event 
 */
function afficherVisionneuse(event){    
    if(event.target.tagName === "BUTTON" && event.target.parentNode.parentNode.tagName === "UL"){
        document.getElementById("Visionneuse").removeAttribute("hidden")
        idBtnFilmChoisi = parseInt(event.target.id-1);
        intPlaneteAafficher = 0;
        let lienImg = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher];
        let indexPlanetes = lienImg.replace("https://swapi.dev/api/planets/", "");
        indexPlanetes= indexPlanetes.replace("/", "");
        apiImage=indexPlanetes;
        recupererLesPlanetes(indexPlanetes)
    }

}

/**
 * Récupérer la liste des planètes sur l'API
 */
function recupererLesPlanetes(){
    fetch("https://swapi.dev/api/planets/")
    .then(reponse => reponse.json())
    .then(planetes => afficherPlanetes(planetes))
}

/**
 * Créer un tableau contenant le nom des planètes
 * @param {object} planets 
 */
function afficherPlanetes(planets){
    const objPlanetes = planets;
    if(arrPlanetesJSON.length===0){
        for(let intP=0; intP<planets.results.length-1; intP++){
            arrPlanetesJSON.push(planets.results[intP].name.toLowerCase());
        }
    }
    let nomPlanete = objPlanetes.results[apiImage-1]["name"].toLowerCase();
    faireDefilerImage(nomPlanete)
}

/**
 * Afficher les images des planètes dans la visionneuse
 * @param {string} nomPlanete 
 */
function faireDefilerImage(nomPlanete){
    if(refBtnArreterActiver.id==="arreter"){
        arreterMinuterie();
    }    
    if(refImage.src="../../images/"+nomPlanete+".jpeg"){
        refImage.src="../../images/"+nomPlanete+".jpeg";
        refLegende.textContent = nomPlanete;
    }else{
        if(refImage.src="../../images/"+nomPlanete+".jpg"){
            refImage.src="../../images/"+nomPlanete+".jpg";
            refLegende.textContent = nomPlanete;
        }else{
            refImage.src="https://picsum.photos/200";
        }        
    }
    if(refBtnArreterActiver.id==="arreter"){
        activerMinuterie();
    }    
}

/**
 * Faire apparaitre l'image suivante dans la visionneuse
 */
function avancerVisionneuse(){
    if(intPlaneteAafficher<tableauPlanetes[idBtnFilmChoisi].length-1){
        intPlaneteAafficher++;
        planete = extraireIndexPlanete()
        faireDefilerImage(planete);
    }else{
        if(intPlaneteAafficher===tableauPlanetes[idBtnFilmChoisi].length-1){
            intPlaneteAafficher=0;
            planete = extraireIndexPlanete();
            faireDefilerImage(planete);
        }
    }    
}

/**
 * Faire apparaitre l'image précédente dans la visionneuse
 */
function reculerVisionneuse(){
    if(intPlaneteAafficher>0){
        intPlaneteAafficher--;
        planete = extraireIndexPlanete();
        faireDefilerImage(planete);
    }else{
        if(intPlaneteAafficher===0){
            intPlaneteAafficher=tableauPlanetes[idBtnFilmChoisi].length-1;
            planete = extraireIndexPlanete();
            faireDefilerImage(planete);
        }
    }
}

/**
 * Extraire l'index de la planete grâce à son URL
 * @returns 
 */
function extraireIndexPlanete(){
    noDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher].replace("https://swapi.dev/api/planets/", "");
    noDeLaPlanete = noDeLaPlanete.replace("/", "");
    planete = arrPlanetesJSON[noDeLaPlanete-1];
    return planete;
}

/**
 * Choisir la vitesse de défilement de la visionneuse
 */
function definirVitesseMinuterie(){
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

/**
 * Arrêter la minuterie de la visionneuse
 */
function arreterMinuterie(){
    clearInterval(vitesseAffichage)
}

/**
 * Activer la minuterie de la visionneuse
 */
function activerMinuterie(){
    definirVitesseMinuterie();
}

/**
 * Changer l'identifiant et la valeur du bouton activant/arretant la minuterie de la visionneuse
 */
function changerValeursBtnVisio(){
    if(refBtnArreterActiver.value==="arreter"){
        refBtnArreterActiver.value="activer";
        refBtnArreterActiver.id="activer";
        arreterMinuterie();
    }else{
        refBtnArreterActiver.value="arreter";
        refBtnArreterActiver.id="arreter";
        activerMinuterie();
    }    
}


window.addEventListener("load", recupererLesFilms);
window.addEventListener("click", afficherVisionneuse);
refBtnArreterActiver.addEventListener("click", changerValeursBtnVisio);
document.getElementById("suivant").addEventListener("click", avancerVisionneuse);
document.getElementById("precedent").addEventListener("click", reculerVisionneuse);
document.getElementById("arreter").addEventListener("click", arreterMinuterie);

