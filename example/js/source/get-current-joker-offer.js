/**
 * Created by jaws
 */

if (jaasApi !== undefined) {
    jaasApi.configuration.environment = "Test";
    jaasApi.init();
}

var token = "";
jaasApi.getCurrentJokerOffer(token, function (data) {
    console.log(data);
}, function (error) {

});