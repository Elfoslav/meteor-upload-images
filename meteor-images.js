Uploads = new FS.Collection('uploads', {
  stores: [
    //this will store files in ~/uploads folder on your filesystem
    new FS.Store.FileSystem('uploads', { path: '~/uploads' })
  ]
});

if (Meteor.isClient) {

  Template.hello.helpers({
    uploads: function() {
      return Uploads.find();
    }
  });

  Template.hello.events({
    'change input[type="file"]': function(evt) {
      console.log('changed');
      FS.Utility.eachFile(evt, function(file) {
        var fileObj = new FS.File(file);
        fileObj.customProperty = 'hmmm';
        Uploads.insert(fileObj, function(err) {
          console.log(err);
        });
      });
    }
  });
}

if (Meteor.isServer) {
  Uploads.allow({
    insert: function(userId, doc) {
      //TODO validate if user can insert a file
      return true;
    },
    update: function(userId, doc, fieldNames, modifier) {
      //TODO validate if user can update a file
      return true;
    },
    remove: function(userId, doc) {
      //TODO validate if user can remove a file
      return true;
    },
    //you would get access denied without this download allow option
    //http://stackoverflow.com/questions/26136850/collectionfs-access-denied-403-error-meteor-js
    download: function(userId, doc) {
      //TODO validate if user can download a file
      return true;
    }
  });
}
