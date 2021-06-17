// Color scheme
const pMain  = "#1a237e";
      pLight = "#534bae";
      pDark  = "#000051";
      sMain  = "#ffab00";
      sLight = "#ffdd4b";
      sDark  = "#c67c00";

const normal = "#00c853";
      lvl_1  = "#ffd740";
      lvl_2  = "#ffc400";
      lvl_3  = "#ffab00";
      lvl_4  = "#ff6f00";

// Job compliance
const date_range = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Issued Reports over Time
new Promise((resolve) => {
    let siteOne = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)+ 10));
    let siteTwo= Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)+ 10));
    let siteThree = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10))+ 0);
    let siteFour = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)) + 15);
    let avg = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)) + 10);

    resolve([date_range, avg, siteOne, siteTwo, siteThree, siteFour]);
}).then(data => {
    let ctx7 = document.getElementById('issuedReportsChart').getContext('2d');
    let chart7 = new Chart(ctx7, {
        type: 'line',
        data: { 
            labels: data[0], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'mean',
                data: data[1],
                fill: false,
                borderColor: 'lightgrey',
                backgroundColor: 'lightgrey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'this site',
                data: data[2],
                fill: false,
                borderColor: sMain,
                backgroundColor: sMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site B',
                data: data[3],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site C',
                data: data[4],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site D',
                data: data[5],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            }]
        },
        options: {
            legend: {
                display: true,
                position: "right",
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
                mode: 'nearest',
                intersect: false,
            },
            hover: {
                mode: 'dataset',
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
                    position: 'left',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Nr. of Issued Reports',
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10
                    }
                }]
            },
            onHover: function onHover (evt, activeElements) {
                if (!activeElements || !activeElements.length) {
                    // Reset all lines to normal color
                    this.data.datasets.forEach((dataset) => {
                        const { label } = dataset;                    
                        if (label === "mean") return dataset.borderColor = 'lightgrey';
                        if (label === "this site") return dataset.borderColor = sMain;
                        return dataset.borderColor = pMain;
                    });
                } else {
                    const activeIndex = activeElements[0]._datasetIndex;
                    this.data.datasets.forEach((dataset, index) => {
                        const { label } = dataset; 

                        // Highlight selected line
                        if (index == activeIndex) {                  
                            if (label === "mean") return dataset.borderColor = 'darkgrey';
                            if (label === "this site") return dataset.borderColor = sMain;
                            return dataset.borderColor = pMain;
                        };

                        // Fade other lines
                        if (label === "mean") return dataset.borderColor = "rgba(211,211,211,0.2)";
                        if (label === "this site") return dataset.borderColor = "rgba(255, 171, 0, 0.2)";
                        return dataset.borderColor = "rgba(26, 35, 126, 0.2)";
                    });
                }
                this.update();
                return;
            },
        }
    }); 
});

// Assets monitored
new Promise((resolve) => {
    const labels = ['This Site', 'Site A', 'Site C', 'Site D', 'Site E'];
    const data = [18, 12, 25, 1, 30];

    resolve([data, labels]);
}).then(data => {
    let ctx5 = document.getElementById('assetsMonitoredChart').getContext('2d');
    let chart5 = new Chart(ctx5, {
        type: 'horizontalBar',
        data: { 
            labels: data[1], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                data: data[0],
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                backgroundColor: [sMain, pMain, pMain, pMain, pMain]
            }]
        },
        options: {
            legend: {
                display: false,
                position: "right",
                labels: {
                    usePointStyle: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Facilities',
                    }
                }],
            },
        },
    }); 
});

