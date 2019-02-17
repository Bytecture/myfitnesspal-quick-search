var fancybox = document.getElementById('fancybox-content');

var config = { attributes: true, childList: true, subtree: true };
var callback = function (mutationsList, observer) {
    if (mutationsList.length > 0) {

        for (var mutation of mutationsList) {
            if (mutation.type == 'childList') {

                var nutritionalTable = $(mutation.addedNodes).find('table#nutrition-facts');
                if (nutritionalTable.length == 0) {
                    nutritionalTable = $(mutation.target).find('table#nutrition-facts');
                }

                if (nutritionalTable.length != 0) {
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
                    let proteinGrams = nutritionTableArray[5][3].replace(/\D/g, '');

                    const macroCalories = proteinGrams * 4 + carbGrams * 4 + fatGrams * 9;
                    const macroCaloriesMax = macroCalories + macroCalories * 0.05;
                    const macroCaloriesMin = macroCalories - macroCalories * 0.05;
                    if (calories > macroCaloriesMax || calories < macroCaloriesMin) {
                        //document.getElementById('nutrition-facts').style.color = 'red';
                        nutritionalTable[0].style.color = 'red';//this line is needed or it seems to hang.
                        $(nutritionalTable).prepend("<div>Macro calories: " + macroCalories.toString() + "</div>")
                    }
                }
            }
        }

    }
};
var popupObserver = new MutationObserver(callback);

// Start observing the target node for configured mutations
popupObserver.observe(fancybox, config);
