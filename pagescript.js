//Clear the code box on page load
$('#bk-code').val('alert(\'Hello there!\');');

//Toggle Option Visibility on Click
$("#showallheader").click(function(){
	$("#showalloptions").slideToggle("fast");
});
$("#expdateheader").click(function(){
	$("#expdateoptions").slideToggle("fast");
});
$("#multiyearheader").click(function(){
	$("#multiyearoptions").slideToggle("fast");
});

//Quote Expiration Date Functions
function FormatDate(date){
	var year = date.slice(0,4);
	var month = date.slice(5,7);
	var day = date.slice(8,10);
	return month + "-" + day + "-" + year
}

$("#datepicker").change(function(){
	date = $("#datepicker").val();
	nicedate = FormatDate(date);
	expdate_code = '$j("#lightwindow_iframe").contents().find("#valid_through").prop("value","' + nicedate + '")'
	expdate_link = 'javascript:(function(){' + expdate_code + '})()';
	$("#expirationdatelink").attr("href", expdate_link);
});


//Multi Year Functions
//Switch from Multi Year Options to Raw Code Box
var myischecked = $('#myhidden').prop("checked");
$('#multiyearlink').click(function(){
	if (myischecked == false){
		$('#myhidden').prop('checked',true);
	}
	if (myischecked == true){
		$('#myhidden').prop('checked',false);
	}
	myischecked = $('#myhidden').prop('checked');
	$('#my_options').toggle();
	$('#raw-code-form').toggle();
});

//Changing the HTML for the dib that is initially hidden/shown breaks the form, hence the next line.
$('#multiyearlink').click();

//And, for Firefox, making sure all options are unchecked to start.
$('#myhidden').prop('checked',false);
myischecked = true;
$('#includecheckall').prop('checked',false);
$('#myexpdate').prop('checked',false);
$('#itemizedcolumn').prop('checked',false);

//Multi Year Expiration Date Picker
$("#myexpdate").click(function(){
	var myexpdate = $("#myexpdate").prop("checked");
		$("#mydatebox").toggle();
});

//Variables that Reps can change
var internal_comment = "Multi-year discount";
var customer_note = "Lock in your rate and beat next year's price increase with a multi-year option. Plus, receive additional discounts!";
var year1discount = 0;
var year2discount = 5;
var year3discount = 10;

//Variables that Reps can NOT change
var myear_part1 = "$j('#lightwindow_iframe').contents().find('div[id*=\"additionalDiscountBlind\"]').toggle();$j('#lightwindow_iframe').contents().find('input[id*=\"onlyUseBase\"]').prop('checked',false);$j('#lightwindow_iframe').contents().find('input[id*=\"basePercent\"]').prop('value','";
var myear_part2 = "');$j('#lightwindow_iframe').contents().find('input[id*=\"plusOneYearPercent\"]').prop('value','";
var myear_part3 = "');$j('#lightwindow_iframe').contents().find('input[id*=\"plusTwoYearPercent\"]').prop('value','";
var myear_part4 = "');$j('#lightwindow_iframe').contents().find('#comment').text(\"";
var myear_part5 = "\");$j('#lightwindow_iframe').contents().find('#customer_note').text(\"";
var myear_part6 = "\");";

var check_all_sites = "$j('#lightwindow_iframe').contents().find('#vocab').prop('checked',true);$j('#lightwindow_iframe').contents().find('#rk').prop('checked',true);$j('#lightwindow_iframe').contents().find('#waz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#raz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#saz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#raz-ell').prop('checked',true);$j('#lightwindow_iframe').contents().find('#tr').prop('checked',true);$j('#lightwindow_iframe').contents().find('#headsprout').prop('checked',true);";

var myvalidthru_1 = "$j('#lightwindow_iframe').contents().find('#valid_through').prop('value','";
var myvalidthru_2 = "');";

var itemized_code = "$j('#lightwindow_iframe').contents().find('#displayItemizedDiscounts').prop('checked',false);";

//Other Global variables that should probably be put somewhere better
var $result,
		$wrap = $('#bk-results');

//Bookmarklet Creator
function minify(code) {
	// very simple minification (and not overly aggressive on whitespace)
	code = code.split(/\r\n|\r|\n/g);
	var i=0,
			len=code.length,
			noSemiColon = {},
			t,
			lastChar;

	$.each('} { ; ,'.split(' '), function(i, x) {
		noSemiColon[x] = 1;
	});

	for (; i<len; i++) {
		// note: this doesn't support multi-line strings with slashes
		t = $.trim(code[i]);
		code[i] = t;
	}
	return code.join('').replace(/;$/, '');
}

function asBookmarklet(code) {
	code = minify(code);
	code = "javascript:(function(){" + code + "})()";
	return  code;
}

