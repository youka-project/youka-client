import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
import HeaderService from './header/service';
import FlashesService from './flashes/service';
import AuthService from './auth/service';
import SocketService from './socket/service';

import IndexRouter from './index/router';
import UsersRouter from './users/router';
import FeedRouter from './feed/router';
import StatsRouter from './stats/router';

let app = new Application();

app.modal = new ModalService({
  container: app.layout.overlay
});

app.header = new HeaderService({
  container: app.layout.header
});

app.flashes = new FlashesService({
  container: app.layout.flashes
});

app.auth = new AuthService();

app.socket = new SocketService({
	container: app.layout.overlay
});

app.index = new IndexRouter({
  container: app.layout.content
});

// app.colors = new ColorsRouter({
//   container: app.layout.content
// });

// app.books = new BooksRouter({
//   container: app.layout.content
// });

app.feed = new FeedRouter({
  container: app.layout.content
});

app.stats = new StatsRouter({
  container: app.layout.content
});

app.users = new UsersRouter({
  container: app.layout.content
});

$.getJSON('/config.json', function(data) {
	const address = data.url + ':' + data.port;
	$.getScript(address + '/socket.io/socket.io.js')
	    .done(() => {
			app.socket.init(address);
	    });
});

Backbone.history.start();
