$(document).ready(function () {
    if (jaasApi != undefined) {
        jaasApi.configuration.environment = "Test";
        jaasApi.init();
    }

    //START: Get new joker offer.
    $(".form-get-joker-offer").submit(function (e) {
        e.preventDefault();
        var token = jaasExample.getTokenFromDom();
        var restaurantUniqueKeys = $("#get-joker-offer-restaurant-unique-keys").val().split(',');
        jaasApi.getJokerOffer(token, restaurantUniqueKeys, function (data) {
            jaasExample.set_offer_response($("#get-joker-offer"), data.data);
        }, function (error) {

        });
    });
    //END: Get new joker offer.


    //START: Get current joker offer
    $(".form-get-current-joker-offer").submit(function (e) {
        e.preventDefault();
        var token = jaasExample.getTokenFromDom();
        jaasApi.getCurrentJokerOffer(token, function (data) {
            jaasExample.set_offer_response($("#current-joker"), data.data);
        }, function (error) {

        });
    });
    //END: Get current joker offer

    //START: accept joker offer
    $(".form-accept-joker-offer").submit(function (e) {
        e.preventDefault();
        var token = jaasExample.getTokenFromDom();
        var offerId = $("#accept-joker-offer-id").val();
        var reservationCode = $("#accept-joker-offer-reservation-code").val();
        jaasApi.acceptJoker(token, offerId, reservationCode, function (data) {
            $container = $("#accept-joker");
            $container.find(".response-message").html(data.data.Message);
            $container.find(".result").html(data.data.Result);
        }, function (error) {

        });
    });
    //END: accept joker offer


    //START: Reject Joker Offer
    $(".form-reject-joker-offer").submit(function (e) {
        e.preventDefault();
        var token = jaasExample.getTokenFromDom();
        var offerId = $("#reject-joker-offer-id").val();
        var reservationCode = $("#reject-joker-offer-reservation-code").val();
        jaasApi.rejectJoker(token, offerId, reservationCode, function (data) {
            $container = $("#reject-joker");
            $container.find(".response-message").html(data.data.Message);
            $container.find(".result").html(data.data.Result);
        }, function (error) {

        });
    });
    //END: Reject Joker Offer

    //START Complete Order
    $(".form-complete-joker-offer").submit(function (e) {
        e.preventDefault();
        var token = jaasExample.getTokenFromDom();
        var restaurantUniqueKey = $("#complete-order-restaurant-unique-key").val();
        var orderKey = $("#complete-order-order-unique-key").val();
        var orderDateUtc = new Date().toISOString();
        jaasApi.completeOrder(token, restaurantUniqueKey, orderKey, orderDateUtc, function (data) {

            $container = $("#complete-order");
            $container.find(".response-message").html(data.data.Message);
            $container.find(".result").html(data.data.Result);
        }, function (error) {

        });
    });

    //END: Complete Order
});


var jaasExample = {};
jaasExample.getTokenFromDom = function () {
    var token = $("#token").val();
    return token;
};

jaasExample.set_offer_response = function (container, data) {
//Show response values
    var $jokerOfferContainer = container;
    $jokerOfferContainer.find(".response-message").html(data.Message);
    if (data.Result != null) {
        $jokerOfferContainer.find(".offer-id").html(data.Result.OfferId);
        remainingDurationMinute = ((data.Result.RemainingDuration / 1000) / 60).toFixed(2);
        $jokerOfferContainer.find(".remaining-duration").html(remainingDurationMinute);
        $jokerOfferContainer.find(".expire-date-utc").html(data.Result.ExpireDateUtc);

        var tableHtml = "";
        for (var i = 0; i < data.Result.OfferItems.length; i++) {
            tableHtml += "<tr><td>" + data.Result.OfferItems[i].ReservationCode
                + "</td><td>" + data.Result.OfferItems[i].ReservationStatus
                + "</td><td>" + data.Result.OfferItems[i].Restaurant.Name
                + "</td><td>" + data.Result.OfferItems[i].Restaurant.UniqueKey
                + "</td><td><button type='button' class='btn btn-success accept-joker' data-offer-id='" + data.Result.OfferId + "' data-reservation-id='" + data.Result.OfferItems[i].ReservationCode + "' title='Accept Joker Offer'><span class='glyphicon glyphicon-ok'></span> </button>" +
                "<button type='button' class='btn btn-danger reject-joker' data-offer-id='" + data.Result.OfferId + "' data-reservation-id='" + data.Result.OfferItems[i].ReservationCode + "'   title='Reject Joker Offer'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
        }
        $jokerOfferContainer.find(".table tbody").html('').append(tableHtml);

        $jokerOfferContainer.find(".accept-joker").on('click', function () {
            var currentItem = $(this);
            $("#accept-joker-offer-id").val(currentItem.attr('data-offer-id'));
            $("#accept-joker-offer-reservation-code").val(currentItem.attr('data-reservation-id'));
            jaasExample.activeTab("accept-joker");
        });

        $jokerOfferContainer.find(".reject-joker").on('click', function () {
            var currentItem = $(this);
            $("#reject-joker-offer-id").val(currentItem.attr('data-offer-id'));
            $("#reject-joker-offer-reservation-code").val(currentItem.attr('data-reservation-id'));
            jaasExample.activeTab("reject-joker");
        });
    }

};

jaasExample.activeTab = function (tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

