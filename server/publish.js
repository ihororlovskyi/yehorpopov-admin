Meteor.publish('releases', function(){
  return Releases.find({author: this.userId});
});
