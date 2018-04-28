app.controller('setHeadPictureCtrl', ['$scope', '$ionicActionSheet', '$timeout', function ($scope, $ionicActionSheet, $timeout) {


    $scope.show_action_sheet = function () {

        $ionicActionSheet.show({
            buttons: [
                {text: '拍 照'},
                {text: '从相册选择'}
            ],
            cssClass: 'color:#53565a;',
            // destructiveText: 'Delete',
            // titleText: 'Modify your album',
            cancelText: '取 消',
            cancelOnStateChange:true,
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                return true;
            },
            destructiveButtonClicked: function (index) {
                return true;
            }
        });


    };
}]);