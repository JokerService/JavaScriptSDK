/**
 * Created by jaws
 */

if (jaasApi !== undefined) {
    jaasApi.configuration.environment = "Test";
    jaasApi.init();
}

var token = "";
var restaurantUniqueKeys = "";
jaasApi.getJokerOffer(token, restaurantUniqueKeys, function (data) {
    console.log(data);
}, function (error) {

});