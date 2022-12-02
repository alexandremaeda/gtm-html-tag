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

        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }

      return params;
    }

    function mountQueryParams(urlParams) {
      var link = "";
      var urlParamsKeys = Object.keys(urlParams);
      for (let i = 0; i < urlParamsKeys.length; i++) {
        var key = urlParamsKeys[i];
        var value = urlParams[urlParamsKeys[i]];

        link += key + "=" + value;

        if (i <= urlParamsKeys.length) {
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

    var prefix = ["https://payment.hotmart.com", "https://pay.hotmart.com"];
    var linkElements = document.querySelectorAll("a");

    if (!linkElements || !linkElements.length) {
      console.log("Links not found.");
      return;
    }

    for (let i = 0; i < linkElements.length; i++) {
      var el = linkElements[i];

      if (el && el.href) {
        for (let y = 0; y < prefix.length; y++) {
          var currentPrefix = prefix[y];

          if (el.href.indexOf(currentPrefix)) {
            var queryParams = mountQueryParams(urlParams);
            var hasQueryParameter = el.href.indexOf("?");
            if (hasQueryParameter) {
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
