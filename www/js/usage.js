jQuery(document).ready(function() {
	
	console.log($("body").data('start'));

	try {
	if ($("body").data('start').length < 4) var start = moment().format("YYYY-MM-DD");       
	else var start = $("body").data('start');
	} catch(e) {
		var start = moment().format("YYYY-MM-DD"); 
	}
	
	try{
	if ($("body").data('end').length < 4) var end = moment().format("YYYY-MM-DD");       
	else var end = $("body").data('end');
	} catch (e) {
		moment().format("YYYY-MM-DD");
	}
	
	
$('input[name="devicedaterange"]').daterangepicker(
{
    locale: {
      format: 'YYYY-MM-DD'
    },
    startDate: start,
    endDate: end
}, 



function(start, end, label) {
   // alert("A new date range was chosen: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
   window.location.replace("/usage.php?start="+start.format('YYYY-MM-DD')+"&end="+end.format('YYYY-MM-DD'));
});


if (typeof $("#allowChart").data('allowData') != "undefined") {
   var ctx = $("#allowChart");
   var allowChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: $("#allowChart").data('allowHeader'),
        datasets: [{
           data: $("#allowChart").data('allowData'),
		backgroundColor: $("#allowChart").data('allowColor'),
            
        }]
		},
		options: {
			animation: {
				duration: 3000,
			}, 
			legend: {
            display: false
			}
		}
	});
	
} else {
	var c=document.getElementById("allowChart");
	var ctx=c.getContext("2d");

	ctx.font="12px Georgia";
	ctx.fillText("No data for this period",20,150);

}
	
if (typeof $("#blockChart").data('blockData') != "undefined") {
	var ctx = $("#blockChart");
   var blockChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: $("#blockChart").data('blockHeader'),
        datasets: [{
           data: $("#blockChart").data('blockData'),
		backgroundColor: $("#blockChart").data('blockColor'),
            
        }]
		},
		options: {
			animation: {
				duration: 6000,
			}, 
			legend: {
            display: false
			}
		}
	});
	
} else {
	var c=document.getElementById("blockChart");
	var ctx=c.getContext("2d");

	ctx.font="12px Georgia";
	ctx.fillText("No data for this period",20,150);
}
	



});