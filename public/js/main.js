$('#media').on('change',function(){
    var fileName = $(this).val();
    $('#mediaInfo').html(fileName);
});