var router = (function () {

    "use strict";

    var routes = [];

    function addRoute(route, handler) {
        routes.push({parts: route.split('/'), handler: handler});
    }

    function load(route) {
        window.location.hash = route;
    }

    function start() {

        var path = window.location.hash.substr(1),
            parts = path.split('/'),
            partsLength = parts.length;
        console.log(path);
		console.log(parts);
		console.log("length: "+parts.length+"number of routes: "+routes.length);
		
        for (var i = 0; i < routes.length; i++) { //traverses through all routes
            var route = routes[i];
            if (route.parts.length === partsLength) {
                var params = [];
                for (var j = 0; j < partsLength; j++) {
                    if (route.parts[j].substr(0, 1) === ':') {
                        params.push(parts[j]);
                        console.log("params");
                        console.log(params);
                    } else if (route.parts[j] !== parts[j]) {
                        break;
                    }
                }
                if (j === partsLength) {
                	console.log("calling handler" + route.handler + " with this" + undefined + " and params: " + params);
                    route.handler.apply(undefined, params);
                    return;
                }
            }
        }
    }

    $(window).on('hashchange', start);

    return {
        addRoute: addRoute,
        load: load,
        start: start
    };

}());