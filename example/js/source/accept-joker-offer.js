/**
 * Created by jaws
 */

if (jaasApi !== undefined) {
    jaasApi.configuration.environment = "Test";
    jaasApi.init();
}

var token = "";
var offerId = "";
var reservationCode = "";
jaasApi.acceptJoker(token, offerId, reservationCode, function (data) {
    console.log(data);
}, function (error) {

});