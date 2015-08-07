//Clear the code box on page load
$('#bk-code').val('alert(\'Hello there!\');');

//Show Multi Year Options
var myischecked = $('#myhidden').prop('checked');
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


//Variables that Reps can change
var internal_comment = "Multi-year discount"
var customer_note = "Lock in your rate and beat next year's price increase with a multi-year option. Plus, receive additional discounts!"

var year1discount = 0;
var year2discount = 5;
var year3discount = 10;

//Variables that Reps can NOT change
var myear_part1 = "$j('#lightwindow_iframe').contents().find('div[id*=\"additionalDiscountBlind\"]').toggle();$j('#lightwindow_iframe').contents().find('input[id*=\"onlyUseBase\"]').prop('checked',false);$j('#lightwindow_iframe').contents().find('input[id*=\"basePercent\"]').prop('value','"
var myear_part2 = "');$j('#lightwindow_iframe').contents().find('input[id*=\"plusOneYearPercent\"]').prop('value','"
var myear_part3 = "');$j('#lightwindow_iframe').contents().find('input[id*=\"plusTwoYearPercent\"]').prop('value','"
var myear_part4 = "');$j('#lightwindow_iframe').contents().find('#comment').text(\""
var myear_part5 = "\");$j('#lightwindow_iframe').contents().find('#customer_note').text(\""
var myear_part6 = "\");"

var check_all_sites = "$j('#lightwindow_iframe').contents().find('#vocab').prop('checked',true);$j('#lightwindow_iframe').contents().find('#rk').prop('checked',true);$j('#lightwindow_iframe').contents().find('#waz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#raz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#saz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#raz-ell').prop('checked',true);$j('#lightwindow_iframe').contents().find('#tr').prop('checked',true);$j('#lightwindow_iframe').contents().find('#headsprout').prop('checked',true);";



//Bookmarklet Creator

function minify(code) {
	// very simple minification (and not overly aggressive on whitespace)
	code = code.split(/\r\n|\r|\n/g);
	var i=0, len=code.length, noSemiColon = {}, t, lastChar;

	$.each('} { ; ,'.split(' '), function(i, x) {
		noSemiColon[x] = 1;
	});

	for (; i<len; i++) {
		// note: this doesn't support multi-line strings with slashes
		t = $.trim(code[i]);

		// this breaks when I put turnaries on multiple lines -- I'll leave it up
		// to the bookmarklet writers to do semi-colons properly
		// if (t) {
		//     // add semi-colon if we should
		//     if (!noSemiColon[t.charAt(t.length-1)]) {
		//         t += ';';
		//     }

		//     // prevent the inadvertently calling a function scenario
		//     if (i!=0 && t && t.substr(0, 1)=='(' && code[i-1].charAt(code[i-1].length-1)!=';') {
		//         t = ';' + t;
		//     }
		// }
		code[i] = t;
	}
	return code.join('').replace(/;$/, '');
}

function scriptLoader(code, path, isJQuery) {
	return (''
		+ 'function callback(){'
		+ (isJQuery ? '(function($){var jQuery=$;' : '')
		+ code
		+ (isJQuery ? '})(jQuery.noConflict(true))' : '')
		+ '}'
		+ 'var s=document.createElement("script");'
		+ 's.src="' + path + '";'
		+ 'if(s.addEventListener){'
		+ 's.addEventListener("load",callback,false)'
		+ '}else if(s.readyState){'
		+ 's.onreadystatechange=callback'
		+ '}'
		+ 'document.body.appendChild(s);'
		);
}

function asBookmarklet(code, jQueryPath, customPath) {
	code = minify(code);

	if (customPath) {
		code = scriptLoader(code, customPath, false);
	}

	if (jQueryPath) {
		code = scriptLoader(code, jQueryPath, true);
	}

	code = '(function(){' + code + '})()';
	return 'javascript:' + encodeURIComponent(code);
}


