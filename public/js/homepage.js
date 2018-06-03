

$('#business_type_select').on("change", function(e) {
  $("#contact_form").css('display', 'block');

  $("#business_type_select").css("border", "solid 1px #eaeaea");
  var val = $("#business_type_select").val();

  if(val == "local") {
    $(".local_field").css('display', 'inline');
    $(".online_field").css('display', 'none');
    $(".local_field").attr('required', 'required');
    $(".online_field").removeAttr('required');
    $(".both").css('display', 'inline');
  }
  else if(val == "online") {
    $(".local_field").css('display', 'none');
    $(".online_field").css('display', 'inline');
    $(".local_field").removeAttr('required');
    $(".online_field").attr('required', 'required');
    $(".both").css('display', 'inline');
  }
  else if(val == "both") {
    $(".local_field").css('display', 'inline');
    $(".online_field").css('display', 'inline');
    $(".local_field").attr('required', 'required');
    $(".online_field").attr('required', 'required');
    $(".both").css('display', 'inline');
  }
  else if(val == "none") {
    $(".local_field").css('display', 'none');
    $(".online_field").css('display', 'none');
    $(".local_field").removeAttr('required');
    $(".online_field").removeAttr('required');
    $(".both").css('display', 'none');
  }

});

// $(document).ready( function() {
//   $('#merchant').validate({
//     rules: {
//       business_name: {
//         required: true
//       },
//       business_phone: {
//         required: true
//       }
//     }
//   }).checkform();
// });
