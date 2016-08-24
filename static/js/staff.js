$(function () {

    // Show dialog with voting
    $(document).on('click', '.show-zakoncz-wydarzenie', function () {
        // $('#maintop .graj .avatarmenu ul').removeClass('display');
        // $('#maintop .graj .avatarmenu ul').removeClass('opacity');
        // $('#wallet-not').css({'margin-top': ''});
        // $('#wallet-not').removeClass("opacity");
        // $('#maintop .userdata .wallet .arrowup').removeClass("display");
        // $('#maintop .userdata .wallet .arrowup').removeClass("opacity");
        // $('#maintop .mainmenu').addClass("display");
        $('.overlay').addClass("display");
        $('#resolve-dialog').addClass("opacity");

        setTimeout(function () {
            $('.overlay').addClass("opacity");
        }, 150); // opoznienie
    });

    // Vote for solution
    $(document).on('click', '#resolveabet .a_bet', function (e) {
        var event_id = $(this).data('event_id');
        var data = {outcome: $(this).data('outcome')};
        var resolveabets = $('body').find('#resolveabet [data-event_id="' + event_id + '"]').parent();
        console.log(event_id);
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/event/' + event_id + '/resolve/',
            success: function (data) {
                // console.log(JSON.stringify(data));
                if (data.updates) {
                    // console.log('RESP: ' + JSON.stringify(data.updates));
                    var count_YES = data.updates.YES;
                    var count_NO = data.updates.NO;
                    resolveabets.each(function (idx) {
                        $(this).children('.a_betYES').children('.betYES').children('.value').html(count_YES);
                        $(this).children('.a_betNO').children('.betNO').children('.value').html(count_NO);
                    });
                }
            },
            error: function (data) {
                var response = JSON.parse(data.responseText);
                notify(response.error, 'error');
                // console.log(data);
            }
        });
    });

});