// Event Handlers

$('#bk-custom').change(function() {
	if ($(this).prop('checked')) {
		$('#bk-custom-url').focus();
	}
});

$('#bk-custom-url').change(function() {
	$('#bk-custom').prop('checked', $(this).val().length > 0);
});

$('#bk-form').submit(function(evt) {
	evt.preventDefault();


// Custom Code Generation
if (myischecked == false){
	var $code = $('#bk-code'),
	    $wrap = $('#bk-results'),
	    code = $code.val(),
	    jQueryPath = $('#bk-jquery').prop('checked') ? $('#bk-jquery').data('jquery-url') : '',
	    customPath = $('#bk-custom').prop('checked') ? $('#bk-custom-url').val() : '',
	    $result;

	if (!$.trim(code)) {
		alert('Please enter some code first, so I can create a glorious bookmarklet for you!');
		return;
	}

	code = asBookmarklet(code, jQueryPath, customPath);

	$result = $('<div>', {'class': 'result'}).append(
		$('<p>', {'html': '<em>Congrats!</em> You can save this to your bookmarks/favorites by:<br /><br /><b>Internet Explorer:</b> Right-click the link, and select "Add to favorites"<br /><b>Firefox:</b>Right-click the link, and select "Bookmark this Link"<br /><b>Chrome:</b> Click and drag the link to your bookmarks bar.<br />Be sure to give it a descriptive name!<br /><br /> Here\'s the link: '}).append(
		$('<a/>', {
			'class': 'bookmarklet',
			href: code,
			text: 'Mutli-Year Quote'
		}))
	);
	
	// Animation
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
	    $wrap = $('#bk-results'),	    

	    jQueryPath = $('#bk-jquery').prop('checked') ? $('#bk-jquery').data('jquery-url') : '',
	    customPath = $('#bk-custom').prop('checked') ? $('#bk-custom-url').val() : '',
	    $result,
	    full_multiyear = myear_part1 + year1discount + myear_part2 + year2discount + myear_part3 + year3discount + myear_part4 + internal_comment + myear_part5 + customer_note + myear_part6,
	    check_all_sites = "$j('#lightwindow_iframe').contents().find('#vocab').prop('checked',true);$j('#lightwindow_iframe').contents().find('#rk').prop('checked',true);$j('#lightwindow_iframe').contents().find('#waz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#raz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#saz').prop('checked',true);$j('#lightwindow_iframe').contents().find('#raz-ell').prop('checked',true);$j('#lightwindow_iframe').contents().find('#tr').prop('checked',true);$j('#lightwindow_iframe').contents().find('#headsprout').prop('checked',true);";

	//Including Check All Sites option
	var check_all_option = $('#includecheckall').prop('checked');
	if (check_all_option == true){
		var my_and_checkall = full_multiyear + check_all_sites;
		$('#bk-code').val(my_and_checkall);
	}
	if (check_all_option == false){
		$('#bk-code').val(full_multiyear);
	}
	
	var $code = $('#bk-code'),
	    code = $code.val();


	if (!$.trim(code)) {
		alert('Please enter some code first, so I can create a glorious bookmarklet for you!');
		return;
	}

	code = asBookmarklet(code, jQueryPath, customPath);

	$result = $('<div>', {'class': 'result'}).append(
		$('<p>', {'html': '<em>Congrats!</em> You can save this to your bookmarks/favorites by:<br /><br /><b>Internet Explorer:</b> Right-click the link, and select "Add to favorites"<br /><b>Firefox:</b>Right-click the link, and select "Bookmark this Link"<br /><b>Chrome:</b> Click and drag the link to your bookmarks bar.<br />Be sure to give it a descriptive name!<br /><br /> Here\'s the link: '}).append(
		$('<a/>', {
			'class': 'bookmarklet',
			href: code,
			text: 'Mutli-Year Quote'
		}))
	);
	
	// Animation
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
});