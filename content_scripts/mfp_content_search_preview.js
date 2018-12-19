var fancybox = document.getElementById('fancybox-content');

var config = { attributes: true, childList: true, subtree: true };
var callback = function (mutationsList, observer) {
    if (mutationsList.length > 0) {

        for (var mutation of mutationsList) {
            if (mutation.type == 'childList') {

                var nutritialTable = $(mutation.addedNodes).find('table#nutrition-facts');
                if (nutritialTable.length == 0) {
                    nutritialTable = $(mutation.target).find('table#nutrition-facts');
                }

                if (nutritialTable.length != 0) {
                    var nutritionTableArray = [];

                    $("table#nutrition-facts tr").each(function () {
                        var arrayOfThisRow = [];
                        var tableData = $(this).find('td');
                        if (tableData.length > 0) {
                            tableData.each(function () { arrayOfThisRow.push($(this).text()); });
                            nutritionTableArray.push(arrayOfThisRow);
                        }
                    });

                    let calories = nutritionTableArray[0][1];
                    let fatGrams = nutritionTableArray[1][1].replace(/\D/g, '');
                    let carbGrams = nutritionTableArray[2][3].replace(/\D/g, '');
                    let protienGrams = nutritionTableArray[5][3].replace(/\D/g, '');

                    const macroCalories = protienGrams * 4 + carbGrams * 4 + fatGrams * 9;
                    if (protienGrams * 4 + carbGrams * 4 + fatGrams * 9 != calories) {
                        //document.getElementById('nutrition-facts').style.color = 'red';
                        nutritialTable[0].style.color = 'red';//this line is needed or it seems to hang.
                        $(nutritialTable).prepend("<div>Macro calories: " + macroCalories.toString() + "</div>")
                    }
                }
            }
        }

    }
};
var popupObserver = new MutationObserver(callback);

// Start observing the target node for configured mutations
popupObserver.observe(fancybox, config);



// $('div.nutritional_info > a').on('click', function(){
//     console.log('a');
// });


// $('li.matched-food').on('click', function () {

//     setTimeout(function () {
//         debugger;
//         var food_entry_qty = $("#content-block #food_entry_quantity").val(),
//             food_entry_weight = $("#content-block #food_entry_weight_id").val(),
//             food_entry_serving_size = {
//                 item: {
//                     serving_sizes: []
//                 }
//             },
//             food_entry_weight_option = $("#food_entry_weight_id option");
//         $.each(food_entry_weight_option, function (serving_size_info, d) {
//             d = $(d);
//             var valueAndUnits = $(d).html().split(" ")

//             serving_size_info = {
//                 //value: d.data("value"),
//                 //unit: d.data("unit"),
//                 value: valueAndUnits[0],
//                 unit: valueAndUnits[1],
//                 nutrition_multiplier: d.data("nutrition-multiplier"),
//                 selected: serving_size_info === food_entry_weight
//             };
//             food_entry_serving_size.item.serving_sizes.push(serving_size_info)
//         });
//         food_entry_weight_option = food_entry_serving_size.item.serving_sizes[food_entry_weight];
//         food_entry_weight_option.selected = !0;
//         $("#content-block #update_servings").data("external-id");
//         var e = $("#content-block #update_servings").data("version-id");
//         $.ajax({
//             url: "nutritional_info_v2",
//             type: "post",
//             data: {
//                 obfuscated_food_id: e,
//                 food_entry_quantity: food_entry_qty,
//                 serving_sizes: food_entry_serving_size,
//                 selected_value: food_entry_weight_option.value,
//                 selected_unit: food_entry_weight_option.unit,
//                 selected_nutritional_multiplier: food_entry_weight_option.nutrition_multiplier
//             },
//             beforeSend: function (request) {
//                 request.setRequestHeader("X-CSRF-Token", $("#input_auth").val());
//                 request.setRequestHeader("X-NewRelic-ID", $("#input_xpid").val());
//             },
//             success: function (resultHtml) {
//                 document.getElementById("create-item").innerHTML = resultHtml;

//             },
//             error: function (a, b, c) {
//                 console.log([a, b, c])
//             }
//         })
//     }, 3000);

//     return true;
// });

// $('#food-nutritional-details-form').on('submit', function(){
//     console.log('here');
//     return true;
// })







// $('.matched-food').on('click', function(){

//  let  link = $(this)[0].getElementsByTagName('div')[0].getElementsByTagName('a')[0];
//  console.log(link);
// var loadedItem = document.getElementById('loaded_item');
// var observer = new MutationObserver(function( mutations ) {
//        console.log(mutations);
//    mutations.forEach(function( mutation ) {
//    var newNodes = mutation.addedNodes; // DOM NodeList
// if( newNodes !== null ) { // If there are new nodes added

//     //alert('some thing has been changed');

//       }
//    });    
// });

// // Configuration of the observer:
// var config = { 
// attributes: true, 
// childList: true, 
// characterData: true,
//             subtree : true, 
// };

// // Pass in the target node, as well as the observer options
// observer.observe(loadedItem, config);


// $('#loaded_item').on('DOMSubtreeModified', function(){
//     console.log('here');
// (function show_nutritional_info_by_default() {
//     var food_entry_qty = $("#content-block #food_entry_quantity").val(),
//         food_entry_weight = $("#content-block #food_entry_weight_id").val(),
//         food_entry_serving_size = {
//             item: {
//                 serving_sizes: []
//             }
//         },
//         food_entry_weight_option = $("#food_entry_weight_id option");
//     $.each(food_entry_weight_option, function(a, d) {
//         d = $(d);
//         a = {
//             value: d.data("value"),
//             unit: d.data("unit"),
//             nutrition_multiplier: d.data("nutrition-multiplier"),
//             selected: a === food_entry_weight
//         };
//         food_entry_serving_size.item.serving_sizes.push(a)
//     });
//     food_entry_weight_option = food_entry_serving_size.item.serving_sizes[food_entry_weight];
//     food_entry_weight_option.selected = !0;
//     $("#content-block #update_servings").data("external-id");
//     var e = $("#content-block #update_servings").data("version-id");
//     $.ajax({
//         url: "nutritional_info_v2",
//         type: "post",
//         data: {
//             obfuscated_food_id: e,
//             food_entry_quantity: food_entry_qty,
//             serving_sizes: food_entry_serving_size,
//             selected_value: food_entry_weight_option.value,
//             selected_unit: food_entry_weight_option.unit,
//             selected_nutritional_multiplier: food_entry_weight_option.nutrition_multiplier
//         }, 
//         beforeSend: function (request) {
//           request.setRequestHeader("X-CSRF-Token", $("#input_auth").val());
//           request.setRequestHeader("X-NewRelic-ID", $("#input_xpid").val());
//         },
//         success: function(a) {
//             $.fancybox(a, {
//                 fitToView: !1,
//                 width: 580,
//                 height: 535,
//                 autoDimensions: !1,
//                 closeClick: !1,
//                 openEffect: "none",
//                 closeEffect: "none",
//                 overlayColor: "#000",
//                 overlayOpacity: .7,
//                 padding: 5,
//                 autoScale: !1
//             })
//         },
//         error: function(a, b, c) {
//             console.log([a, b, c])
//         }
//     })
// })();

// // $.ajax({
// //     type: 'POST',
// //     url: '/food/nutritional_info_v2'
// // })
//  return true;

// });