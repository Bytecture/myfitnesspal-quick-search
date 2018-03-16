// const cardDataSet = {
//   "Select Card": ['', '', '', '', '', ''],
//   "Amex": ['341111597241002', '', '111', '27 Broadway', 'New York', '10004-1601'],
//   "Maestro": ['6761000000000006', '123456', '676', '6 Maestro Street', 'Exeter', 'EX16 7EF'],
//   "Maestro2": ['6333000023456788', '', '888', '1 Bd Victor, Paris', 'France', '75015'],
//   "MasterCard": ['5761000000000008', '123456', '576', '8 MasterCard Street', 'Highbridge', 'TA6 4GA'],
//   "MasterCard2": ['5301250070000191', '', '999', '76 Whiteladies Road', 'Clifton', 'BS8 2NT'],
//   "Visa": ['4761000000000001', '123456', '476', '1 Visa Street', 'Crewe', 'CW4 7NT'],
//   "Visa2": ['4111111111111111', '', '111', '28 Bishopgate Street', 'Sedgeford', 'PE36 4AW'],

// };

// chrome.extension.onRequest.addListener(setCardValue);

// function setCardValue(request, sender) {
//   console.log('setcardvalue');

//   const cardData = cardDataSet[request];
//   var ekashu_card_number = document.getElementById("ekashu_card_number").value = cardData[0];
//   var ekashu_card_number = document.getElementById("ekashu_input_expires_end_month").value = "07";
//   var ekashu_card_number = document.getElementById("ekashu_input_expires_end_year").value = "2022";
//   var ekashu_card_number = document.getElementById("ekashu_verification_value").value = cardData[2];
//   var ekashu_card_number = document.getElementById("ekashu_card_first_name").value = "FirstName"
//   var ekashu_card_number = document.getElementById("ekashu_card_last_name").value = "LastName"
//   var ekashu_card_number = document.getElementById("ekashu_card_address_1").value = cardData[3];
//   var ekashu_card_number = document.getElementById("ekashu_card_city").value = cardData[4];
//   var ekashu_card_number = document.getElementById("ekashu_card_zip_code").value = cardData[5];

// }

// function setCardData(cardData){

// }

// var div = document.getElementById("ekashu_content");
// let dropDown = document.createElement("select");
// $.each(cardDataSet, function (index, value) {
//   var op = new Option();
//   op.value = index;
//   op.text = index;
//   dropDown.options.add(op);
//   // var t = document.createTextNode("CLICK ME");       // Create a text node
//   // var button = document.createElement("button");
//   // button.appendChild(t);       
//   // div.appendChild(button);

// });

// dropDown.addEventListener('change', (e) => {
//   setCardValue(dropDown.value);
// });

// div.appendChild(dropDown);


var $tbody_r = $('#recent_page_1 > table > tbody');
(function copyFrequent() {
  var $tbody_f = $('#frequent_page_1 > table > tbody');

  var $tableRows = $tbody_f.children();

  $($tableRows).each(function (i) {
    $($tableRows[i]).clone().appendTo($tbody_r);
  })

  $('#frequent_tab').hide();
})();


(function quickSearch() {

  var $fields = $('#searchFoodByName')

  var testButton = document.createElement('input');
  //testButton.appendChild(document.createTextNode("Test"));
  testButton.class = "button";
  testButton.value = "test";
  testButton.type = "button";
  $($('#main')).prepend($(testButton));
  $(testButton).on('click', function (e) {
    $.ajax({
      type: 'POST',
      url: 'load_recent',
      data: { meal: 1, base_index: 125, page: 2 },
      dataType: 'html',
      beforeSend: function(request){
        request.setRequestHeader( "X-CSRF-Token",$("#input_auth").val());
        request.setRequestHeader( "X-NewRelic-ID", $("#input_xpid").val());
      },
      success: function (r) {
        debugger;
        //console.log(r);
      },
      always: function (r) {
        debugger;
      }
    });
  });

  var input = document.createElement("input");
  input.type = "text";
  input.id = 'dynamic_search';
  $($fields).append(input);
  input.placeholder = "Quick Search";
  input.onkeyup = function (e) {
    let inputValue = input.value.toLowerCase();

    var $rows = $($tbody_r).children();
    $($rows).each(function (i) {
      let row = $($rows[i]).html();
      let hide = inputValue != '' && (row.toLowerCase().indexOf(inputValue) === -1);
      $($rows[i]).css('visibility', hide ? 'hidden' : 'visible');
    });
  }

})();

$( document ).ajaxSuccess(function( event, request, settings ) {
	console.log(request.status);
});

$( document ).ajaxError(function( event, request, settings ) {
	console.log(request.status);
});

var input_auth = document.createElement("input");
var input_xpid = document.createElement("input");
input_auth.setAttribute("type", "hidden");
input_xpid.setAttribute("type", "hidden");


input_auth.id = "input_auth";
input_xpid.id = "input_xpid";

document.getElementById("main").appendChild(input_auth);
document.getElementById("main").appendChild(input_xpid);


$(document).ready(function(){
    var myScript = document.createElement("script");
    myScript.innerHTML = '$("#input_xpid").val(window.NREUM.loader_config.xpid); $("#input_auth").val(window.AUTH_TOKEN);';
    document.body.appendChild(myScript);
});