// Menu mobile

// Toggle du menu
$('#menu').click(function (event) {
    event.preventDefault();  
    $("#menu-mobile-contenu").addClass('ouvert');
    $("#menu-mobile-contenu").slideToggle();
    event.stopPropagation();
});

// Si on clique sur le bouton burger, on ne clique pas sur le document
$("#menu-mobile-contenu").click(function(event){
  event.stopPropagation();
});

// Si on clique sur le document ailleurs que sur le menu burger, on remonte le menu.
$(document).click(function(){
  if($('#menu-mobile-contenu').hasClass('ouvert')){
    $('#menu-mobile-contenu').slideUp();
    $('#menu-mobile-contenu').removeClass('ouvert');
  }
});

// Imprimer la page
$('#bouton-imprimer a').click(function(event){
  event.preventDefault();
  window.print();
});

// Vérification moteur de recherche
$('#moteur-recherche').submit(function(event){
  event.preventDefault();
  var elementRecherche = document.getElementById('moteur-recherche').zoneRecherche.value;
  if(!elementRecherche){
    alert('Veuillez entrer une recherche.');
  }
});

/* Création d'une fonction toggle sur les fiches de soins du spa, qui :
  - affiche ou masque la fiche complète
  - change le lien de "Voir la fiche complète" en "Masquer la fiche" et vice versa
*/
function toggleSpa(fiche, toggled){
  toggled.click(function(){
    if(fiche.hasClass('toggleActivated')){
      fiche.slideUp();
      fiche.removeClass('toggleActivated');
      toggled.text('Voir la fiche complète');
    } else{
      fiche.slideDown();
      fiche.addClass('toggleActivated');
      toggled.text('Masquer la fiche');
    }
  });
}

toggleSpa($('.spa-fiche-contenu1'), $('.spa-fiche-toggle1'));

