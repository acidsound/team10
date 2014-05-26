
Pointer = new Meteor.Collection("pointer");
Meteor.methods({
  goPage : function(slideId, page) {
    Pointer.update({slideId: slideId}, {$set: {pagenum : page}});
  },
  setSlideId : function(slideId) {
    Pointer.upsert({slideId: slideId}, {$set:{slideId:slideId}});
  },
  addChat: function(params) {
    Pointer.update({
      slideId: params.slideId
    }, {
      $push:{
        "chats":{
          "message":params.message
        }
      }
    });
  }
})
/*
<Pointer>
  > slideId
  > pagenum
  > chats
    > message

*/
if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("server initiated");
    Pointer.remove({});
  });

  Meteor.publish('lists', function(slideId){
    return Pointer.find({slideId:slideId});
  });
}

if (Meteor.isClient) {
  Meteor.startup( function () {
    $('#reveal-math').hide();
   Reveal.initialize({slideNumber: true}); 
   Reveal.configure({
    keyboard: {
      74: function (){
        if( !Reveal.isLastSlide() ) {
          var currentPage = ( Template.slides.Pointer() && Template.slides.Pointer().pagenum != undefined ) ? Template.slides.Pointer().pagenum : 0;
          Meteor.call('goPage', Session.get('slideId'), ++currentPage );
        }
      },
      75: function (){
        if( !Reveal.isFirstSlide() ) {
          var currentPage = ( Template.slides.Pointer() && Template.slides.Pointer().pagenum != undefined ) ? Template.slides.Pointer().pagenum : 0;
          Meteor.call('goPage', Session.get('slideId'), --currentPage );
        }
      }
    }
  });
  })

  Template.lists.lists = function () {
    return Pointer.find({}, {sort: {slideId: 1}});
  };

Template.slides.helpers({
  Pointer : function () {
    return Pointer.findOne({slideId: Session.get('slideId')});
  },
  pagenum : function () {
    var currentPage = ( Template.slides.Pointer() && Template.slides.Pointer().pagenum != undefined ) ? Template.slides.Pointer().pagenum : 0;
    if(Session.get('slideId') != undefined) Reveal.slide( currentPage, 0, 0 );
    return currentPage;
  },
  register : function (slideId_) {
    // register class at first
    // Nessary
      Session.set('slideId', slideId_);
      Meteor.call('setSlideId', slideId_ );
      $("#slide_name").text(slideId_);
      var currentPage = ( Template.slides.Pointer() && Template.slides.Pointer().pagenum != undefined ) ? Template.slides.Pointer().pagenum : 0;
      Reveal.slide( currentPage, 0, 0 );
      $('#slidesmenu').hide();
      $('#reveal-math').show();

  }
});

  Template.slides.events({
    'click #class': function () {
      var slideId_ = $("#slideId").val();
      Meteor.subscribe('lists', slideId_);
      Template.slides.register(slideId_);
    }
  });

  Template.chats.helpers({
    Pointer : function () {
      return Pointer.findOne({slideId: Session.get('slideId')});
    }
  });

  Template.chats.events({
    'submit': function(e) {
      e.preventDefault();
      Meteor.call('addChat', {
        slideId: Session.get('slideId'),
        message: $("#chat").val()
        // currpage : currentPagae
      }, function(err,code) {
        console.log('addChat result', err, code);
        if (!err) {
          $("#chat").val('');
          $("#chat").focus();
        }
      });
    }
  });
  $(".list-name").click(function(){
    Template.slides.register($(".list-name").text());
  })
}
