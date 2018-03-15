jQuery(document).ready(function() {
	
			
	
	setInterval(function () {
		queryStr="action=sessionActiveCheck";

				$.post( "ajax/sessionActiveCheck.php", queryStr, function( data ) {
					
					var response = JSON.parse(data);
					if (response.status == 0) {
						window.location.replace('/logout.php');
					}
				
				});
	
	}, 300000);
			
	 
});