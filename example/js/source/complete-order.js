/**
 * Created by jaws
 */

if (jaasApi !== undefined) {
    jaasApi.configuration.environment = "Test";
    jaasApi.init();
}

var token = "";
var restaurantUniqueKey = "";
var orderUniqueKey = "";
var orderDateUtc = new Date().toISOString();
jaasApi.completeOrder(token, restaurantUniqueKey, orderUniqueKey, orderDateUtc, function (data) {
    console.log(data);
}, function (error) {

});