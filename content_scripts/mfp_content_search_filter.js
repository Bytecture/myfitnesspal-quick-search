
$(document).ready(function () {

  $('.tabbed').hide();
  $('#search').focus();
});

  console.log('here');
setTimeout(function () {
  $('div.pagination').hide();
  $('.table-footer').hide();
  let $tbody_r = $('#recent_page_1 > table > tbody');
  let baseIndex = 100;
  let external_ids = [];

  let searchInput = $('#search');

  function copyFromExistingTable($tbody_f, logIdOnly) {


    tbody_f = $tbody_f;
    let $tableRows = $tbody_f.children('tr');

    $($tableRows).each(function (i) {
      let rowToCopy = $($tableRows[i]);

      if (rowToCopy.find('td.no_results').length == 0) {
        var newExternalId = rowToCopy.find('input.checkbox').attr('data-food-external-id');
        //only built in foods have external ids.  Meals and recipes do not have external id
        if (!newExternalId || external_ids.indexOf(newExternalId) == -1) {
          external_ids.push(newExternalId);
          if (!logIdOnly) {
            rowToCopy.clone().appendTo($tbody_r);
          }
          else {
            console.log('skipping');
          }
        }
      }
    });
  }


  copyFromExistingTable($('#recent_page_1 > table > tbody'), true);
  copyFromExistingTable($('#frequent_page_1 > table > tbody'));
  searchInput.on('change paste keyup', doQuickSearch);



  function doQuickSearch(e) {
    let inputValue = searchInput.val().toLowerCase();
    var $rows = $($tbody_r).children();
    $($rows).each(function (i) {
      let row = $($rows[i]).html();
      let hide = inputValue != '' && (row.toLowerCase().indexOf(inputValue) === -1);

      if (hide) {
        $($rows[i]).hide();
      }
      else {
        $($rows[i]).show();
      }

    });
  }

  var LOAD_TYPES = {
    RECENT: "/food/load_recent",
    MY_FOODS: "/food/load_my_foods",
    MEALS: "/food/load_meals",
    RECIPES: "/food/load_recipes"
  };

  function loadFromServer(pageNo, fromWhere) {


    var deferred = new $.Deferred();
    setTimeout(function () {

      function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }

      let mealNo = getParameterByName('meal');
      let base_index = baseIndex += 25;
      $.ajax({
        type: 'POST',
        url: fromWhere,
        data: { meal: mealNo, base_index: base_index, page: pageNo },
        dataType: 'html',
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", $("#input_auth").val());
          request.setRequestHeader("X-NewRelic-ID", $("#input_xpid").val());
        },
        success: function (r) {


          copyFromExistingTable($($.parseHTML(r)).find('tbody'));
          console.log({ logged_from_server: pageNo });
          doQuickSearch();
          deferred.resolve();
        },
        always: function (r) {
          debugger;
        }
      });
    }, 500);
    return deferred.promise();
  }

  loadFromServer(2, LOAD_TYPES.RECENT).then(function () {
    loadFromServer(3, LOAD_TYPES.RECENT).then(function () {
      loadFromServer(4, LOAD_TYPES.RECENT).then(function () {
        loadFromServer(1, LOAD_TYPES.MY_FOODS).then(function () {
          loadFromServer(1, LOAD_TYPES.MEALS).then(function () {
            loadFromServer(1, LOAD_TYPES.RECIPES).then(function () {
            });
          });
        });
      });
    });
  });

}, 3000);