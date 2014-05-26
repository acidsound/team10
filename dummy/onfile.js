// /* collection */
// Pointer = new Meteor.Collection("pointer");

// /* method */
// Meteor.methods({
//   "goPage": function(page, slideId) {
//     Pointer.update({slideId: slideId}, {$set:{pointer:page}});
//   },
//   "setUrl": function(slideId) {
//     Pointer.upsert({slideId: slideId}, {$set:{slideId:slideId}});
//   }
// });

// /* main */
// Template.main.helpers({
//   "Pointer": function () {
//     // TODO : multi-slide rooms
//     return Pointer.findOne({slideId: Session.get('slideId')});
//   }
// });

// helper={
//   "extractSlideId": function(url) {
//     return url && url.match(/-([0-9]+)$/)[1];
//   }
// };

// Template.main.events({
//   'submit': function(e) {
//     e.preventDefault();
//     // extract slideId from URL
//     var slideId = helper.extractSlideId($('#url').val());
//     // use session for reactive
//     Session.set('slideId', slideId);
//     slideId && Meteor.call('setUrl', slideId);
//   },
//   'click #goPrev': function (e, tpl) {
//     var currentPage = Template.main.Pointer() && Template.main.Pointer().pointer || 1;
//     currentPage = (currentPage > 1) ? currentPage-1 : currentPage;
//     Meteor.call('goPage', currentPage, Template.main.Pointer() && Template.main.Pointer().slideId);
//   },
//   'click #goNext': function () {
//     var currentPage = Template.main.Pointer() && Template.main.Pointer().pointer || 1;
//     currentPage = (currentPage < 999) ? currentPage+1 : currentPage;
//     Meteor.call('goPage', currentPage, Template.main.Pointer() && Template.main.Pointer().slideId);
//   }
// });
