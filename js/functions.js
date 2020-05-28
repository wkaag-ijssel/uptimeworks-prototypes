// Date range picker
$(function() {
    $('input[name="dates"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

// Date range picker with only predefined ranges
$(function() {
  $('input[name="fixedRangeDatePicker').daterangepicker({
    ranges: {
        'This Month': [moment(), moment()],
        'Next 3 Months': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Next 6 Months': [moment().subtract(6, 'days'), moment()],
        'Next 12 Months': [moment().subtract(29, 'days'), moment()],
    },
    "showCustomRangeLabel": false,
    "startDate": "05/22/2020",
    "endDate": "05/28/2020"
  }, function(start, end, label) {
    // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    console.log(label);
  });
});

$(function() {

  var start = moment().subtract(29, 'days');
  var end = moment();

  function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }

  $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      showCustomRangeLabel: false,
      ranges: {
         'This Month': [moment(), moment()],
         'Next 3 Months': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
         'Next 6 Months': [moment().subtract(6, 'days'), moment()],
         'Next 12 Months': [moment().subtract(29, 'days'), moment()]
        //  'This Month': [moment().startOf('month'), moment().endOf('month')],
        //  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
  }, cb);

  cb(start, end);

});