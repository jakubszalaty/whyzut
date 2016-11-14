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
      var clear = document.querySelector('#clear');

      var time;
      var eventsList = [];
      connect.addEventListener('click',function(){
        app.updateUserData(true);
      },true);

      clear.addEventListener('click',function(){
        $.get('https://edziekanat.zut.edu.pl/WU/Wyloguj.aspx', function(){
          window.location.reload();
        });
      },true);


      app.setupStatusBar();


    },
    setupStatusBar: function() {

      StatusBar.backgroundColorByHexString('#3f51b5');

    },
    updateUserData: function(moveToSchedule){
      var mainApp = document.querySelector('main-app');
      mainApp.set('lodingData', true);

      var userData = JSON.parse(localStorage.userData);

      var login = userData.login;
      var password = userData.password;

      if(!login || !password ){
        mainApp.toastMsg('Błędne dane');
        mainApp.set('lodingData', false);
        return;
      }

      $.get('https://edziekanat.zut.edu.pl/WU/PodzGodzin.aspx', function( data ) {
        $result = $('<div>');

        $result.html(data);
        $form = $result.find('form');
        $form.find('#ctl00_ctl00_ContentPlaceHolder_MiddleContentPlaceHolder_txtIdent').val(login);
        $form.find('#ctl00_ctl00_ContentPlaceHolder_MiddleContentPlaceHolder_txtHaslo').val(password);

        var action = 'https://edziekanat.zut.edu.pl/WU/' + $form.attr('action');
        var serialized = $form.serialize();

        serialized += "&ctl00%24ctl00%24ContentPlaceHolder%24MiddleContentPlaceHolder%24butLoguj=Zaloguj";

        time = new Date();
        var ajax = $.ajax({
          type: "POST",
          url: action,
          data: serialized,
        }).done(function(data, textStatus, request){


          $result.html(data);
          var name = $result.find('#ctl00_ctl00_ContentPlaceHolder_wumasterWhoIsLoggedIn').text().replace(/ –.*/,'');
          // jesli name jest pusty to oznacza ze nie jestesmy na widoku planu czyli cos poszlo nie tak
          if(name===""){
            mainApp.toastMsg('Nie udało się zalogować');
            mainApp.set('lodingData', false);

            return ;
          }

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
            $table = $result.find('#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane');

            var keys = [];

            // keys = ["Data_zajac", "Od", "Do", "Przedmiot", "Prowadzacy", "Sala", "Adres_budynku", "Forma_zajec_nazwa", "Forma_zalicz"];
            keys = ["date", "startTime", "endTime", "subject", "teacher", "room", "building", "formName", "examForm"];

            var elements = [];

            $table.find('.gridDane').map(function(elemIndex){
              var elem = $(this);
              var obj = {};
              elements.push(obj);

              elem.children().map(function(index){

                obj[keys[index]] = $(this).text();

              });
              var date = obj.date.split(' ');
              obj.date = date[0];
              obj.dayName = date[1];

            });
            $('paper-card-repeater').prop('elements',elements);

            mainApp.set('user.logged', true);
            mainApp.set('user.name', name);
            mainApp.set('user.lastCheck', new Date());

            mainApp.set('lodingData', false);

            if(moveToSchedule){
              mainApp.set('currentDate', new Date());
              mainApp.set('route.path', '/main');

            }

            setTimeout(function(){
              mainApp.toastMsg('Pobrano najnowszy plan');
              mainApp.refreshLastUpdate();
            },100);



          });

        }).fail(function(data) {
          // $('.result').append('<p>Niezalogowano</p>');
          mainApp.toastMsg('Niezalogowano');
          mainApp.set('lodingData', false);
        });


      }).fail(function() {
        mainApp.set('lodingData', false);
        mainApp.toastMsg('Błąd');
      });



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
