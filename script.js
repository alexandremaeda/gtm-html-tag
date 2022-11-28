(function () {
  function getUrlParams(query) {
    var targetParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ];
    var params = {};
    new URLSearchParams(query).forEach((value, key) => {
      var decodedKey = decodeURIComponent(key);

      if (targetParams.indexOf(decodedKey) < 0) {
        return;
      }

      var decodedValue = decodeURIComponent(value);
      // This key is part of an array
      if (decodedKey.endsWith("[]")) {
        decodedKey = decodedKey.replace("[]", "");
        params[decodedKey] || (params[decodedKey] = []);
        params[decodedKey].push(decodedValue);
        // Just a regular parameter
      } else {
        params[decodedKey] = decodedValue;
      }
    });

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

  var urlParamsString = window.location.search;
  var urlParams = getUrlParams(urlParamsString) || null;
  var urlParamsKeys = Object.keys(urlParams);

  if (!urlParamsKeys || !urlParamsKeys.length) {
    console.log("Not params found.");
    return;
  }

  var formsCollection = document.getElementsByTagName("form");

  for (var i = 0; i < urlParamsKeys.length; i++) {
    var parameter = urlParamsKeys[i];

    if (urlParams[parameter]) {
      console.log(`Found parameter: ${parameter}.`);
      for (var y = 0; y < formsCollection.length; y++) {
        formsCollection[y].appendChild(
          createInput(parameter, urlParams[parameter])
        );
      }
    }
  }

  // print form values
  var form = document.getElementById("formTest");
  form.addEventListener("submit", function (event) {
    // event.preventDefault();

    var valuesString = "";

    for (let el of event.target.elements) {
      if (el.value) {
        valuesString += `${el.id}: ${el.value} \n`;
      }
    }

    alert(valuesString);
  });
})();
