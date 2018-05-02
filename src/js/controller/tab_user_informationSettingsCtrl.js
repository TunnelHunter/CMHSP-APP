app.controller('tabUserInformationSettingsCtrl',['$scope','$ionicModal',function ($scope,$ionicModal) {

    //姓名设置 模态窗口
    $scope.contacts = [
        { name: 'Gordon Freeman' },
        { name: 'Barney Calhoun' },
        { name: 'Lamarr the Headcrab' }
    ];

    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setName_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_name_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_name_modal.hide();
    };

    $scope.open_set_name_modal = function() {
        $scope.set_name_modal.show();
    };
    $scope.close_set_name_modal = function() {
        $scope.set_name_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_name_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_name_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_name_modal.removed', function() {
        // Execute action
    });






    //性别设置 模态窗口
    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setGender_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_gender_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_gender_modal.hide();
    };

    $scope.open_set_gender_modal = function() {
        $scope.set_gender_modal.show();
    };
    $scope.close_set_gender_modal = function() {
        $scope.set_gender_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_gender_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_gender_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_gender_modal.removed', function() {
        // Execute action
    });

    $scope.clientSideList = [
        { text: "Backbone", value: "bb" },
        { text: "Angular", value: "ng" },
        { text: "Ember", value: "em" },
        { text: "Knockout", value: "ko" }
    ];

    $scope.serverSideList = [
        { text: "Go", value: "go" },
        { text: "Python", value: "py" },
        { text: "Ruby", value: "rb" },
        { text: "Java", value: "jv" }
    ];

    $scope.data = {
        clientSide: 'ng'
    };

    $scope.serverSideChange = function(item) {
        console.log("Selected Serverside, text:", item.text, "value:", item.value);
    };





    //地区设置 模态窗口
    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setRegion_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_region_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_region_modal.hide();
    };

    $scope.open_set_region_modal = function() {
        $scope.set_region_modal.show();
    };
    $scope.close_set_region_modal = function() {
        $scope.set_region_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_region_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_region_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_region_modal.removed', function() {
        // Execute action
    });




    //个性签名设置 模态窗口
    $ionicModal.fromTemplateUrl('html/tab_user_information_settings_setSignature_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.set_signature_modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.set_signature_modal.hide();
    };

    $scope.open_set_signature_modal = function() {
        $scope.set_signature_modal.show();
    };
    $scope.close_set_signature_modal = function() {
        $scope.set_signature_modal.hide();
    };
    //Cleanup the set_name_modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.set_signature_modal.remove();
    });
    // Execute action on hide set_name_modal
    $scope.$on('set_signature_modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove set_name_modal
    $scope.$on('set_signature_modal.removed', function() {
        // Execute action
    });




}]);