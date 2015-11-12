var app = angular.module("myGroceryCart", []);

app.directive('ngGroceryCart', function() {
  return {
    restrict: 'A',
    templateUrl: 'cart-template.html',
    scope: {},
    controller: ['$scope', function($scope) {
            var panes = $scope.panes = [];
        
            $scope.items=[
                { title: 'web development', price: 200},
                { title: 'web design', price: 250},
                { title: 'photography', price: 100},
                { title: 'coffee drinking', price: 10}];
            $scope.shopping_cart=[];
            
            $scope.add_to_cart=function(){
                for (var i = $scope.items.length - 1; i >= 0; i--){
                    var s = $scope.items[i];
                    if(s.selected)
                    {
                        $scope.shopping_cart = $scope.shopping_cart.concat([s]);
                        
                        var index = $scope.items.indexOf(s);
                        
                        if (index > -1) {
                            $scope.items.splice(index, 1);
                        }
                    }
                }
            };
            
            $scope.remove_from_cart=function(){
                for (var i = $scope.shopping_cart.length - 1; i >= 0; i--){
                    var s = $scope.shopping_cart[i];
                    if(s.selected)
                    {
                        $scope.items = $scope.items.concat([s]);
                        
                        var index = $scope.shopping_cart.indexOf(s);
                        
                        if (index > -1) {
                            $scope.shopping_cart.splice(index, 1);
                        }
                    }
                }
            };
            
            $scope.total=function(){
                var t = 0;
                angular.forEach($scope.shopping_cart, function(s){
                    t+=s.price;
                });
                return t;
            };
            
            $scope.addPane=function(pane) {
                panes.push(pane);
            };
        }],
    }
});


app.directive('ngGroceryCartList', function() {
  return {
    restrict: 'A',
    templateUrl: 'cart-list-template.html',
    scope: {
        title: '@' 
    },
    link: function(scope, element, attrs, cartCtrl) {
        cartCtrl.addPane(scope);
    },
    controller: ['$scope', function($scope) {
            
    
        }],
    }
});    