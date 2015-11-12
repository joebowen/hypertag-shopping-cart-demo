var app = angular.module("myGroceryCart", []);

app.directive('ngGroceryCart', function() {
  return {
    restrict: 'A',
    templateUrl: 'cart-template.html',
    scope: {},
    controller: ['$scope', function($scope) {
            var panes = $scope.panes = [];
            
            $scope.add_to_cart=function(){
                for (var i = panes[0].items.length - 1; i >= 0; i--){
                    var s = panes[0].items[i];
                    if(s.selected)
                    {
                        panes[1].items = panes[1].items.concat([s]);
                        
                        var index = panes[0].items.indexOf(s);
                        
                        if (index > -1) {
                            panes[0].items.splice(index, 1);
                        }
                    }
                }
            };
            
            $scope.remove_from_cart=function(){
                for (var i = panes[1].items.length - 1; i >= 0; i--){
                    var s = panes[1].items[i];
                    if(s.selected)
                    {
                        panes[0].items = panes[0].items.concat([s]);
                        
                        var index = panes[1].items.indexOf(s);
                        
                        if (index > -1) {
                            panes[1].items.splice(index, 1);
                        }
                    }
                }
            };
            
            $scope.addPane=function(pane) {
                panes.push(pane);
            };
            
            $scope.total=function(name){
                child = $.grep(panes, function(e){ return e.name == name; })[0];
                
                if (child)
                    return child.total();
                else
                    return 0;
            };
        }],
    }
});


app.directive('ngGroceryCartList', function() {
  return {
    restrict: 'A',
    templateUrl: 'cart-list-template.html',
    scope: {
        title: '@',
        name: '@',
        initfile: '@',
    },
    link: function(scope, element, attrs, cartCtrl) {
        scope.$parent.addPane(scope);
        
        scope.init_json(attrs.initfile)
    },
    controller: ['$scope', '$http', function($scope, $http) {
            $scope.init_json=function(initfile){
                if (initfile)
                {
                    $http.get(initfile)
                       .then(function(res){
                            $scope.items = [];
                            angular.forEach(res.data, function(s){
                                item = {'title': s[0], 'price': s[1]};
                                $scope.items = $scope.items.concat(item);
                            });
                        });
                }
                else
                {
                    $scope.items=[];
                }
            }
            
            $scope.total=function(){
                var t = 0;
                angular.forEach($scope.items, function(s){
                    t+=s.price;
                });
                return t;
            };
    
        }],
    }
});    