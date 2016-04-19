import angular from 'angular';

let MAX = 500;

class UsersController {
  constructor(Restangular, $q) {
    'ngInject';

    var ctrl = this;

    Restangular.all('users').getList().then(function(users) {
      ctrl.users = users;

      users.forEach(function(user) {
        user.wins = [];
        user.losses = [];

        $q.all([
          user.getList('wins'),
          user.getList('losses')
        ]).then(function([wins, losses]) {
          user.wins = wins;
          user.losses = losses;

          var winAndLoose = wins.concat(losses);

          // Gets dict of win and lose
          // Highest value is the biggest winner
          // Lowest value is the biggest loser
          var scores = winAndLoose.reduce(function(obj, game){
            if(!(game.losing_user.name in obj)){
              obj[game.losing_user.name] = 0;
            }

            obj[game.losing_user.name]--;

            if(!(game.winning_user.name in obj)){
              obj[game.winning_user.name] = 0;
            }

            obj[game.winning_user.name]++;

            return obj;
          }, {});
          // Remove ourselves
          delete scores[user.name];

          let nemesis = {name: 'nobody', score: 0};
          let dominated = {name: 'nobody', score: 0};

          angular.forEach(scores, function(score, name){
            if(score > nemesis.score){
              nemesis.score = score;
              nemesis.name = name;
            }
            if(score < dominated.score){
              dominated.score = score;
              dominated.name = name;
            }
          });

          user.nemesis = winAndLoose[nemesis.name];
          user.dominated = winAndLoose[dominated.name];

        });

      });
    });

  }

}

export default UsersController;
