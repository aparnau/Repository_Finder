var GH = GH || {};

(function ($, fn) { 
  var selector = {
    "submitButton": ".submit",
    "gitUserName": ".username",
    "repoResult": ".result",
    "CONSTANTS": {
        "CLIENT_KEY": "f6b388012ae4c7a01738"
    }
  },
  repos,
  list = $('<table class="table table-dark"> <tbody>');

  fn.init = function() {
    OAuth.initialize(selector.CONSTANTS.CLIENT_KEY);
    this.bindEvents();
  },

  fn.bindEvents = function() {
    $(selector.submitButton).click(function() {
      var username = $(selector.gitUserName).val();
      $(selector.repoResult).displayRepositories(username);
    });
  },

  $.fn.displayRepositories = function(username) {
    var target = this,
        gitPath = '//api.github.com/users/'+username+'/repos?callback=?';
    
    this.html("<span>Querying GitHub for " + username +"'s repositories..</span>");
   
      $.getJSON(gitPath, function(data) {
      }).done(function( data ) {
        target.empty().append(list);

        $.each( data.data, function( i, item ) {
          repos = item.name;
          list.append('<tr> <td>' + repos + '</td> <td> <a href= https://github.com/'+username+'/'+repos+'/issues/new' + ' class="btn btn-default"> New Issue </a></td> </tr>');
        });
        list.append('</tbody></table>');
    });
  };

  fn.init();
})(window.jQuery, GH);