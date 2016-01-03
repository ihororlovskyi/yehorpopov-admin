Template.Release.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleRelease', id);
  })
});

Template.Release.helpers({
  release: ()=> {
    var id = FlowRouter.getParam('id');
    return Releases.findOne({slug: id});
  }
});
