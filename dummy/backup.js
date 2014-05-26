// Meteor.methods({
//   oembedAPI : function( url ) {

//   },
//   meteorAPI : function( query, username) {
//       var API_URL = "http://www.slideshare.net/api/2/get_slideshows_by_user";
//       // var timestamp = Math.round(new Date().getTime()/1000.0);
//       var timestamp = new Date().getTime();
//       var API_KEY = 'ciOAVzGw';
//       var SHARED_SECRET = 'BxBETo6E';
//       var HASH = SHA1(SHARED_SECRET+timestamp) || 0;

//       HTTP.get(API_URL, 
//         {
//           username_for: username,
//           limit: 10,
//           api_key: API_KEY,
//           hash: HASH,
//           ts: timestamp,
//           dataType: "jsonp",
//           jsonp : "callback"
//         }, function (data){
//           console.log(data);
//         });
//   },
//   slideShareAPI : function ( query , username ) {
//     var API_URL = "https://www.slideshare.net/api/2/get_slideshows_by_user";
//     var timestamp = new Date().getTime();
//     var API_KEY = 'ciOAVzGw';
//     var SHARED_SECRET = 'BxBETo6E';
//     var HASH = SHA1(SHARED_SECRET+timestamp) || 0;
//     var DATA = {
//           username_for: username,
//           limit: 10,
//           api_key: API_KEY,
//           hash: HASH,
//           ts: timestamp
//         };
//     try{
//       $.ajax({
//         headers: { 
//         Accept : "text/plain; charset=utf-8",
//         "Content-Type": "text/plain; charset=utf-8"
//         },
//         url:API_URL,
//         type:'GET',
//         data: DATA,
//         dataType: 'jsonp', 
//         jsonp : 'callback',
//         success: function(json){
//           console.log('success')
//           console.log(json+" ");
//           }
//         });
//       console.log('slideShareAPI_3')
//       return true;
//     } catch (e) {
//       console.log(e);
//       return false;
//     }
//   }
//   ,
//   /*
//    * slideshare 주소를 알아내서 플레이어 로딩.
//    */
//   load_slide: function(url) {
//     var self = this;
//     $.ajax({
//       url: "http://www.slideshare.net/api/oembed/2",
//       data: {
//         "url": url,
//         "format": "json"
//       },
//       dataType: "jsonp",
//       success: function(json){
//         var slide_url = json.slide_image_baseurl.match(/.com\/([^/]*)\//);
//         console.log(slide_url)
//         // this.slideshare.loadPlayer() 에러남.
//         $('#iframe_slideshare').loadPlayer(slide_url[1]);
//                  // iframe_slideshare.player.getCurrentSlide()
//         // self.current_slide_name = slide_url[1];
//         // self.socket.emit("message", '{"channel":"slideshare", "workspace":"'+core.status.current_project_path+'", "slide_url":"'+slide_url[1]+'", "page":1}');
//       }
//     });
//   }

// })