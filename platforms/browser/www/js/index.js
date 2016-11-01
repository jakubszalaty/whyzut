/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

      // app.receivedEvent('deviceready');
      var connect = document.querySelector('#connect');

      connect.addEventListener('click',function(){

        // app.playVibrate();
        $('.result2').html('');
        $.get('https://edziekanat.zut.edu.pl/WU/PodzGodzin.aspx', function( data ) {
          console.log('Pobrano strone logowania');
          // pozniej result zamien na wirtualny div
          $result = $('<div>');
          // $result = $('.result');
          var login = $('#login').val();
          var password = $('#password').val();


          $result.html(data);
          $form = $result.find('form');
          $form.find('#ctl00_ctl00_ContentPlaceHolder_MiddleContentPlaceHolder_txtIdent').val(login);
          $form.find('#ctl00_ctl00_ContentPlaceHolder_MiddleContentPlaceHolder_txtHaslo').val(password);

          var action = 'https://edziekanat.zut.edu.pl/WU/' + $form.attr('action');
          var serialized = $form.serialize();

          serialized += "&ctl00%24ctl00%24ContentPlaceHolder%24MiddleContentPlaceHolder%24butLoguj=Zaloguj";

          // http://edziekanat.zut.edu.pl/WU/PodzGodzDruk.aspx?typ=ics&from=20160930&to=20170226&sesja=0&sig=v5FA2qUuBECvGc52TVuBTGtmq5o%3d
          var ajax = $.ajax({
            type: "POST",
            url: action,
            data: serialized,
          }).done(function(data, textStatus, request){
            console.log('Zalogowano');
            $result.html(data);
            $form = $result.find('form');

            action = 'https://edziekanat.zut.edu.pl/WU/' + $form.attr('action');

            serialized = $form.serialize();
            serialized = serialized.replace('Tygodniowo','Semestralnie');
            serialized = serialized.replace('__EVENTTARGET=&','__EVENTTARGET=ctl00%24ctl00%24ContentPlaceHolder%24RightContentPlaceHolder%24rbJak%242&');

            var ajax = $.ajax({
              type: "POST",
              url: action,
              data: serialized,
            }).done(function(data, textStatus, request){
              $result.html(data);
              console.log('Pobrano!');
              // $('.result2').html(data);
              $('.result2').html($result.find('#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane').html());

            });

          }).fail(function(data) {
            console.log('Niezalogowano');
          });


        }).fail(function() {
          console.log('Błąd');
        });

        // console.log('vibracje');
      },true);


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // https://edziekanat.zut.edu.pl/WU/Logowanie2.aspx
        // cordovaHTTP.get("https://google.com/", {
        //   id: 12,
        //   message: "test"
        // }, { Authorization: "OAuth2: token" }, function(response) {
        //     console.log(response.status);
        // }, function(response) {
        //     console.error(response.error);
        // });
        console.log('Received Event: ' + id);
      }
    };
