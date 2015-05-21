import './plugins';
import Backbone from 'backbone';

import Application from './application/application';

import ModalService from './modal/service';
import HeaderService from './header/service';
import FlashesService from './flashes/service';
import AuthService from './auth/service';

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


Backbone.history.start();
