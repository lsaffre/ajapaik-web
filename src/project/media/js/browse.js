/* FUNCTIONS */

	/* browse */
var photoId;

function loadPhoto(id) {
	photoId = id;
	$.ajax({
		cache: false,
		url: '/foto/'+id+'/',
		success: function(result) {
			openPhotoDrawer(result);
			FB.XFBML.parse();
		},
		error: function (result) {
			alert('error');
		}
	});
}

function openPhotoDrawer(content) {
	$('#photo-drawer').html(content);
	$('#photo-drawer').animate({ top : '7%' });
}

function closePhotoDrawer() {
	$('#photo-drawer').animate({ top : '-100%' });
}

function uploadCompleted() {
	$.modal.close();
	closePhotoDrawer();
	loadPhoto(photoId);
}

/* INIT */

$(document).ready(function() {

/* BINDINGS */

	/* browse */

	$('#open-photo-drawer').click(function(e) {
		e.preventDefault();
		openPhotoDrawer();
	});

	$('#photo-drawer').delegate('#close-photo-drawer', 'click', function(e) {
		e.preventDefault();
		closePhotoDrawer();
	});

	$('#photo-drawer').delegate('ul.thumbs li.photo a', 'click', function(e) {
		e.preventDefault();
		$('#rephoto_img').attr('src', $(this).attr('rel') );
		if ($(this).attr('title')) {
			$('#meta_content').html($(this).attr('title'));
		}
		else {
			$('#meta_content').html('');
		}
	});

	$('#photo-drawer').delegate('a.add-rephoto', 'click', function(e) {
		e.preventDefault();
		$('#notice').modal();
	});


/*
	$('#photo-drawer').delegate('#upload', 'click', function(e) {
		$('#upload_field').trigger('click');
	});
*/

});