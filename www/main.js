$(function() {
  $('.submit').click(function() {
    var username = $('.username').val();
    $(".result").displayRepositories(username);
  });
});


$.fn.displayRepositories = function(username) {
  this.html("<span>Querying GitHub for " + username +"'s repositories..</span>");
  
  var target = this,
      gitPath = '//api.github.com/users/'+username+'/repos?callback=?',
      repos,
      list = $('<table class="table table-dark"> <tbody>');

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