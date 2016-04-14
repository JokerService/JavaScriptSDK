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

        var resultContainer = $("#get-joker-offer-result-container");
        resultContainer.addClass("hidden");
        var resultBody = $("#get-joker-offer-result-body");
        resultBody.html('');

        jaasApi.getJokerOffer(token, formData.restaurantUniqueKeys.split(','), function (data) {
            var offerData = data.data.Result;
            if (offerData == undefined)
                offerData = {};
            offerData.Status = data.status;
            offerData.Message = data.data.Message;
            getHtmlFileAndRenderTemplate("template/new-joker-offer-template.html", offerData, resultBody);
            resultContainer.removeClass("hidden");
        }, function (error) {

        });
    });

    $("#frm_get_current_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();

        var resultContainer = $("#get-current-joker-offer-result-container");
        resultContainer.addClass("hidden");
        var resultBody = $("#get-current-joker-offer-result-body");
        resultBody.html('');

        jaasApi.getCurrentJokerOffer(token, function (data) {
            var offerData = data.data.Result;
            if (offerData == undefined)
                offerData = {};
            offerData.Status = data.status;
            offerData.Message = data.data.Message;
            getHtmlFileAndRenderTemplate("template/new-joker-offer-template.html", offerData, resultBody);
            resultContainer.removeClass("hidden");
        }, function (error) {

        });
    });


    $("#frm_accept_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();
        var resultContainer = $("#accept-joker-offer-result-container");
        resultContainer.addClass("hidden");
        var resultBody = $("#accept-joker-offer-result-body");
        resultBody.html('');
        jaasApi.acceptJoker(token, formData.offerId, formData.reservationCode, function (data) {
            var acceptJokerOfferData = data.data;
            if (acceptJokerOfferData == undefined)
                acceptJokerOfferData = {};
            acceptJokerOfferData.Status = data.status;
            getHtmlFileAndRenderTemplate("template/common-response-template.html", acceptJokerOfferData, resultBody);
            resultContainer.removeClass("hidden");
        }, function (error) {

        });
    });


    $("#frm_reject_joker_offer").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();

        var resultContainer = $("#reject-joker-offer-result-container");
        resultContainer.addClass("hidden");
        var resultBody = $("#reject-joker-offer-result-body");
        resultBody.html('');
        jaasApi.rejectJoker(token, formData.offerId, formData.reservationCode, function (data) {
            var rejectJokerOfferData = data.data;
            if (rejectJokerOfferData == undefined)
                rejectJokerOfferData = {};
            rejectJokerOfferData.Status = data.status;
            getHtmlFileAndRenderTemplate("template/common-response-template.html", rejectJokerOfferData, resultBody);
            resultContainer.removeClass("hidden");
        }, function (error) {

        });
    });

    $("#frm_complete_order").submit(function (e) {
        e.preventDefault();
        var token = getTokenFromDom();
        var formData = $(this).serializeObject();
        var orderDateUtc = new Date().toISOString();

        var resultContainer = $("#complete-order-result-container");
        resultContainer.addClass("hidden");
        var resultBody = $("#complete-order-result-body");
        resultBody.html('');

        jaasApi.completeOrder(token, formData.restaurantUniqueKey, formData.orderUniqueKey, orderDateUtc, function (data) {
            var completeOrderData = data.data;
            if (completeOrderData == undefined)
                completeOrderData = {};
            completeOrderData.Status = data.status;
            getHtmlFileAndRenderTemplate("template/common-response-template.html", completeOrderData, resultBody);
            resultContainer.removeClass("hidden");

        }, function (error) {

        });
    });


    getJsFileWithAjax("js/source/get-new-joker-offer.js", $('.new-joker-offer-code-area'));
    getJsFileWithAjax("js/source/get-current-joker-offer.js", $('.current-joker-code-area'));
    getJsFileWithAjax("js/source/accept-joker-offer.js", $('.accept-joker-code-area'));
    getJsFileWithAjax("js/source/reject-joker-offer.js", $('.reject-joker-code-area'));
    getJsFileWithAjax("js/source/complete-order.js", $('.complete-order-code-area'));
});


function sendToApprove(offerId, reservationCode) {
    $("input[name='offerId']").val(offerId);
    $("input[name='reservationCode']").val(reservationCode);
    activeTab("accept-joker");
};
function sendToReject(offerId, reservationCode) {
    $("input[name='offerId']").val(offerId);
    $("input[name='reservationCode']").val(reservationCode);
    activeTab("reject-joker");
};
function getJsFileWithAjax(filePath, aceContainer) {
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

function getHtmlFileAndRenderTemplate(fileName, data, container) {
    $.ajax({
        type: "GET",
        url: fileName,
        dataType: 'text',
        success: function (templateData) {
            var output = Mustache.render(templateData, data);
            container.html(output);
        },
        error: function (e) {
        }
    });
}

function activeTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

