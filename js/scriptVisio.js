const arrFilmsStarWars = [];
const arrPlanetesJSON = [];
const tableauPlanetes =[];
const refImage = document.querySelector("img");
const refLegende = document.querySelector("figcaption");
let idBtnFilmChoisi;
let intPlaneteAafficher;
let vitesseAffichage;
let apiImage


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
        console.table(tableauPlanetes[idBtnFilmChoisi]);
        let indexPlanetes = lienImg.replace("https://swapi.dev/api/planets/", "");
        indexPlanetes= indexPlanetes.replace("/", "");
        apiImage=indexPlanetes;
        recupererLesPlanetes(indexPlanetes)
    }
}

function recupererLesPlanetes(){
    fetch("https://swapi.dev/api/planets/")
    .then(reponse => reponse.json())
    .then(planetes => afficherPlanetes(planetes))
}

function afficherPlanetes(planets){
    const objPlanetes = planets;
    if(arrPlanetesJSON.length===0){
        for(let intP=0; intP<planets.results.length-1; intP++){
            arrPlanetesJSON.push(planets.results[intP].name.toLowerCase());
        }
        console.log(arrPlanetesJSON)
    }
    let nomPlanete = objPlanetes.results[apiImage-1]["name"].toLowerCase();
    faireDefilerImage(nomPlanete)
    console.log(objPlanetes.results[apiImage-1]["name"]);
}

function faireDefilerImage(nomPlanete){
    console.log(nomPlanete)
    arreterMinuterie();
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
    activerMinuterie();
}

function avancerVisionneuse(){
    if(intPlaneteAafficher<tableauPlanetes[idBtnFilmChoisi].length-1){
        intPlaneteAafficher++;
        noDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher].replace("https://swapi.dev/api/planets/", "");
        noDeLaPlanete = noDeLaPlanete.replace("/", "");
        planete = arrPlanetesJSON[noDeLaPlanete-1];
        faireDefilerImage(planete);
    }else{
        if(intPlaneteAafficher===tableauPlanetes[idBtnFilmChoisi].length-1){
            intPlaneteAafficher=0;
            noDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher].replace("https://swapi.dev/api/planets/", "");
            noDeLaPlanete = noDeLaPlanete.replace("/", "");
            planete = arrPlanetesJSON[noDeLaPlanete-1];
            faireDefilerImage(planete);
        }
    }    
}

function reculerVisionneuse(){
    if(intPlaneteAafficher>0){
        intPlaneteAafficher--;
        noDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher].replace("https://swapi.dev/api/planets/", "");
        noDeLaPlanete = noDeLaPlanete.replace("/", "");
        planete = arrPlanetesJSON[noDeLaPlanete-1];
        faireDefilerImage(planete);
    }else{
        if(intPlaneteAafficher===0){
            intPlaneteAafficher=tableauPlanetes[idBtnFilmChoisi].length-1;
            noDeLaPlanete = tableauPlanetes[idBtnFilmChoisi][intPlaneteAafficher].replace("https://swapi.dev/api/planets/", "");
            noDeLaPlanete = noDeLaPlanete.replace("/", "");
            planete = arrPlanetesJSON[noDeLaPlanete-1];
            faireDefilerImage(planete);
        }
    }
}


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

function arreterMinuterie(){
    clearInterval(vitesseAffichage)
}

function activerMinuterie(){
    definirVitesseMinuterie();
}

function changerValeursBtnVisio(){
    console.log(document.querySelector(".btn_visio"))
    if(document.querySelector(".btn_visio").value==="arreter"){
        console.log(document.querySelector(".btn_visio").value);
        document.querySelector(".btn_visio").value="activer";
        document.querySelector(".btn_visio").id="activer";
        arreterMinuterie();
    }else{
        console.log(document.querySelector(".btn_visio").value);
        document.querySelector(".btn_visio").value="arreter";
        document.querySelector(".btn_visio").id="arreter";
        activerMinuterie();
    }    
}


window.addEventListener("load", recupererLesFilms);
window.addEventListener("click", afficherVisionneuse);
document.getElementById("suivant").addEventListener("click", avancerVisionneuse);
document.getElementById("precedent").addEventListener("click", reculerVisionneuse);
document.getElementById("arreter").addEventListener("click", arreterMinuterie);
//document.getElementById("activer").addEventListener("click", activerMinuterie);
document.querySelector(".btn_visio").addEventListener("click", changerValeursBtnVisio);
