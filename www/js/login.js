jQuery(document).ready(function() {
	$(".forgotPassword").click(function() {
		$("#loader").toggle("on");
		$.post( "/ajax/forgotPassword.php", {ip: $("body").data("ip")}, function( data ) {
		  $(".forgotPassword").html(data);
		  
		}).done(function() {
			$("#loader").toggle("off");
		  });
	});
	
	
	var auth = $("body").data("authenticated");;
	if (auth ==1)  {
		$(".login").html("<h1>Logged in</h1><h5><a href='/index.php'>Redirecting to control panel</a></h5>");
		window.location.replace("index.php")
	}
	
});