const URL = "https://data.covid19india.org/v4/min/data.min.json";

let app = angular.module("MyApp", []);

app.controller('MyController', ($scope, $http) => {
    $scope.title = "Stay home Stay safe";

    $scope.changeValue = () => {
        $scope.title = "This is home time";
    }

    $http.get(URL).then((response) => {
        $scope.all_data = response.data;
        $scope.stateList = Object.keys(response.data);
        console.log('states:', Object.keys(response.data));
    },
        (error) => {
            console.log(error)
        })


    $scope.selectedState = () => {
        let state = $scope.state;
        console.log('state1:', state);

        if (state == '') {
            console.log('Please enter state');
            alert('Please enter state');
        }

        $http.get(URL).then((response) => {
            $scope.state_data = response.data[state];
            // console.log(state_data);
        },
            (error) => {
                console.log(error);
            })
    }


});