function animate_result(){
	$wrap.children().stop(true, true).filter(':gt(1)').remove();
	$oldResult = $wrap.children().css({position: 'relative', left: 0});

	var oldHeight = $wrap.height();
	$oldResult.hide();
	$result.appendTo($wrap);
	var newHeight = $wrap.height();
	var wrapper_margin = $('#wrapper').outerWidth(true)
	var width = wrapper_margin - $wrap.width();
	$wrap.height(Math.max(oldHeight, newHeight));
	$oldResult.css({position: 'absolute', left: 500}).show();
	$result.css({position: 'absolute', left: -width+'px'});

	$oldResult.add($result).animate({
		left: '+='+width
	}, 450, function() {
		$oldResult.remove();
		$result.css({position: 'relative', left: 0});
		$wrap.height('auto');
	});
}

// The Main Function - Custom Bookmarklet Generated when "Create Link" button is clicked
$('#bk-form').submit(function(evt) {
	evt.preventDefault();
	var $code = $('#bk-code'),
			code = $code.val();

	//Using custom code
	if (myischecked == false){
		if (!$.trim(code)) {
			alert('Please enter some code first, so I can create a glorious bookmarklet for you! *If you see this message repeatedly, you may need to reload the page.*');
			return;
		}
		code = $('#bk-code').val();
		code = asBookmarklet(code);
		$result = $('<div>', {'class': 'result'}).append(
			$('<p>', {'html': '<em>Congrats!</em> You can save this to your bookmarks/favorites by:<br /><br /><b>Internet Explorer:</b> Right-click the link, and select "Add to favorites"<br /><b>Firefox:</b>Right-click the link, and select "Bookmark this Link"<br /><b>Chrome:</b> Click and drag the link to your bookmarks bar.<br />Be sure to give it a descriptive name!<br /><br /><strong>Bookmark this link:</strong> '}).append(
			$('<a/>', {
				'class': 'bookmarklet',
				href: code,
				text: 'Multi-Year Quote'
			}))
		);
		animate_result();
	}

	//Multi-Year Quote Generator
	if (myischecked == true){
		var $internal_comment = $('#internalnote'),
		    internal_comment = $internal_comment.val(),

		    $customer_note = $('#customernote'),
		    customer_note = $customer_note.val(),

		    $year1discount = $('#discount1'),
		    year1discount = $year1discount.val(),
		    $year2discount = $('#discount2'),
		    year2discount = $year2discount.val(),
		    $year3discount = $('#discount3'),
		    year3discount = $year3discount.val(),

				$validthrudate = $('#mydatepicker').val();
				validthrudate = FormatDate($validthrudate);
				myvalidthru = myvalidthru_1 + validthrudate + myvalidthru_2;

		    full_multiyear = myear_part1 + year1discount + myear_part2 + year2discount + myear_part3 + year3discount + myear_part4 + internal_comment + myear_part5 + customer_note + myear_part6;

		//Including Check All Sites option
		var check_all_option = $('#includecheckall').prop('checked');
		var valid_thru_option = $('#myexpdate').prop('checked');
		var itemized_column = $('#itemizedcolumn').prop('checked');

		checked_options:{
			if (check_all_option == true && valid_thru_option == true && itemized_column == true){
				$('#bk-code').val(full_multiyear + check_all_sites + myvalidthru + itemized_code);
				break checked_options;
			} else if (check_all_option == true && valid_thru_option == true){
				$('#bk-code').val(full_multiyear + check_all_sites + myvalidthru);
				break checked_options;
			} else if (check_all_option == true && itemized_column == true){
				$('#bk-code').val(full_multiyear + check_all_sites + itemized_code);
				break checked_options;
			} else if (valid_thru_option == true && itemized_column == true){
				$('#bk-code').val(full_multiyear + myvalidthru + itemized_code);
				break checked_options;
			} else if (check_all_option == true){
				$('#bk-code').val(full_multiyear + check_all_sites);
				break checked_options;
			} else if (valid_thru_option == true){
				$('#bk-code').val(full_multiyear + myvalidthru);
				break checked_options;
			} else if (itemized_column == true){
				$('#bk-code').val(full_multiyear + itemized_code);
				break checked_options;
			} else {
				$('#bk-code').val(full_multiyear);
			}
		}

		if (!$.trim(code)) {
			alert('Please enter some code first, so I can create a glorious bookmarklet for you!  *If you see this message repeatedly, you may need to reload the page.*');
			return;
		}
		code = $('#bk-code').val();
		code = asBookmarklet(code);
		$result = $('<div>', {'class': 'result'}).append(
			$('<p>', {'html': '<em>Congrats!</em> You can save this to your bookmarks/favorites by:<br /><br /><b>Internet Explorer:</b> Right-click the link, and select "Add to favorites"<br /><b>Firefox:</b>Right-click the link, and select "Bookmark this Link"<br /><b>Chrome:</b> Click and drag the link to your bookmarks bar.<br />Be sure to give it a descriptive name!<br /><br /><strong>Bookmark this link:</strong> '}).append(
			$('<a/>', {
				'class': 'bookmarklet',
				href: code,
				text: 'Multi-Year Quote'
			}))
		);

		animate_result();
		//$('#bk-code').val("");
	}
});
