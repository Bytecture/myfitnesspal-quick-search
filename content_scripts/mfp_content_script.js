
setTimeout(function () {


  (function copyTokens() {


    $(document).ready(function () {
      var input_auth = document.createElement("input");
      var input_xpid = document.createElement("input");
      input_auth.setAttribute("type", "hidden");
      input_xpid.setAttribute("type", "hidden");


      input_auth.id = "input_auth";
      input_xpid.id = "input_xpid";

      document.getElementById("main").appendChild(input_auth);
      document.getElementById("main").appendChild(input_xpid);


      var myScript = document.createElement("script");
      myScript.innerHTML = '$("#input_xpid").val(window.NREUM.loader_config.xpid); $("#input_auth").val(window.AUTH_TOKEN);';
      document.body.appendChild(myScript);
    });
  })();

}, 3000);