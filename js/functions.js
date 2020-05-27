// Improved date range picker
$(function() {
    $('input[name="dates"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

$(function() {
  $('input[name="whyDoesThisNotWork').daterangepicker({
    ranges: {
        'This Month': [moment(), moment()], //today
        'Next 30 days': [moment().subtract(1, 'days'), moment().subtract(1, 'days')], //yesterday
        'Next 90 days': [moment().subtract(6, 'days'), moment()], //last 7 days
        'Next 365 days': [moment().subtract(29, 'days'), moment()], //last 30 days
        // 'This Month': [moment().startOf('month'), moment().endOf('month')], // this month
        // 'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')] //last month
    },
    "locale": {
        "format": "MM/DD/YYYY",
        "separator": " - ",
        "applyLabel": "Apply",
        "cancelLabel": "Cancel",
        "fromLabel": "From",
        "toLabel": "To",
        "customRangeLabel": "Custom",
        "weekLabel": "W",
        "daysOfWeek": [
            "Su",
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fr",
            "Sa"
        ],
        "monthNames": [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        "firstDay": 1
    },
    "showCustomRangeLabel": false, 
    "startDate": "05/21/2020",
    "endDate": "05/27/2020"
  }, function(start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  });
});

