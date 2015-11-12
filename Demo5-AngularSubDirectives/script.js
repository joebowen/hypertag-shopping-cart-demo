var app = angular.module("myGroceryCart", []);

app.directive('ngGroceryCart', function() {
  return {
    restrict: 'A',
    templateUrl: 'cart-template.html',
    scope: {},
    controller: ['$scope', function($scope) {
            var panes = $scope.panes = [];
            
            $scope.move_item=function(from_name, to_name){
                from = $.grep(panes, function(e){ return e.name == from_name; })[0];
                to = $.grep(panes, function(e){ return e.name == to_name; })[0];
                
                for (var i = from.items.length - 1; i >= 0; i--){
                    var s = from.items[i];
                    if(s.selected)
                    {
                        to.items = to.items.concat([s]);
                        
                        var index = from.items.indexOf(s);
                        
                        if (index > -1) {
                            from.items.splice(index, 1);
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