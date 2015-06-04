import ItemView from '../../common/item-view';
import template from './layout-template.hbs';

export default ItemView.extend({
	template: template,
	className: 'fullpage fixed bg',

	ui: {
		titleBar: '.bar-title',
		tabs: '.content-body-absolute',
		waterButton: '.water-button',
		lightButton: '.light-button',
		liveButton:  '.live-button',
		plantButton: '.plant-button'
	},

	events: {
		'click @ui.waterButton': 'showWaterTab',
		'click @ui.lightButton': 'showLightTab',
		'click @ui.liveButton':  'showLiveTab',
		'click @ui.plantButton': 'showPlantTab',
	},

	onRender() {
		this.showWaterTab();
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
