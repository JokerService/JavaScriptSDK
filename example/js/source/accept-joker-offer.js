/**
 * Created by jaws 
 * v1.0
 * <script type="text/javascript" src="http://cdn.apihero.io/jaas/js/v1/jaws-sdk.min.js"></script>
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