import _ from 'lodash';
import Backbone from 'backbone';
import LayoutView from '../../common/layout-view';
import template from './template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'socket-connect hidden-t',

  ui: {
    circlesContainer: '.circles-container',
    timer: '.timer'
  },

  show() {
    this.$el.removeClass('hidden-t');
    setTimeout(() => {
      this.ui.circlesContainer.removeClass('hidden-anim');
      this.startTimer();
    }, 500);
  },

  hide() {
    this.$el.addClass('hidden-t');
    clearTimeout(this.timerInterval);
  },

  startTimer() {
    this.timerSec = 0;
    this.timerInterval = setInterval(this.tick.bind(this), 1000);
  },

  tick() {
    this.timerSec++;
    let min = Math.floor(this.timerSec / 60) 
    let sec = this.timerSec % 60;
    sec = sec < 10 ? '0' + sec : sec;
    this.ui.timer.text(min + '`' +  sec + 's');
  }

});
