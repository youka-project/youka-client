import ItemView from '../../common/item-view';
import template from './layout-template.hbs';
import Chart from 'chart.js';

export default ItemView.extend({
	template: template,
	className: 'fullpage fixed bg',

	ui: {
		titleBar: '.bar-title',
		tabs: '.content-body-absolute',
		waterButton: '.water-button',
		lightButton: '.light-button',
		liveButton:  '.live-button',
		plantButton: '.plant-button',
		chart1: '#chart1',
		chart2: '#chart2',
		chartLive: '#chart-live',
	},

	events: {
		'click @ui.waterButton': 'showWaterTab',
		'click @ui.lightButton': 'showLightTab',
		'click @ui.liveButton':  'showLiveTab',
		'click @ui.plantButton': 'showPlantTab',
	},

	onShow() {
		this.showWaterTab();

		const chartOptions = {
			scaleShowLabels: false
		};

		const chart1Data = {
		    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
		    datasets: [
		        {
		            fillColor: "rgba(118, 223, 180, 0.2)",
		            strokeColor: "#76DFB4",
		            pointColor: "#76DFB4",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [25, 27, 36, 56, 47, 62, 64, 66, 82, 79, 70, 65, 58, 60, 61, 45]
		        }
		    ]
		};

		const chart2Data = {
		    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
		    datasets: [
		        {
		            fillColor: "rgba(118, 223, 180, 0.2)",
		            strokeColor: "#76DFB4",
		            pointColor: "#76DFB4",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [47, 62, 64, 66, 48, 55, 79, 70, 65, 58, 56, 68, 82, 60, 61, 45]
		        }
		    ]
		};

		const chartLiveData = {
		    labels: [],
		    datasets: [
		        {
		            fillColor: "rgba(118, 223, 180, 0.2)",
		            strokeColor: "#76DFB4",
		            pointColor: "#76DFB4",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: []
		        }
		    ]
		};
		
		let lastDate = Date.now() - 15 * 2000;
		
		for (let i = 0; i < 15; i++) {
			lastDate += 2000;
			chartLiveData.datasets[0].data.push(lastDate + Math.random() * 4000 - 2000);
			chartLiveData.labels.push('');
		}
		
		this.chart1 = new Chart(this.ui.chart1.get(0).getContext('2d')).Line(chart1Data, chartOptions);
		this.chart2 = new Chart(this.ui.chart2.get(0).getContext('2d')).Line(chart2Data, chartOptions);
		this.chartLive = new Chart(this.ui.chartLive.get(0).getContext('2d')).Line(chartLiveData, chartOptions);

		this.chartsInterval = setInterval(() => {
			this.generateFakeData();
		}, 2000);
	},

	generateFakeData() {
		this.chartLive.addData([Date.now() + Math.random() * 4000 - 2000], '');
		if (this.chartLive.datasets[0].points.length > 15) {
			this.chartLive.removeData();
		} 
	},

	showWaterTab() {
		this.ui.titleBar.text('humidité');

		this.ui.tabs
		  .removeClass('pos-tab-2')
		  .removeClass('pos-tab-3')
		  .removeClass('pos-tab-4')
		  .addClass('pos-tab-1');

		this.ui.waterButton.addClass('active');
		this.ui.lightButton.removeClass('active');
		this.ui.liveButton.removeClass('active');
		this.ui.plantButton.removeClass('active');
	},

	showLightTab() {
		this.ui.titleBar.text('éclairage');

		this.ui.tabs
		  .removeClass('pos-tab-1')
		  .removeClass('pos-tab-3')
		  .removeClass('pos-tab-4')
		  .addClass('pos-tab-2');

		this.ui.waterButton.removeClass('active');
		this.ui.lightButton.addClass('active');
		this.ui.liveButton.removeClass('active');
		this.ui.plantButton.removeClass('active');
	},

	showLiveTab() {
		this.ui.titleBar.text('live');

		this.ui.tabs
		  .removeClass('pos-tab-1')
		  .removeClass('pos-tab-2')
		  .removeClass('pos-tab-4')
		  .addClass('pos-tab-3');

		this.ui.waterButton.removeClass('active');
		this.ui.lightButton.removeClass('active');
		this.ui.liveButton.addClass('active');
		this.ui.plantButton.removeClass('active');
	},

	showPlantTab() {
		this.ui.titleBar.text('plante');

		this.ui.tabs
		  .removeClass('pos-tab-1')
		  .removeClass('pos-tab-2')
		  .removeClass('pos-tab-3')
		  .addClass('pos-tab-4');

		this.ui.waterButton.removeClass('active');
		this.ui.lightButton.removeClass('active');
		this.ui.liveButton.removeClass('active');
		this.ui.plantButton.addClass('active');
	}
});
