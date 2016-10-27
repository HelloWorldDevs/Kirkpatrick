(function($) {

    var HelloWorldDevs = function() {

    };

    HelloWorldDevs.prototype.mailForm = function (form, success_msg, uid) {
        var $form = $(form);
        $form.submit(function(e) {
            e.preventDefault();
            var formData = $form.serialize();
            var formAction = 'http://web-api.tysonsteele.com/v1/webprops/'+uid+'/schedule'
            $('.form-error').remove();
            $.ajax({
                type: 'POST',
                url: formAction,
                data: formData,
                dataType: 'json',
                encode: true
            }).done(function (response) {
                $form.replaceWith($(success_msg).html());
            }).error(function (response) {
                var $error_list = $('<ul>');
                if(response.responseJSON == undefined) {
                    $error_list.append($('<li>').text('There was a problem with your submission. Please ensure all fields are correctly entered.'));
                } else {
                    $.each(response.responseJSON, function(key, value) {
                        $error_list.append($('<li>').text(value));
                    });
                }
                $form.before('<div class="form-error"></div>');
                $('.form-error').html($error_list).fadeIn();
            });
        });
    };

    var HWD = new HelloWorldDevs();
    HWD.mailForm('#mail-form', '#success_msg' , '7fb35345-752d-4792-9480-cd3db6674a62');

    $('.mobile-primary-menu a').click(function () {
        if ($('#primary-menu').find('ul.mobile-primary-menu').length > 0) {
            $('ul.mobile-primary-menu').toggleClass("show");
        }
    });
    if ($(window).width() < 600) {
        $('.service').removeClass('col-xs-6');
    }
    $(window).resize(function() {
        if ($(window).width() < 600) {
            $('.service').removeClass('col-xs-6');
        } else {
            $('.service').addClass('col-xs-6');
        }
    })

    $('.delay-btn').click(function() {
        setTimeout(function() {
            $('.hidden-div').removeClass('hidden');
        }, 750);
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() >= 1) {
            $('.logo-static').css('display', 'none');
            $('.logo-scroll').css('display', 'initial');
        } else {
            $('.logo-static').css('display', 'initial');
            $('.logo-scroll').css('display', 'none');
        };
    });
    if ($(window).scrollTop() >= 1) {
        $('.logo-static').css('display', 'none');
        $('.logo-scroll').css('display', 'initial');
    } else {
        $('.logo-static').css('display', 'initial');
        $('.logo-scroll').css('display', 'none');
    };
})(jQuery);
