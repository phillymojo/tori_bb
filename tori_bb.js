Items = new Mongo.Collection('items');

if (Meteor.isClient) {
  Template.body.helpers({
    items: function(){
      return Items.find({});
    }
  });

  Template.body.events({
    "submit .new-item": function(event){
      if(event.target.name.value !== ''){        
        var name = event.target.name.value;
        var image_data_url = $('.item-image img').attr('src');
        console.log(image_data_url);

        Items.insert({
          name: name,
          createdAt: new Date()
        });

        event.target.name.value = "";
        event.target.name.placeholder = "Beanie Boo name";
      }

      return false;
    }
  });

  Template.item.events({
    "click .delete": function(){
      Items.remove(this._id);
    }
  });

  Template.add_item_modal.helpers({
    isiOS: clientApp.isiOS
  })

  Template.take_picture.rendered = function(){
    var takePicture = document.querySelector("#take-picture");
    var showPicture = document.querySelector("#show-picture");
    
    takePicture.onchange = function (event) {
      // Get a reference to the taken picture or chosen file
      var files = event.target.files,
          file;
      if (files && files.length > 0) {
        file = files[0];
        console.log(file);

          try {
            // Fallback if createObjectURL is not supported
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                showPicture.src = event.target.result;
            };
            fileReader.readAsDataURL(file);
          }
          catch (e) {
            //
            var error = document.querySelector("#error");
            if (error) {
                error.innerHTML = "Neither createObjectURL or FileReader are supported";
            }
          }
        
      }
    };
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
