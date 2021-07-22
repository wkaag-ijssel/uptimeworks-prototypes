// Color scheme
let pMain  = "#1a237e";
    pLight = "#534bae";
    pDark  = "#000051";
    sMain  = "#ffab00";
    sLight = "#ffdd4b";
    sDark  = "#c67c00";

let normal = "#00c853";
    lvl_1  = "#ffd740";
    lvl_2  = "#ffc400";
    lvl_3  = "#ffab00";
    lvl_4  = "#ff6f00";

 // Usage
const getDateLabels = () => {
    // Returns an array of dates between the two dates
    let getDates = (startDate, endDate) => {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    let dates = getDates(new Date("1 Nov 2020"), new Date("30 Nov 2020"));  
    let labels = dates;
    labels.forEach((test, index) => {
        let month = test.getMonth();
        let day = test.getDate();
        labels[index] = day + '-' + month + '-2020';
    });
    return labels
}

const targetValue = 100

const createCloudLineChart = (ctx, data, label) => {
    return (
        new Chart(ctx, {
            type: 'line',
            data: { 
                labels: label, //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
                datasets: [{
                    label: 'Savings',
                    data: data,
                    fill: false,
                    borderColor: sMain,
                    lineWidth: 0.1,
                    pointStyle: 'line',
                    lineTension: 0
                }]
            },
            options: {
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            autoSkipPadding: 20
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        ticks: {
                            suggestedMax: targetValue*1.2
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Memory (GB)'
                        }
                    }]
                }
            }
        })
    );
}

const createStorageLineChart = (ctx, data, label) => {
    return (
        new Chart(ctx, {
            type: 'line',
            data: { 
                labels: label, //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
                datasets: [{
                    label: 'Savings',
                    data: data,
                    fill: false,
                    borderColor: pMain,
                    lineWidth: 0.1,
                    pointStyle: 'line',
                    lineTension: 0
                }]
            },
            options: {
                legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            autoSkipPadding: 20
                        }
                    }],
                    yAxes: [{
                        position: 'right',
                        ticks: {
                            suggestedMax: targetValue*1.2
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Memory (GB)'
                        }
                    }]
                }
            }
        })
    );
}

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx1 = document.getElementById('cloudChart').getContext('2d');
    createCloudLineChart(ctx1, data[1], data[0])
})

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx2 = document.getElementById('cloudChart_1').getContext('2d');
    createCloudLineChart(ctx2, data[1], data[0])
})

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx3 = document.getElementById('storageChart').getContext('2d');
    createStorageLineChart(ctx3, data[1], data[0])
})

new Promise((resolve) => {
    let date = getDateLabels();
    let savings = [];
    savings[0] = 30;

    for(let i = 1; i < date.length; i++){
        savings[i] = savings[i-1] + Math.floor(Math.random()*10);
    }
    resolve([date, savings]);
}).then(data => {
    let ctx4 = document.getElementById('storageChart_1').getContext('2d');
    createStorageLineChart(ctx4, data[1], data[0])
})