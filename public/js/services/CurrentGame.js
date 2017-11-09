rfidApp.factory('CurrentGame', function ($resource) {
    var actions = {
            get: {
                method: 'GET'
            }
        },
        currentGame = $resource('/api/active-game', {}, actions);

    return currentGame;
});
