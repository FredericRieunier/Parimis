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