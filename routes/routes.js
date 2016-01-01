FlowRouter.route('/', {
  name: 'home',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default');
  }
});

FlowRouter.route('/releases', {
  name: 'releases',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Releases'});
  }
});

FlowRouter.route('/release/:id', {
  name: 'release',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Release'});
  }
});


FlowRouter.route('/artists', {
  name: 'artists',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Default', {main: 'Artists'});
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('Admin', {main: 'AdminReleases'});
  }
});

