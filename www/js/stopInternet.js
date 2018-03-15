jQuery(document).ready(function() {
	$(".thumbImagePopup").unbind("click");
$(".thumbImagePopup").click(function() {
    $("#myModal").toggle();
    var thissrc = ($(this).attr('src'));
	$("#img01").attr('src', thissrc);
	
});

$("#closepopupmodal").click(function() {
	$("#myModal").toggle();
});
});