// Critical Report-Asset Score per Week (CIR-AM Score)
new Promise((resolve) => {
    let siteOne = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)+ 10));
    let siteTwo= Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)+ 10));
    let siteThree = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10))+ 0);
    let siteFour = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)) + 15);
    let avg = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)) + 10);

    resolve([date_range, avg, siteOne, siteTwo, siteThree, siteFour]);
}).then(data => {
    let ctx7 = document.getElementById('cramScoreChart').getContext('2d');
    let chart7 = new Chart(ctx7, {
        type: 'line',
        data: { 
            labels: data[0], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'mean',
                data: data[1],
                fill: false,
                borderColor: 'lightgrey',
                backgroundColor: 'lightgrey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'this site',
                data: data[2],
                fill: false,
                borderColor: sMain,
                backgroundColor: sMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site B',
                data: data[3],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site C',
                data: data[4],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site D',
                data: data[5],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            }]
        },
        options: {
            legend: {
                display: true,
                position: "right",
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
                mode: 'nearest',
                intersect: false,
            },
            hover: {
                mode: 'dataset',
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
                    position: 'left',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'Score',
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10
                    }
                }]
            },
            onHover: function onHover (evt, activeElements) {
                if (!activeElements || !activeElements.length) {
                    // Reset all lines to normal color
                    this.data.datasets.forEach((dataset) => {
                        const { label } = dataset;                    
                        if (label === "mean") return dataset.borderColor = 'lightgrey';
                        if (label === "this site") return dataset.borderColor = sMain;
                        return dataset.borderColor = pMain;
                    });
                } else {
                    const activeIndex = activeElements[0]._datasetIndex;
                    this.data.datasets.forEach((dataset, index) => {
                        const { label } = dataset; 

                        // Highlight selected line
                        if (index == activeIndex) {                  
                            if (label === "mean") return dataset.borderColor = 'darkgrey';
                            if (label === "this site") return dataset.borderColor = sMain;
                            return dataset.borderColor = pMain;
                        };

                        // Fade other lines
                        if (label === "mean") return dataset.borderColor = "rgba(211,211,211,0.2)";
                        if (label === "this site") return dataset.borderColor = "rgba(255, 171, 0, 0.2)";
                        return dataset.borderColor = "rgba(26, 35, 126, 0.2)";
                    });
                }
                this.update();
                return;
            },
        }
    }); 
});

// Overall Acc/Vel per Day
new Promise((resolve) => {
    let siteOne = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)+ 10));
    let siteTwo= Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)+ 10));
    let siteThree = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10))+ 0);
    let siteFour = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)) + 15);
    let avg = Array.from({length: date_range.length}, () => Math.floor((Math.random()*10)) + 10);

    resolve([date_range, avg, siteOne, siteTwo, siteThree, siteFour]);
}).then(data => {
    let ctx7 = document.getElementById('overallAccVelChart').getContext('2d');
    let chart7 = new Chart(ctx7, {
        type: 'line',
        data: { 
            labels: data[0], //Array.from({length: date_range.length}, () => Math.floor(Math.random() * 40)),
            datasets: [{
                label: 'mean',
                data: data[1],
                fill: false,
                borderColor: 'lightgrey',
                backgroundColor: 'lightgrey',
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'this site',
                data: data[2],
                fill: false,
                borderColor: sMain,
                backgroundColor: sMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site B',
                data: data[3],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site C',
                data: data[4],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            },{
                label: 'site D',
                data: data[5],
                fill: false,
                borderColor: pMain,
                backgroundColor: pMain,
                borderWidth: 2,
                pointStyle: 'line',
                lineTension: 0,
                pointHoverBackgroundColor: 'rgba(0, 0, 0, 0)',
                pointHoverBorderColor: 'rgba(0, 0, 0, 0)',
            }]
        },
        options: {
            legend: {
                display: true,
                position: "right",
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
                mode: 'nearest',
                intersect: false,
            },
            hover: {
                mode: 'dataset',
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
                    position: 'left',
                    type: 'linear',
                    scaleLabel: {
                        display: true,
                        labelString: 'g RMS',
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 10
                    }
                }]
            },
            onHover: function onHover (evt, activeElements) {
                if (!activeElements || !activeElements.length) {
                    // Reset all lines to normal color
                    this.data.datasets.forEach((dataset) => {
                        const { label } = dataset;                    
                        if (label === "mean") return dataset.borderColor = 'lightgrey';
                        if (label === "this site") return dataset.borderColor = sMain;
                        return dataset.borderColor = pMain;
                    });
                } else {
                    const activeIndex = activeElements[0]._datasetIndex;
                    this.data.datasets.forEach((dataset, index) => {
                        const { label } = dataset; 

                        // Highlight selected line
                        if (index == activeIndex) {                  
                            if (label === "mean") return dataset.borderColor = 'darkgrey';
                            if (label === "this site") return dataset.borderColor = sMain;
                            return dataset.borderColor = pMain;
                        };

                        // Fade other lines
                        if (label === "mean") return dataset.borderColor = "rgba(211,211,211,0.2)";
                        if (label === "this site") return dataset.borderColor = "rgba(255, 171, 0, 0.2)";
                        return dataset.borderColor = "rgba(26, 35, 126, 0.2)";
                    });
                }
                this.update();
                return;
            },
        }
    }); 
});