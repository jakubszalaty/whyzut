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
      var time;
      var eventsList = [];
      connect.addEventListener('click',function(){
        // app.playVibrate();
        $('.result2').html('');
        // testowe dane
        // var tableHtml = "<tbody><tr class=\"gridDaneHead\" valign=\"bottom\"><td>Data zajęć</td><td>Od</td><td>Do</td><td>Przedmiot</td><td>Prowadzący</td><td>Sala</td><td>Adres budynku</td><td>Forma zajęć nazwa</td><td>Forma zalicz.</td></tr><tr class=\"gridDane\"><td>31.10.2016 poniedziałek</td><td>08:15</td><td>10:00</td><td>Podstawy ochrony informacji</td><td><a id=\"lb_Prowadzacy0\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '0')\">dr hab.inż. Jerzy Pejaś</a></td><td>WI WI2- 227</td><td>ul. Żołnierska 52</td><td>wykład</td><td>egzamin</td></tr><tr class=\"gridDane\"><td>31.10.2016 poniedziałek</td><td>10:15</td><td>12:00</td><td>Komunikacja człowiek-komputer</td><td><a id=\"lb_Prowadzacy1\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '1')\">dr inż. Adam Nowosielski</a></td><td>WI WI2- 300</td><td>ul. Żołnierska 52</td><td>laboratorium</td><td>ocena</td></tr><tr class=\"gridDane\"><td>31.10.2016 poniedziałek</td><td>12:15</td><td>14:00</td><td>LaTeX - system składu tekstów inżynierskich - Przedmiot obieralny II</td><td><a id=\"lb_Prowadzacy2\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '2')\">dr inż. Remigiusz Olejnik</a></td><td>WI WI2- 126</td><td>ul. Żołnierska 52</td><td>wykład</td><td>ocena</td></tr><tr class=\"gridDane\"><td>31.10.2016 poniedziałek</td><td>18:15</td><td>20:00</td><td>LaTeX - system składu tekstów inżynierskich - Przedmiot obieralny II</td><td><a id=\"lb_Prowadzacy3\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '3')\">dr inż. Remigiusz Olejnik</a></td><td>WI WI1- 011</td><td>ul. Żołnierska 49</td><td>laboratorium</td><td>ocena</td></tr><tr class=\"gridDane\"><td>03.11.2016 czwartek</td><td>10:15</td><td>12:00</td><td>Systemy internetowe</td><td><a id=\"lb_Prowadzacy4\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '4')\">dr hab. Izabela Rejer</a></td><td>WI WI2- 227</td><td>ul. Żołnierska 52</td><td>wykład</td><td>ocena</td></tr><tr class=\"gridDane\"><td>04.11.2016 piątek</td><td>12:15</td><td>14:00</td><td>Podstawy transmisji danych</td><td><a id=\"lb_Prowadzacy5\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '5')\">dr inż. Tomasz Mąka</a></td><td>WI WI2- 201</td><td>ul. Żołnierska 52</td><td>laboratorium</td><td>ocena</td></tr><tr class=\"gridDane\"><td>04.11.2016 piątek</td><td>14:15</td><td>16:00</td><td>Wstęp do sztucznej inteligencji</td><td><a id=\"lb_Prowadzacy6\" class=\"opisPrzedmDyd\" onclick=\"pokazOpis(1, '6')\">mgr inż. Marcin Pietrzykowski</a></td><td>WI WI1- 307</td><td>ul. Żołnierska 49</td><td>laboratorium</td><td>ocena</td></tr></tbody>";
        // $table = $(tableHtml);

        $.get('https://edziekanat.zut.edu.pl/WU/PodzGodzin.aspx', function( data ) {
          // $('.result').append('<p>Pobrano strone logowania</p>');
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

          time = new Date();
          // http://edziekanat.zut.edu.pl/WU/PodzGodzDruk.aspx?typ=ics&from=20160930&to=20170226&sesja=0&sig=v5FA2qUuBECvGc52TVuBTGtmq5o%3d
          var ajax = $.ajax({
            type: "POST",
            url: action,
            data: serialized,
          }).done(function(data, textStatus, request){
            // $('.result').append('<p>Zalogowano</p>');
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
              // $('.result').append('<p>Pobrano!</p>');
              console.log('Pobrano!');
              // $('.result2').html(data);
              // $('.result2').html($result.find('#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane').html());
              $table = $result.find('#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane');

              var keys = [];

              // polskie znaki i spacje nie daja rady jako klucze w polymerze jest problem pozniej
              // wiec łatwiej jest to zrobić recznie niz pisac do tego algorytm lel
              // $table.find('.gridDaneHead').children().map(function(){
              //   keys.push($(this).text());
              // });

              keys = ["Data_zajac", "Od", "Do", "Przedmiot", "Prowadzacy", "Sala", "Adres_budynku", "Forma_zajec_nazwa", "Forma_zalicz"];


              var elements = [];

              $table.find('.gridDane').map(function(elemIndex){
                var elem = $(this);
                var obj = {};
                elements.push(obj);

                elem.children().map(function(index){

                  obj[keys[index]] = $(this).text();

                });

              });

              $('paper-card-repeater').prop('elements',elements);



            });

          }).fail(function(data) {
            // $('.result').append('<p>Niezalogowano</p>');
            console.log('Niezalogowano');
          });


        }).fail(function() {
          // $('.result').append('<p>Błąd</p>');
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
