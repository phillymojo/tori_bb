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
    },
    "click .add-picture": function(event){
      MeteorCamera.getPicture({quality: 100}, function(error,data){
        if(error){console.log(error); return false;}
        $(".item-image").html("<img src ='"+data+"' />");
      });
    }
  });

  Template.item.events({
    "click .delete": function(){
      Items.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
