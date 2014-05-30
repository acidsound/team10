
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
          "message":params.message,
          "currpage":params.currpage
        }
      }
    });
  }
})

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("server initiated");
    Pointer.remove({});
  });

  Meteor.publish('lists', function(){
    return Pointer.find();
  });
}

if (Meteor.isClient) {
  Meteor.startup( function () {
  Meteor.subscribe('lists');
    $('#reveal-math').hide();
  $("#chatArea").hide();
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
      var currentPage = ( Template.chats.Pointer() && Template.chats.Pointer().pagenum != undefined ) ? Template.chats.Pointer().pagenum : 0;
      Meteor.call('addChat', {
        slideId: Session.get('slideId'),
        message: $("#chat").val(),
        currpage : currentPage
      }, function(err,code) {
        console.log('addChat result', err, code);
        if (!err) {
          $("#chat").val('');
          $("#chat").focus();
        }
      });
    },
    'click #chatBtn' : function () {
      $("#chatArea").toggle();
    }
  });

  Template.lists.helpers({
    Pointer : function () {
      return Pointer.findOne({slideId: Session.get('slideId')});
    },
    pagenum : function () {
      var currentPage = ( Template.lists.Pointer() && Template.lists.Pointer().pagenum != undefined ) ? Template.lists.Pointer().pagenum : 0;
      if(Session.get('slideId') != undefined) Reveal.slide( currentPage, 0, 0 );
      return currentPage;
    },
    register : function (slideId_) {
        Session.set('slideId', slideId_);
        Meteor.call('setSlideId', slideId_ );
        $("#slide_name").text(slideId_);
        var currentPage = ( Template.lists.Pointer() && Template.lists.Pointer().pagenum != undefined ) ? Template.lists.Pointer().pagenum : 0;
        Reveal.slide( currentPage, 0, 0 );
        // $('#slidesmenu').hide();
        $('#reveal-math').show();

    }
  })
  Template.lists.events({
    'click .list-name' : function(){
      var slideId_ = $(".list-name").text();
      Session.set('slideId', slideId_);
      $("#slide_name").text(slideId_);
      var currentPage = ( Template.lists.Pointer() && Template.lists.Pointer().pagenum != undefined ) ? Template.lists.Pointer().pagenum : 0;
      Reveal.slide( currentPage, 0, 0 );
      // $('#slidesmenu').hide();
      $('#reveal-math').show();
    }
  });
}

