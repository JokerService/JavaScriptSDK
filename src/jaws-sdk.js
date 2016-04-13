'use strict';
(function (window, document) {
    try {
        var JaasAPI = function () {
            var that = this;
            this.configuration = {
                environment: "Test",
                url: "https://km65rong4h.execute-api.eu-west-1.amazonaws.com/",
                async: true
            };

            var getHTTPObject = function () {
                var http = false;
                //Use IE's ActiveX items to load the file.
                if (typeof ActiveXObject != 'undefined') {
                    try {
                        http = new ActiveXObject("Msxml2.XMLHTTP");
                    }
                    catch (e) {
                        try {
                            http = new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        catch (E) {
                            http = false;
                        }
                    }
                    //If ActiveX is not available, use the XMLHttpRequest of Firefox/Mozilla etc. to load the document.
                } else if (window.XMLHttpRequest) {
                    try {
                        http = new XMLHttpRequest();
                    }
                    catch (e) {
                        http = false;
                    }
                }
                return http;
            };

            var makeHttpRequest = function (options) {
                var xhr = getHTTPObject();

                if (!xhr) {
                    console.log("Browser doesn't support XMLHttpRequest.");
                    return;
                }

                xhr.open(options.method, options.url, that.configuration.async);   // Open the request
                xhr.setRequestHeader("Content-Type", "application/json");
                if (options.token) {
                    xhr.setRequestHeader("Token", options.token);
                }
                if (options.data) {
                    xhr.send(options.data);
                } else {
                    xhr.send();
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            if (options.success && typeof options.success == "function") {
                                var response = {status: xhr.status, data: JSON.parse(xhr.responseText)};
                                options.success(response);
                            }
                        } else {
                            var response = {status: xhr.status, error: "unexpected error"};
                            if (options.error && typeof options.error == "function") {
                                options.error(response);
                            }
                        }
                    }
                };
            };

            var apiUrl = "";
            this.init = function () {
                apiUrl = this.configuration.url + this.configuration.environment;
            };

            this.getCurrentJokerOffer = function (token, success, error) {
                var currentJokerOfferProps = {
                    url: "currentoffer"
                };

                var url = apiUrl + "/" + currentJokerOfferProps.url;
                return makeHttpRequest({
                    method: "GET",
                    url: url,
                    token: token,
                    success: success,
                    error: error
                });
            };

            this.getJokerOffer = function (token, restaurantUniqueKeys, success, error) {
                var getJokerOfferProps = {
                    url: "getjokeroffer"
                };
                var url = apiUrl + "/" + getJokerOfferProps.url;
                return makeHttpRequest({
                    method: "POST",
                    url: url,
                    token: token,
                    data: JSON.stringify({"RestaurantUniqueKeys": restaurantUniqueKeys}),
                    success: success,
                    error: error
                });
            };

            this.acceptJoker = function (token, offerId, reservationCode, success, error) {
                var acceptJokerProps = {
                    url: "acceptoffer"
                };
                var url = apiUrl + "/" + acceptJokerProps.url;
                return makeHttpRequest({
                    method: "POST",
                    url: url,
                    token: token,
                    data: JSON.stringify({"OfferId": offerId, ReservationCode: reservationCode}),
                    success: success,
                    error: error
                });
            };

            this.rejectJoker = function (token, offerId, reservationCode, success, error) {
                var rejectJokerProps = {
                    url: "rejectoffer"
                };
                var url = apiUrl + "/" + rejectJokerProps.url;
                return makeHttpRequest({
                    method: "POST",
                    url: url,
                    token: token,
                    data: JSON.stringify({"OfferId": offerId, ReservationCode: reservationCode}),
                    success: success,
                    error: error
                });
            };

            this.completeOrder = function (token, restaurantUniqueKey, orderKey, orderDateUtc, success, error) {
                var completeOrderProps = {
                    url: "completeorder"
                };
                var url = apiUrl + "/" + completeOrderProps.url;
                return makeHttpRequest({
                    method: "POST",
                    url: url,
                    token: token,
                    data: JSON.stringify({
                        RestaurantUniqueKey: restaurantUniqueKey,
                        OrderKey: orderKey,
                        OrderDateUtc: orderDateUtc
                    }),
                    success: success,
                    error: error
                });
            };
        };
        window.jaasApi = new JaasAPI();
    } catch (e) {
        console.log("JaasAPI.js is not loaded.");
    }
})(window, document);

//TEST END