app.controller('tabUserCtrl',['$scope','$ionicModal',function ($scope,$ionicModal) {
    $scope.settingsList = [
        { text: "Wireless", checked: true },
        { text: "GPS", checked: false },
        { text: "Bluetooth", checked: false }
    ];

    $scope.pushNotificationChange = function() {
        console.log('Push Notification Change', $scope.pushNotification.checked);
    };

    $scope.pushNotification = { checked: true };
    $scope.emailNotification = 'Subscribed';

    //模态窗口
    $scope.contacts = [
        { name: 'Gordon Freeman' },
        { name: 'Barney Calhoun' },
        { name: 'Lamarr the Headcrab' }
    ];

    $ionicModal.fromTemplateUrl('html/user_login_modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.createContact = function(u) {
        $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
        $scope.modal.hide();
    };

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

}]);