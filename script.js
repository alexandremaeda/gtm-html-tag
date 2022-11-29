try {
  (function () {
    console.log("Getting params...");

    function getUrlParams() {
      var targetParams = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
      ];

      var pairs = window.location.search.substring(1).split("&"),
        params = {},
        pair,
        i;

      for (i in pairs) {
        if (pairs[i] === "") continue;

        pair = pairs[i].split("=");

        if (targetParams.indexOf(pair[0]) < 0) {
          continue;
        }

        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }

      return params;
    }
    function createInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.id = name;
      input.name = name;
      input.value = value;

      return input;
    }

    var urlParams = getUrlParams() || {};
    var urlParamsKeys = Object.keys(urlParams);

    if (!urlParamsKeys || !urlParamsKeys.length) {
      console.log("Not params found.");
      return;
    }

    var formsCollection = document.getElementsByTagName("form");

    for (var i = 0; i < urlParamsKeys.length; i++) {
      var parameter = urlParamsKeys[i];

      if (urlParams[parameter]) {
        console.log("Found parameter: " + parameter + ".");
        for (var y = 0; y < formsCollection.length; y++) {
          formsCollection[y].appendChild(
            createInput(parameter, urlParams[parameter])
          );
        }
      }
    }

    console.log("Getting params end.");
  })();
} catch (err) {
  console.error("Error on get params.", err);
}
