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
toggleSpa($('.spa-fiche-contenu2'), $('.spa-fiche-toggle2'));
toggleSpa($('.spa-fiche-contenu3'), $('.spa-fiche-toggle3'));
toggleSpa($('.spa-fiche-contenu4'), $('.spa-fiche-toggle4'));
toggleSpa($('.spa-fiche-contenu5'), $('.spa-fiche-toggle5'));




/*  Datepicker pour le formulaire de réservation
J'ai dû assembler différents codes pour obtenir un résultat qui fonctionne (c'est-à-dire qui n'autorise pas l'internaute à choisir une date d'arrivée antérieure à la date du jour, ni à choisir une date de départ antérieure à la date d'arrivée, ET qui soit en français).
Je n'ai pas pu prendre directement le datepicker date-range proposé par jQuery.
Il y a peut-être un moyen facile de l'adapter mais je ne l'ai pas trouvé.
*/

// Empêcher une date d'arrivée antérieure à la date du jour ou une date de départ antérieure à la date d'arrivée. Code trouvé ici : https://stackoverrun.com/fr/q/2161047

var dateToday = new Date(); 
var dates = $("#from, #to").datepicker({ 
    defaultDate: "+1w", 
    changeMonth: true, 
    numberOfMonths: 2, 
    minDate: dateToday, 
    onSelect: function(selectedDate) { 
     var option = this.id == "from" ? "minDate" : "maxDate", 
      instance = $(this).data("datepicker"), 
      date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings); 
     dates.not(this).datepicker("option", option, date); 
    } 
}); 

// Obtenir une traduction française du calendrier et un formatage français des dates (jj/mm/aaaa)
// Code trouvé sur le Github de jQuery : https://github.com/jquery/jquery-ui/blob/master/ui/i18n/datepicker-fr.js

/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
			  Stéphane Nahmani (sholby@sholby.net),
			  Stéphane Raimbault <stephane.raimbault@gmail.com> */
         ( function( factory ) {
          if ( typeof define === "function" && define.amd ) {
        
            // AMD. Register as an anonymous module.
            define( [ "../widgets/datepicker" ], factory );
          } else {
        
            // Browser globals
            factory( jQuery.datepicker );
          }
        }( function( datepicker ) {
        
        datepicker.regional.fr = {
          closeText: "Fermer",
          prevText: "Précédent",
          nextText: "Suivant",
          currentText: "Aujourd'hui",
          monthNames: [ "janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre" ],
          monthNamesShort: [ "janv.", "févr.", "mars", "avr.", "mai", "juin",
            "juil.", "août", "sept.", "oct.", "nov.", "déc." ],
          dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
          dayNamesShort: [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ],
          dayNamesMin: [ "D","L","M","M","J","V","S" ],
          weekHeader: "Sem.",
          dateFormat: "dd/mm/yy",
          firstDay: 1,
          isRTL: false,
          showMonthAfterYear: false,
          yearSuffix: "" };
        datepicker.setDefaults( datepicker.regional.fr );
        
        return datepicker.regional.fr;
        } ) );

// Vérifications des formulaires de réservation

// Pour les vérifications de format de mail (code repris du livre "JavaScript pour les nuls" ;) )
var emailRE = /^.+@.+\..{2,4}$/;

    // Chambres
$('#id-resa-form').submit(function(event){
  event.preventDefault();
    console.log($('#id-nombre-personnes').val());
  // On vérifie que tous les champs sont remplis.
    if(!$('#prenom').val() || !$('#nom').val() || !$('#mail').val() || !$('#mail-confirmation').val() || $('#id-nombre-personnes option:selected').val() == '0' || $('#id-nombre-chambres option:selected').val() == '0' || !$('#from').val() || !$('#to').val()){  
      alert('Veuillez remplir tous les champs non-optionnels');
    } else if(!($('#mail').val().match(emailRE)) || !($('#mail-confirmation').val().match(emailRE))){
      alert("Veuillez entrer une adresse e-mail valide.");
    }
})

    // Spa et restaurant
$('#id-resa-form2').submit(function(event){
  event.preventDefault();
  // On vérifie que tous les champs sont remplis.
    if(!$('#prenom').val() || !$('#nom').val() || !$('#mail').val() || !$('#mail-confirmation').val() || $('#id-nombre-personnes option:selected').val() == '0' || $('#id-nombre-chambres option:selected').val() == '0' || !$('#from').val()){  
      alert('Veuillez remplir tous les champs non-optionnels');
    }
})

// Confirmation de l'adresse e-mail
$('#mail-confirmation').keyup(function(){
  if($('#mail').val() != $('#mail-confirmation').val()){
    $('#mail-confirmation').addClass('bad-mail-confirmation');
    $('#mail').addClass('bad-mail-confirmation')
  } else if($('#mail-confirmation').hasClass('bad-mail-confirmation') && $('#mail').hasClass('bad-mail-confirmation')){
    $('#mail-confirmation').removeClass('bad-mail-confirmation');
    $('#mail').removeClass('bad-mail-confirmation');
  }
});

$('#mail').keyup(function(){
  if($('#mail').val() != $('#mail-confirmation').val()){
    $('#mail-confirmation').addClass('bad-mail-confirmation');
    $('#mail').addClass('bad-mail-confirmation')
  } else if($('#mail-confirmation').hasClass('bad-mail-confirmation') && $('#mail').hasClass('bad-mail-confirmation')){
    $('#mail-confirmation').removeClass('bad-mail-confirmation');
    $('#mail').removeClass('bad-mail-confirmation');
  }
});

// Confirmation de la page avis
$('#id-avis-form').submit(function(event){
  event.preventDefault();
  // On vérifie que tous les champs sont remplis.
    if(!$('#prenom').val() &&  $('#message').val()){  
      alert('Veuillez indiquer votre prénom ou pseudo.');
    } else if($('#prenom').val() &&  !$('#message').val()){  
      alert('Veuillez rédiger un message.');
    } else{
      alert('Veuillez indiquer votre prénom ou pseudo et rédiger un message.');
    }

})

// Confirmation newsletter
$('#newsletter').submit(function(event){
  event.preventDefault();
  if(!$('#mailNewsletter').val()){
  alert('Veuillez entrer votre adresse e-mail.');
  
  // Vérification du format de l'adresse mail 
  } else if($('#mailNewsletter').val().match(emailRE)){
    console.log("l'e-mail correspond");
  } else {
    //console.log("l'e-mail ne correspond pas");
    alert("Veuillez entrer une adresse e-mail valide.");
  }
})


    