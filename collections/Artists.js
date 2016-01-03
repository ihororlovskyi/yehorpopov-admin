Artists = new Mongo.Collection('artists');

Artists.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});

ArtistSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  slug: {
    type: String,
    label: "Slug"
  },
  dateCreated: {
    type: Date,
    label: "Date Created",
    autoValue: function(argument) {
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  },
  author: {
    type: String,
    label: "Author",
    autoValue: function(argument) {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  }
});

Meteor.methods({
  deleteArtist: function(id) {
    Artists.remove(id);
  }
});

Artists.attachSchema( ArtistSchema );
