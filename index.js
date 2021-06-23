////////////////////////////////////////
//////// FOR HEADER DROPDOWNS /////////
///////////////////////////////////////
function DropDown(el, defaultText) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.basePlaceholder = defaultText;
    this.opts = this.dd.find('ul.options li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}

DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function (e) {

            // console.log(obj.basePlaceholder.text());
            
            var opt = $(this);
            if (opt.text() == 'Select None') {
                this.val = '';
                obj.index = -1;
                obj.placeholder.text(obj.basePlaceholder);
                // console.log(obj.basePlaceholder.text());
                return;
            }
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
            $(e).stopPropagation();
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    },
    reset: function () {
        this.val = '';
        this.index = -1;
        this.placeholder.text(this.basePlaceholder);
        return;
    }
}

var dd1 = new DropDown($('#ebdita-to-dropdown'), "EBDITA - TO +");
var dd2 = new DropDown($('#pat-to-dropdown'), "PAT - TO +");
var dd3 = new DropDown($('#sector-dropdown'), "Sector");
var dd4 = new DropDown($('#industry-dropdown'), "Industry");
var dd5 = new DropDown($('#company-dropdown'), "Company");

$(function () {



    $(document).click(function () {
        // all dropdowns
        $('.custom-dropdown').removeClass('active');
    });
    $('.custom-dropdown').click(function (e) {
        // all dropdowns
        $('.custom-dropdown').removeClass('active');
        $(e.currentTarget).addClass("active");

    });



});


////////////////////////////////////////
/////////// FOR Calendar ///////////
///////////////////////////////////////

var start = moment().subtract(29, 'days');
var end = moment();

function updateDate(start, end) {
    // $('.picker-div').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
    $('.picker-div > span').html(start.format('MMM, YYYY') + ' - ' + end.format('MMM, YYYY'));
}

$('.picker-div').daterangepicker({
    startDate: start,
    endDate: end,
    linkedCalendars: false,
    // alwaysShowCalendars: true,
    // showCustomRangeLabel: true,
    applyButtonClasses: "drp-apply orange-btn",
    cancelButtonClasses: "drp-cancel",
    ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }
}, updateDate);

updateDate(start, end);



////////////////////////////////////////
//////// FOR Checkbox Dropdown ////////
///////////////////////////////////////

function CheckboxDropDown(el, defaultText) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.basePlaceholder = defaultText;
    this.opts = this.dd.find('ul.options li');
    this.checkboxes = this.dd.find('ul.options li > input');
    this.val = [];
    this.index = [-1];
    this.initEvents();
}

CheckboxDropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function (e) {
            var opt = $(this);
            e.stopPropagation();

            // If its Clear All Clear all the values.
            var array = $(obj.checkboxes).toArray();
            if (opt.text().trim() === "Clear All") {
                array.forEach(input => {
                    input.checked = false;
                    obj.val = [];
                    return;
                });
            }

            // or add the checked value to the value array

            var filteredArray = array.filter((el) => {
                return el.checked == true;
            });

            if (filteredArray.length == 1) {
                var element = filteredArray[0];
                obj.placeholder.text(element.name);

            } else if (filteredArray.length == 0) {
                obj.placeholder.text(obj.basePlaceholder);
            } else {
                obj.placeholder.text(filteredArray.length + " Selected");
            }
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}

var dd6 = new CheckboxDropDown($('#checkbox-filter-dropdown'), "Select Filters");


// For Filters Reset Button


// Text Inputs
var marketCapLess = document.querySelector("#market-cap-less");
var marketCapgreater = document.querySelector("#market-cap-greater");
var salesYOY = document.querySelector("#sales-yoy");
var ebditaYOY = document.querySelector("#ebdita-yoy");
var patYOY = document.querySelector("#pat-yoy");
var salesQOQ = document.querySelector("#sales-qoq");
var ebditaQOQ = document.querySelector("#ebdita-qoq");
var patQOQ = document.querySelector("#pat-qoq");
var ttmPB = document.querySelector("#ttm-pb");
var ttmPE = document.querySelector("#ttm-pe");
var ttmSalesAbs = document.querySelector("#ttm-sales-abs");
var ttmPatAbs = document.querySelector("#ttm-pat-abs");
var ltp = document.querySelector("#ltp");
var roce = document.querySelector("#roce");
var grossProfit = document.querySelector("#gross-profit");
var grossMargin = document.querySelector("#gross-margin");
var extra1 = document.querySelector("#extra-1");
var extra2 = document.querySelector("#extra-2");
// Checkbox Input
var currentQuarter = document.querySelector("#current-quarter");
// Dropdown Inputs

var ebditaToDropdown = document.querySelector("#ebdita-to-dropdown");
var extra1 = document.querySelector("#extra-1");
var extra1 = document.querySelector("#extra-1");
var extra1 = document.querySelector("#extra-1");
var extra1 = document.querySelector("#extra-1");

var inputElements = [marketCapLess, marketCapgreater, salesYOY, ebditaYOY, patYOY, salesQOQ, ebditaQOQ, patQOQ, ttmPB, ttmPE, ttmSalesAbs, ttmPatAbs, ltp, roce, grossMargin, grossProfit, extra1, extra2];
var dropdowns = [dd1, dd2, dd3, dd4, dd5]
function onResetClick() {

    //reset inputs
    inputElements.forEach((el) => {
        el.value = "";
    });

    //reset checkbox
    currentQuarter.checked = false;

    //reset dropdowns
    dropdowns.forEach((dd) => {
        dd.reset();
    })


}


/////////////////////////////
///// Sheets Management //////
////////////////////////////

var currentActiveSheet = "sheet-1";
var currentActiveTable = "table-1";
$(".table-2").hide();
$(".table-3").hide();
$('.sheet-btn').click(function (e) {
    // console.log(e.target.outerText);

    swichSheet(e.target.outerText);

});

function swichSheet(sheetName) {
    $("." + currentActiveSheet).removeClass("active");
    $("." + currentActiveTable).hide();
    
    if (sheetName == "Sheet1") {
        currentActiveSheet = "sheet-1";
        currentActiveTable = "table-1";
        $(".sheet-1").addClass("active");
        $(".table-1").show();
    } else if (sheetName == "Sheet2") {
        currentActiveSheet = "sheet-2";
        currentActiveTable = "table-2";
        $(".table-2").show();
        $(".sheet-2").addClass("active");
    } else if (sheetName == "Sheet3") {
        currentActiveSheet = "sheet-3";
        currentActiveTable = "table-3";
        $(".sheet-3").addClass("active");
        $(".table-3").show();
    }
    showOverflowCursor();

}


///////////// CHeck Text overflow in table data///////// 


function showOverflowCursor(){
    var tdArray = $('.table td div').toArray();
    tdArray.forEach((el) => {
        var isOverflowing = el.clientWidth < el.scrollWidth
            || el.clientHeight < el.scrollHeight;

        if (isOverflowing) {
            el.style.cursor = "w-resize";
        }
    });
}
showOverflowCursor();


// var header1ChildWidth = $('.table tr th:nth-child(1)').css('width');
// $('.table tr td:nth-child(1)').css('width', header1ChildWidth);

