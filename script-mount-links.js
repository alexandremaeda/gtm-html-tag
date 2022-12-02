try {
  (function () {
    console.log("Mount links...");

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

        console.log("Found param: " + pair[0]);

        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }

      return params;
    }

    function mountQueryParams(urlParams) {
      var link = "";
      var urlParamsKeys = Object.keys(urlParams);
      for (var i = 0; i < urlParamsKeys.length; i++) {
        var lastIndex = i + 1 === urlParamsKeys.length;
        var key = urlParamsKeys[i];
        var value = urlParams[urlParamsKeys[i]];

        link += key + "=" + value;

        if (i <= urlParamsKeys.length && !lastIndex) {
          link += "&";
        }
      }

      return link;
    }

    var urlParams = getUrlParams() || {};
    var urlParamsKeys = Object.keys(urlParams);

    if (!urlParamsKeys || !urlParamsKeys.length) {
      console.log("Params not found.");
      return;
    }

    var targetLinks = [
      "https://sun.eduzz.com",
      "https://payment.hotmart.com",
      "https://pay.hotmart.com",
      "https://pay.kiwify.com.br",
      "https://app.monetizze.com.br",
    ];
    var linkElements = document.querySelectorAll("a");

    if (!linkElements || !linkElements.length) {
      console.log("Links not found.");
      return;
    }

    for (var i = 0; i < linkElements.length; i++) {
      var el = linkElements[i];

      if (el && el.href) {
        for (var y = 0; y < targetLinks.length; y++) {
          var currentLink = targetLinks[y];

          if (el.href.indexOf(currentLink) >= 0) {
            var queryParams = mountQueryParams(urlParams);
            var hasQueryParameter = el.href.indexOf("?");
            if (hasQueryParameter >= 0) {
              el.href += "&" + queryParams;
            } else {
              el.href += "?" + queryParams;
            }
          }
        }
      }
    }

    console.log("Mount links end...");
  })();
} catch (err) {
  console.error("Error on mount params.", err);
}
