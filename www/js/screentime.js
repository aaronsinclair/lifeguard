jQuery(document).ready(function() {

	for (var i=0; i<24; i++)  {
		
		
		
		$("#mondayContainer").append("<div class='timeperiod unblocked' data-day='Mon' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Mon' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
		
		$("#tuesdayContainer").append("<div class='timeperiod unblocked' data-day='Tue' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Tue' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
		
		$("#wednesdayContainer").append("<div class='timeperiod unblocked' data-day='Wed' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Wed' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
		
		$("#thursdayContainer").append("<div class='timeperiod unblocked' data-day='Thu' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Thu' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
		
		$("#fridayContainer").append("<div class='timeperiod unblocked' data-day='Fri' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Fri' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
		
		$("#saturdayContainer").append("<div class='timeperiod unblocked' data-day='Sat' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Sat' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
		
		$("#sundayContainer").append("<div class='timeperiod unblocked' data-day='Sun' data-id='"+i+"' data-startmins='00' data-endmins='00'> <span class='timeperiodText'>"+i+":00</span><button type='button' class='btn btn-success btn-sm editRangePeriod' data-day='Sun' data-id='"+i+"'><span class='icon icon-pencil'> Edit Block Times</span></button>	</div>");
	}
	
	
	function makeSelection(day, start, end, action) {
		
		if (parseInt(start) > parseInt(end)) {
			var tmpStart = start;
			start = end;
			end = tmpStart;
		}
		
		
		while (parseInt(start) <= parseInt(end)) {
			$(".timeperiod[data-day='"+day+"'][data-id='"+start+"']").removeClass("blocked unblocked"); 
			$(".timeperiod[data-day='"+day+"'][data-id='"+start+"']").addClass(action);
			start++;
		}
		
	}
	
	
	function getRange(day)  {
		var inrange=false;
		var range = Array();
		var rangeid = 0;
		for (var hour=0; hour<=23; hour++)  {
			if (inrange==false && $(".timeperiod[data-day='"+day+"'][data-id='"+hour+"']").hasClass("blocked"))  {
				var startmins = $(".timeperiod[data-day='"+day+"'][data-id='"+hour+"']").data("startmins");
				range[rangeid]= {'start': hour, 'startmins': startmins};
				inrange = true;
				if (hour == 23) range[rangeid].end = 23;
				range[rangeid].endmins = "59:00";
				
			} else if (inrange==true && $(".timeperiod[data-day='"+day+"'][data-id='"+hour+"']").hasClass("unblocked")) {
				range[rangeid].end = hour -1;
				var endmins = $(".timeperiod[data-day='"+day+"'][data-id='"+ (hour-1) +"']").data("endmins");
				range[rangeid].endmins = endmins;
				inrange = false;
				rangeid ++;
			} else if (inrange == true && hour == 23) {
				//console.log("seeing hour 23 range");
				range[rangeid].end = 23;
				range[rangeid].endmins = "59:00";
				
				
			}
		}
	
		
		$(".timeperiod[data-day='"+day+"']").data("range", range);
	
	}
	
	function markRangeEnd(day)  {
		
		var ranges = $(".timeperiod[data-day='"+day+"']").data('range');
		if (typeof ranges == 'undefined') return false;
		
		//$(".timeperiod[data-day='"+day+"']").removeClass("editRangePeriod"); 
		$(".editRangePeriod[data-day='"+day+"']").css("display", "none");
		for (var range in ranges) {
		$(".editRangePeriod[data-day='"+day+"'][data-id='"+ranges[range].end+"']").css("display", "inline"); 
		//console.log("mark range end");
		//console.log(ranges); 
		}
		
		
	}
	

	
	
	var isDown = false;   // Tracks status of mouse button
	
	$(".timeperiod").on('mousedown', function(event){
		isDown = true;
		$(this).toggleClass("blocked unblocked");
		event.preventDefault();
		$("body").data("start", $(this).data('id')); 
		if ($(this).hasClass("blocked")) $("body").data("blockAction", "blocked");
		else $("body").data("blockAction", "unblocked");
	});
	
	$(".timeperiod").on('mouseup', function() {
		isDown = false;    
		$("body").data("end", $(this).data('id'));
		makeSelection($(this).data("day"), $("body").data("start"), $(this).data("id"), $("body").data("blockAction"));		
		$("body").data("start", "");
		getRange($(this).data("day"));
		markRangeEnd($(this).data("day"));
		saveTimetable();
		
	});
	
	

	  $(".timeperiod").on('mouseenter', function(){
		if(isDown) {        // Only change css if mouse is down
		  $(this).toggleClass("blocked unblocked");
		  makeSelection($(this).data("day"), $("body").data("start"), $(this).data("id"), $("body").data("blockAction"));
			
		}
	  });
	
	
	
	
	 $(".editRangePeriod").on("mousedown", function(event) {
		 event.stopImmediatePropagation()
		//console.log("edit range clicked"); 
		var day = $(this).data('day');
		var rangeEnd = $(this).data('id');
		//console.log(day); 
		//console.log(rangeEnd); 
		
		// get range id. 
		var ranges = $(".timeperiod[data-day='"+day+"']").data("range");
		for (var objid in ranges)  {
			if (ranges[objid].end == rangeEnd) {
				var rangeID = objid;
			}
		}
		var startHour = ranges[rangeID].start;
		var endHour = ranges[rangeID].end;
		var startmins = ranges[rangeID].startmins
		var endmins = ranges[rangeID].endmins
		//console.log(ranges[rangeID]);
		
		var html = "<div style='margin-bottom: 20px;'><div style='width:50px; display: inline-block' >From: </div><input type='text' data-day='"+day+"'  data-originalrange='{\"start\": "+startHour+", \"end\": "+endHour+"}' id='timepickerStart' value='"+startHour+':'+startmins+"' class='timepicker'></div><div><div style='width:50px; display: inline-block' >To: </div><input type='text' data-day='"+day+"'  id='timepickerEnd' value='"+endHour+':'+endmins+"' class='timepicker'></div>";
		
		$("#pageModal .modal-body").html(html);
		$('#timepickerStart').wickedpicker({now: startHour+':'+startmins, twentyFour: true, minutesInterval:10});
		$('#timepickerEnd').wickedpicker({now: endHour+':'+endmins, twentyFour: true, minutesInterval:10});
		
		$("#pageModal").modal('show');
	 });
	 
	 $(".editRangePeriod").on("mouseup", function(event) {
		 event.stopImmediatePropagation()
	 });
	 
	 
		// update data on modal close. 
	 $("#pageModal").on("hidden.bs.modal", function () {
		
		var startTimeParts = $("#timepickerStart").val().split(":");
		var day = $("#timepickerStart").data("day");
		if (parseInt(startTimeParts[0]) < 10)  {
			var startHour = startTimeParts[0].substring(1).trim();
		} else var startHour = startTimeParts[0].trim();
		var startMin = startTimeParts[1].trim();
		
		var endTimeParts = $("#timepickerEnd").val().split(":");
		if (parseInt(endTimeParts[0]) < 10)  {
			var endHour = endTimeParts[0].substring(1).trim();
		} else var endHour = endTimeParts[0].trim();
		var endMin = endTimeParts[1].trim();
		
		//console.log("startHour = " + startHour +":"+ startMin);
		//console.log("endHour = " + endHour+":"+ endMin);
		// save start mins
		$(".timeperiod[data-day='"+day+"'][data-id='"+startHour+"']").data('startmins', startMin);
		// save end mins
		$(".timeperiod[data-day='"+day+"'][data-id='"+endHour+"']").data('endmins', endMin);
		
		$(".timeperiod[data-day='"+day+"'][data-id='"+startHour+"'] .timeperiodText").html(startHour+":"+startMin);
		$(".timeperiod[data-day='"+day+"'][data-id='"+endHour+"'] .timeperiodText").html(endHour+":"+endMin);
		
		// mark range as blocked.
		//makeSelection(day, $("#timepickerStart").data("originalrange").start, $("#timepickerStart").data("originalrange").end, "unblocked");
		
		var origStart = $("#timepickerStart").data("originalrange").start;
		var origEnd = $("#timepickerStart").data("originalrange").end;
		if ( origStart < startHour)  {
			while (origStart < startHour)  {
				$(".timeperiod[data-day='"+day+"'][data-id='"+origStart+"']").toggleClass("blocked unblocked"); 
				origStart++
			}
		}
		
		if (origEnd > endHour)  {
			while (origEnd > endHour)  {
				$(".timeperiod[data-day='"+day+"'][data-id='"+origEnd+"']").toggleClass("blocked unblocked"); 
				origEnd --;
			}
		}
		
		
		
		makeSelection(day, startHour, endHour, "blocked");
		getRange(day);
		markRangeEnd(day);
		saveTimetable();
		
		
	});
	
	function rewriteLabels()  {
		//console.log("rewriting lables");
		if ($( document ).width() > 880)  {
			 $("#Monday-tab").html("Monday");
			 $("#Tuesday-tab").html("Tuesday");
			 $("#Wednesday-tab").html("Wednesday");
			 $("#Thursday-tab").html("Thursday");
			 $("#Friday-tab").html("Friday");
			 $("#Saturday-tab").html("Saturday");
			 $("#Sunday-tab").html("Sunday");
			 
		 } else {
			 $("#Monday-tab").html("Mon");
			 $("#Tuesday-tab").html("Tue");
			 $("#Wednesday-tab").html("Wed");
			 $("#Thursday-tab").html("Thur");
			 $("#Friday-tab").html("Fri");
			 $("#Saturday-tab").html("Sat");
			 $("#Sunday-tab").html("Sun"); 
		 }
	}
	 
	 $( window ).resize(rewriteLabels);
	
	function isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	
	 function saveTimetable() {
		 
		 var deviceid = $("body").data("deviceid");
		 var name = $("body").data("devicename");
		 var mac = $("body").data("mac");
		 var days = Array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
		 var timetable = Array();
		 for (var day in days)  {
			 
			 //console.log(days[day]);
			 var schedule =$(".timeperiod[data-day='"+days[day]+"']").data("range");
			 if (typeof schedule !== 'undefined')  {
				 timetable[day] = {'deviceid': deviceid, 'name': name, 'mac': mac, 'day': days[day], 'schedule': schedule};
			 }
			 
		 }
		 
		 $.post( "ajax/functions.php", {'action': 'saveTimetable', 'data':timetable})
		  .done(function( data ) {
			console.log( data );
		  }); 
			 }
	 
	 function loadTimetable()  {
		 var mac = $("body").data("mac");
		 $.post( "ajax/functions.php", {'action': 'loadTimetable', 'mac': mac})
		  .done(function( data ) {
			  if (isJson(data) && data.length > 10) {
				  var json = JSON.parse(data);
				  //console.log( json.schedule );
				  for (var i in json.schedule) {
					//console.log(json.schedule[i]);
					var startTimeParts = json.schedule[i].start.split(":");
					var day = json.schedule[i].day;
					if (parseInt(startTimeParts[0]) < 10)  {
						var startHour = startTimeParts[0].substring(1).trim();
					} else var startHour = startTimeParts[0].trim();
					var startMin = startTimeParts[1].trim();
					
					var endTimeParts = json.schedule[i].end.split(":");
					if (parseInt(endTimeParts[0]) < 10)  {
						var endHour = endTimeParts[0].substring(1).trim();
					} else var endHour = endTimeParts[0].trim();
					var endMin = endTimeParts[1].trim();
					
					$(".timeperiod[data-day='"+day+"'][data-id='"+startHour+"']").data("startmins", startMin);
					$(".timeperiod[data-day='"+day+"'][data-id='"+endHour+"']").data("startmins", endMin);
					
					$(".timeperiod[data-day='"+day+"'][data-id='"+startHour+"'] .timeperiodText").html(startHour+":"+startMin);
					$(".timeperiod[data-day='"+day+"'][data-id='"+endHour+"'] .timeperiodText").html(endHour+":"+endMin);
		
					
					
					//console.warn("blocking " + day +" " + startHour +" " + endHour);
					makeSelection(day, startHour, endHour, "blocked")
					getRange(day);
					markRangeEnd(day);
				  }
				  
				  
			  }
		  }); 
		 
	 }
	 rewriteLabels();
	loadTimetable()
	
});