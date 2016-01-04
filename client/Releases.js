Template.Releases.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('releases');
  })
});

Template.Releases.helpers({
  releases: ()=> {
    return Releases.find({}, {sort: {dateCreated: -1}});
  }
});

Template.Releases.events({
  'click #editRelease' : function() {
    Session.set('editMode', !Session.get('editMode'));
  },
  'click #deleteRelease' : function() {
    Meteor.call('deleteRelease', this._id);
  },
});
