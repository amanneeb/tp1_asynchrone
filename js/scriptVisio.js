/**
 * @file "Programmation spécialisée - TP1 - Visionneuse"
 * @author Anaïs Mannée-Batschy 
 * @version 0.0.1
 *  
 */

const arrPlanetesFilmsChoisis = [];
const arrIndexPlanetes = [];
const arrNomsPlanetes = [];
const arrBoutons = document.querySelectorAll("#listeFilms button");
const objPlanetes = {}
const refImage = document.querySelector("img");
const refLegende = document.querySelector("figcaption");
const refBtnArreterActiver = document.querySelector(".btn_visio");
let intPlaneteAafficher;
let lienImg;
let vitesseAffichage;


/**
 * Recupérer la liste des films sur l'API
 */
function recupererLesFilms(){
    fetch("https://swapi.dev/api/films/")
    .then(reponse => reponse.json())
    .then(films => remplirTableauPlanetes(films));
}

/**
 * Créer un tableau comprenant la liste des planètes pour chaque film
 * @param {object} films 
 */
function remplirTableauPlanetes(films){
    const objFilms = films.results;
    let idApiFilm

   //Entrer les liens API (planetes) dans un tableau 
    for(let intCpt = 0; intCpt < arrBoutons.length; intCpt++){
        idApiFilm = arrBoutons[intCpt].getAttribute("name")
        idListeBtn = arrBoutons[intCpt].id
        arrPlanetesFilmsChoisis.push(objFilms[idListeBtn].planets)
    }    
    recupererLesPlanetes();
}

/**
 * Recupérer la liste d'index des planetes dont on doit connaitre le nom
 */
function recupererLesPlanetes(){
    for(let intCptBis = 0; intCptBis < arrBoutons.length; intCptBis++){ 
        let indexPlanete;
        arrPlanetesFilmsChoisis[intCptBis].forEach(element => {
            if(parseInt(element.charAt(element.length-3))){
                indexPlanete = element.substr(element.length-3, 2);
                arrIndexPlanetes.push(indexPlanete);
            }else{
                indexPlanete = element.substr(element.length-2, 1);
                arrIndexPlanetes.push(indexPlanete);
            }
        });
    }
    
    for(let intCptElement = 0; intCptElement < arrIndexPlanetes.length-1; intCptElement++){
        for(let cptPrecedent = 0; cptPrecedent < intCptElement; cptPrecedent++){
            if(intCptElement >= 1){
                if(arrIndexPlanetes[intCptElement] === arrIndexPlanetes[cptPrecedent]){
                    arrIndexPlanetes.splice(intCptElement, 1);
                }
            }
        }
    }   
    recupererNomsPlanetes() 
}

/**
 * Récupérer le nom des planetes grâce à l'API
 */
function recupererNomsPlanetes(){
    for(let cpt = 0; cpt <= arrIndexPlanetes.length-1; cpt++){
        fetch("https://swapi.dev/api/planets/"+arrIndexPlanetes[cpt])
        .then(reponse => reponse.json())
        .then(function(json){
            objPlanetes[arrIndexPlanetes[cpt]]=json.name;
        })
    }
}

/**
 * Faire apparaitre une image dans la visionneuse
 * @param {event} event
 */
function afficherVisionneuse(event){
    if(event.target.tagName === "BUTTON" && event.target.parentNode.parentNode.tagName === "UL"){
        //Afficher dévoiler visionneuse et afficher nom du film choisi
        document.getElementById("visionneuse").removeAttribute("hidden");
        document.querySelector("#visionneuse span").textContent = "";
        document.querySelector("#visionneuse span").textContent = event.target.innerText;

        //Afficher l'image
        idBtnFilmChoisi = parseInt(event.target.getAttribute("name"));
        intPlaneteAafficher = 0;
        lienImg = arrPlanetesFilmsChoisis[idBtnFilmChoisi][0];
        image = extraireIndexPlanete(lienImg)
        let imageAAfficher = objPlanetes[image].toLowerCase();

        if(imageAAfficher.indexOf(" ") === -1){
            refImage.src="../../images/"+imageAAfficher+".jpeg";
            refImage.alt=imageAAfficher;
            refLegende.textContent = imageAAfficher;
        }else{
            imageAAfficher.replace(" ", "_");
            refImage.src="../../images/"+imageAAfficher+".jpeg";
            refImage.alt=imageAAfficher;
            refLegende.textContent = imageAAfficher;
        }
        activerMinuterie();
    }
}

/**
 * Faire apparaitre l'image suivante dans la visionneuse
 */
function avancerVisionneuse(){
    if(intPlaneteAafficher<arrPlanetesFilmsChoisis[idBtnFilmChoisi].length-1){
        intPlaneteAafficher++;
        planete = extraireIndexPlanete(arrPlanetesFilmsChoisis[idBtnFilmChoisi][intPlaneteAafficher])
        faireDefilerImage(planete);
    }else{
        if(intPlaneteAafficher===arrPlanetesFilmsChoisis[idBtnFilmChoisi].length-1){
            intPlaneteAafficher=0;
            planete = extraireIndexPlanete(arrPlanetesFilmsChoisis[idBtnFilmChoisi][intPlaneteAafficher]);
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
        planete = extraireIndexPlanete(arrPlanetesFilmsChoisis[idBtnFilmChoisi][intPlaneteAafficher])
        faireDefilerImage(planete);
    }else{
        if(intPlaneteAafficher===0){
            intPlaneteAafficher=arrPlanetesFilmsChoisis[idBtnFilmChoisi].length-1;
            planete = extraireIndexPlanete(arrPlanetesFilmsChoisis[idBtnFilmChoisi][intPlaneteAafficher])
            faireDefilerImage(planete);
        }
    }
}

/**
 * Afficher les images des planètes dans la visionneuse
 * @param {string} nomPlanete 
 */
function faireDefilerImage(nomPlanete){
    if(refBtnArreterActiver.id==="arreter"){
        arreterMinuterie();
    }
    refImage.src="../../images/"+ objPlanetes[nomPlanete]+".jpeg";
    refImage.alt=objPlanetes[nomPlanete];
    refLegende.textContent = objPlanetes[nomPlanete];
    if(refBtnArreterActiver.id==="arreter"){
        activerMinuterie();
    } 
}


/* FONCTIONS UTILITAIRES */

/**
 * Extraire l'index de la planete grâce à son URL
 * @returns 
 */
function extraireIndexPlanete(apiImage){
    lienImg = apiImage;
    if(parseInt(lienImg.charAt(lienImg.length-3))){
        apiImage = lienImg.substr(lienImg.length-3, 2);
    }else{
        apiImage = lienImg.substr(lienImg.length-2, 1);
    }
    
    return apiImage;
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
        arreterMinuterie();
        refBtnArreterActiver.value="arreter";
        refBtnArreterActiver.id="arreter";
        activerMinuterie();
    }    
}



window.addEventListener("load", recupererLesFilms);
window.addEventListener("click", afficherVisionneuse);
document.getElementById("suivant").addEventListener("click", avancerVisionneuse);
document.getElementById("precedent").addEventListener("click", reculerVisionneuse);
document.getElementById("arreter").addEventListener("click", arreterMinuterie);
refBtnArreterActiver.addEventListener("click", changerValeursBtnVisio);