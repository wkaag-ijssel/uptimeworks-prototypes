// Date range picker
$(function() {
    $('input[name="dates"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

$(function() {
  $('input[name="fixedRangeDatePicker').daterangepicker({
    ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    "showCustomRangeLabel": false,
    "startDate": "05/28/2020",
    "endDate": "06/03/2020"
  }, function(start, end, label) {
  console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  });
});


// Date range picker with both regular date selction and predefined ranges.
$(function() {
  $('input[name="combinedDatePicker').daterangepicker({
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
      "startDate": "05/28/2020",
      "endDate": "06/03/2020"
  }, function(start, end, label) {
    console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  });
});

// horizontalBar chart - styled
function horizontalBarChart(chartElem, data, labels){
  console.log(labels);
  return new Chart(chartElem, {
      type: 'horizontalBar',
      data: { 
          labels: labels,
          datasets: [{
              label: 'N. of tasks executed',
              backgroundColor: pDark,
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              data: data
          }]
      },
      options: {
          legend: {
              display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
          elements: {
              line: {
                  tension: 0, // disables bezier curves
                  borderWidth: 2
              },
              point:{
                  radius: 0 //hide data point indicators
              }
          },
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true,
                  position: 'left'
              }]
          }
      }
  });
};