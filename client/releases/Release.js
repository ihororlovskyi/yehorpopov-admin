Template.Release.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('releases');
  })
})

Template.Release.helpers({
  release: ()=> {
    var id = FlowRouter.getParam('id');
    return Releases.findOne({slug: id});
  }
});
