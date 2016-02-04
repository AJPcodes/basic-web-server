$(document).on('click', 'h1', function(){
  $(this).fadeOut("fast");
  $(this).fadeIn('slow');
});

$(document).on('click', '#dateSubmit', function(){
  if($('#year').val()) {
   window.location = "/cal/" + $('#year').val() + "/" + $('#month').val();
  }
});