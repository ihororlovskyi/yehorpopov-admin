Template.Artists.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('artists');
  })
});

Template.Artists.helpers({
  artists: ()=> {
    return Artists.find({}, {sort: {name: 1}});
  }
});

Template.Artists.events({
  'click #editArtist' : function() {
    Session.set('editMode', !Session.get('editMode'));
  },
  'click #deleteArtist' : function() {
    Meteor.call('deleteArtist', this._id);
  },
});
