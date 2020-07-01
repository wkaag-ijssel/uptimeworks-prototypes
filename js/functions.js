// Date range picker
$(function() {
    $('input[name="dates"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

$(function(){
  let datepicker = document.getElementById('reportrange')
  let type = datepicker.getAttribute('range');
  let range;

  if (type == "past") {
    range = {
      'Today':         [moment(), moment()],
      'Yesterday':     [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 days':   [moment().subtract(6, 'days'), moment()],
      'Last 30 days':  [moment().subtract(29, 'days'), moment()],
      'Last 90 days':  [moment().subtract(89, 'days'), moment()],
      'Last 365 days': [moment().subtract(364, 'days'), moment()]
   }
  }

  if (type == "future") {
    range = {
      'Today':         [moment(), moment()],
      'Next 7 days':   [moment(), moment().add(6, 'days')],
      'Next 30 days':  [moment(), moment().add(29, 'days')],
      'Next 90 days':  [moment(), moment().add(89, 'days')],
      'Next 365 days': [moment(), moment().add(364, 'days')]
   }
  } 

  if (type == "combined") {
    range = {
      'Last 365 days': [moment().subtract(364, 'days'), moment()],
      'Last 90 days':  [moment().subtract(89, 'days'), moment()],
      'Last 30 days':  [moment().subtract(29, 'days'), moment()],
      'Last 7 days':   [moment().subtract(6, 'days'), moment()],
      'Today':         [moment(), moment()],
      'Next 7 days':   [moment().add(6, 'days'), moment()],
      'Next 30 days':  [moment().add(29, 'days'), moment()],
      'Next 90 days':  [moment().add(89, 'days'), moment()],
      'Next 365 days': [moment().add(364, 'days'), moment()]
    }
  }

  setupDateRangePicker(range);
})

function setupDateRangePicker(range) {
  // Starting values
  let start = moment(); //moment().subtract(29, 'days');
  let end = moment();
  let label = "Today"

  function cb(start, end, label) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      setLabel(label)
  }

  $('#reportrange').daterangepicker({
      startDate: start,
      endDate: end,
      ranges: range,
      showCustomRangeLabel: false
  }, cb);
  cb(start, end, label);
};

function setLabel(date_range){
  document.getElementById('datepicker-label').innerHTML = date_range
}

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