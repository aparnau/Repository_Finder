/* jshint esversion: 6 */

let GH = {};

(function ($, fn) { 
  let selector = {
      "submitButton": ".submit",
      "gitUserName": ".username",
      "repoResult": ".result",
      "issueForm": "#issue-form",
      "popupOverlay": ".popup-overlay",
      "popupContent": ".popup-content",
      "createIssue": ".create-issue",
      "close": ".close"
  },
  repos,
  accessToken,
  currentRepo,
  currentUsername,
  list = $('<table class="table table-dark"> <tbody>'),
  username,
  name,
  url,
  formData,
  createIssueUri;

  const  GITHUB_API_KEY = "Bv8KPhTcf-JDMPrkLHXzeznXbVg";

  fn.init = function() {
    OAuth.initialize(GITHUB_API_KEY);
    this.bindEvents();
  },

  fn.bindEvents = function() {
    $(selector.submitButton).click(function() {
      username = $(selector.gitUserName).val();
      currentUsername = username;
      $(selector.repoResult).displayRepositories(username);
    });

    $(selector.issueForm).submit(function(e){
      e.preventDefault();
      name =  $(selector.popupOverlay).data("repos");
      url = 'https://api.github.com/repos/'+currentUsername+'/'+currentRepo+'/issues';
      formData = JSON.stringify({title: $(this).get(0).title.value, body: $(this).get(0).body.value});
      let _this = this;

      $.ajax({
         type: "POST",
         headers: {"Authorization": "token " + accessToken},
          url: url,
          data: formData,
          success: function() {
            alert("Issues created!");
            window.location.href = 'https://github.com/'+currentUsername+'/'+currentRepo+'/issues'; 
          },
        });
    });

    $(document).on("click", selector.createIssue,function(){
      currentRepo = $(this).data('name');
      OAuth.popup('github').done(function(result) {
        accessToken = result.access_token;
        $(selector.popupContent).addClass("active");
        $(selector.popupOverlay).addClass("active");
      });
    });
    // close

    $(document).on("click", selector.close,function(){
        $(selector.popupContent).removeClass("active");
        $(selector.popupOverlay).removeClass("active");
        $(selector.issueForm).trigger('reset');
    });
  },

  $.fn.displayRepositories = function(username) {
    let target = this,
       // gitPath = '//api.github.com/users/'+username+'/repos?callback=?';
        gitPath = '//api.github.com/users/'+username+'/repos?client_id=f6b388012ae4c7a01738&client_secret=0350ead7898e43aef9a6b3304c7fddef7ce0961a';
    this.html("<span>Querying GitHub for " + username +"'s repositories..</span>");
   
      $.getJSON(gitPath, function(data) {
      }).done(function( data ) {
        target.empty().append(list);

        $.each( data, function( i, item ) {
          repos = item.name;
          list.append('<tr> <td>' + repos + '</td> <td> <a href="#" class="btn btn-default create-issue" data-name='+repos+' > New Issue </a></td> </tr>');
        });
        list.append('</tbody></table>');
    });
  },

  fn.createIssue= function(ele) {
    createIssueUri = 'https://api.github.com/repos/'+username+'/'+repos+'/issues';
  
    $.ajax({
       type: "POST",
       headers: {"Authorization": "token " + selector.GITHUB_API_KEY},
        url: createIssueUri,
        success: function() {
           alert('issue created');
        },
      });
};

  fn.init();
})(window.jQuery, GH);