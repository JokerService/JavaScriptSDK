$(document).ready(function () {
    if (jaasApi != undefined) {
        jaasApi.configuration.environment = "Test";
        jaasApi.init();
    }

    function getTokenFromDom() {
        var tokenInput = $("input[name='token']");
        return tokenInput.val();
    }


    //Get New Joker
    $("#frm_get_new_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();
        jaasApi.getJokerOffer(token, formData.restaurantUniqueKeys, function (data) {
            console.log(data);
        }, function (error) {

        });
    });

    $("#frm_get_current_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        jaasApi.getCurrentJokerOffer(token, function (data) {
            console.log(data);
        }, function (error) {

        });
    });


    $("#frm_accept_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();
        jaasApi.acceptJoker(token, formData.offerId, formData.reservationCode, function (data) {
            console.log(data);
        }, function (error) {

        });
    });


    $("#frm_reject_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();
        jaasApi.rejectJoker(token, formData.offerId, formData.reservationCode, function (data) {
            console.log(data);
        }, function (error) {

        });
    });

    $("#frm_complete_order").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();
        var orderDateUtc = new Date().toISOString();
        jaasApi.completeOrder(token, formData.restaurantUniqueKey, formData.orderUniqueKey, orderDateUtc, function (data) {
            console.log(data);
        }, function (error) {

        });
    });


    getJsFileWithAjax("js/source/get-new-joker-offer.js", $('.new-joker-offer-code-area'));
    getJsFileWithAjax("js/source/get-current-joker-offer.js", $('.current-joker-code-area'));
    getJsFileWithAjax("js/source/accept-joker-offer.js", $('.accept-joker-code-area'));
    getJsFileWithAjax("js/source/reject-joker-offer.js", $('.reject-joker-code-area'));
    getJsFileWithAjax("js/source/complete-order.js", $('.complete-order-code-area'));
});

function getJsFileWithAjax(filePath, aceContainer) {
    //aceContainer.css("width", "1000px");
    $.ajax({
        type: "GET",
        url: filePath,
        dataType: 'text',
        success: function (data) {
            aceContainer.val(data).ace({theme: 'twilight', lang: 'javascript', width: '100%'})
        },
        error: function (e) {
            aceContainer.val(e.responseText).ace({theme: 'twilight', lang: 'javascript'})
        }
    });
}


var jaasExample = {};
jaasExample.activeTab = function (tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

