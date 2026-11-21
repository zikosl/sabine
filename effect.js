
$(window).on('load', function () {
    $('.loading').fadeOut('slow');
    $('.container').fadeIn('slow');
});

$(document).ready(function () {

    let flying = false;
    let balloonsArranged = false;

    const balloonIds = [
        '#b1', '#b2', '#b3',
        '#b4', '#b5', '#b6',
        '#b7', '#b8', '#b9'
    ];

    // =========================================
    // INITIAL SETUP
    // =========================================

    $('.cake').hide();
    $('.message').hide();
    $('.fuego').hide();

    $('#play, #bannar_coming, #balloons_flying, #cake_fadein, #light_candle, #wish_message, #story').hide();

    $('.message p').hide();

    // =========================================
    // BALLOON POSITIONING
    // =========================================

    function arrangeBalloons() {

        const width = $(window).width();
        const center = width / 2;

        const gap = Math.min(85, (width - 50) / 8);
        const start = center - (gap * 4);

        balloonIds.forEach(function (id, index) {

            $(id).stop(true, false).css({
                position: 'absolute'
            }).animate({
                top: 240,
                left: start + (index * gap)
            }, 700);

        });

        $('.balloons').css('opacity', '0.95');
        $('.balloons h2').fadeIn(1200);

        balloonsArranged = true;
    }

    $(window).on('resize', function () {

        if (balloonsArranged) {
            arrangeBalloons();
        }

    });

    // =========================================
    // STEP 1: TURN ON THE LIGHTS
    // =========================================

    $('#turn_on').click(function () {

        $('#bulb_yellow').addClass('bulb-glow-yellow');
        $('#bulb_red').addClass('bulb-glow-red');
        $('#bulb_blue').addClass('bulb-glow-blue');
        $('#bulb_green').addClass('bulb-glow-green');
        $('#bulb_pink').addClass('bulb-glow-pink');
        $('#bulb_orange').addClass('bulb-glow-orange');

        $('body').addClass('peach');

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#play').fadeIn('slow');
        }, 2000);

    });

    // =========================================
    // STEP 2: PLAY MUSIC
    // =========================================

    $('#play').click(function () {

        const audio = $('.song')[0];

        if (audio) {

            audio.play().catch(function (error) {
                console.log('Audio playback requires user interaction:', error);
            });

        }

        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
        $('#bulb_red').addClass('bulb-glow-red-after');
        $('#bulb_blue').addClass('bulb-glow-blue-after');
        $('#bulb_green').addClass('bulb-glow-green-after');
        $('#bulb_pink').addClass('bulb-glow-pink-after');
        $('#bulb_orange').addClass('bulb-glow-orange-after');

        $('body').addClass('peach-after');

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#bannar_coming').fadeIn('slow');
        }, 2000);

    });

    // =========================================
    // STEP 3: DECORATE
    // =========================================

    $('#bannar_coming').click(function () {

        $('.bannar').addClass('bannar-come');

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#balloons_flying').fadeIn('slow');
        }, 2500);

    });

    // =========================================
    // STEP 4: BALLOON FLIGHT ANIMATION
    // =========================================

    function flyBalloon(id) {

        if (!flying) return;

        const $balloon = $(id);

        const screenWidth = $(window).width();
        const screenHeight = $(window).height();

        const randomLeft = Math.random() * Math.max(0, screenWidth - 100);
        const randomTop = Math.random() * Math.max(100, screenHeight - 150);

        $balloon.animate({

            left: randomLeft,
            top: randomTop

        }, 7000 + Math.random() * 4000, 'swing', function () {

            if (flying) {
                flyBalloon(id);
            }

        });

    }

    $('#balloons_flying').click(function () {

        flying = true;

        $('.balloon-border').animate({
            top: -500
        }, 6000);

        balloonIds.forEach(function (id, index) {

            const $balloon = $(id);

            $balloon.addClass(
                index % 2 === 0
                    ? 'balloons-rotate-behaviour-one'
                    : 'balloons-rotate-behaviour-two'
            );

            flyBalloon(id);

        });

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#cake_fadein').fadeIn('slow');
        }, 3500);

    });

    // =========================================
    // STEP 5: SHOW THE CAKE
    // =========================================

    $('#cake_fadein').click(function () {

        $('.cake').fadeIn('slow');

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#light_candle').fadeIn('slow');
        }, 2000);

    });

    // =========================================
    // STEP 6: LIGHT THE CANDLES
    // =========================================

    $('#light_candle').click(function () {

        $('.fuego').fadeIn('slow');

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#wish_message').fadeIn('slow');
        }, 1200);

    });

    // =========================================
    // STEP 7: HAPPY BIRTHDAY SABINE
    // =========================================

    $('#wish_message').click(function () {

        // Stop balloon flight
        flying = false;

        balloonIds.forEach(function (id) {
            $(id).stop(true, false);
        });

        // Arrange all nine balloons
        arrangeBalloons();

        $(this).fadeOut('slow');

        setTimeout(function () {
            $('#story').fadeIn('slow');
        }, 2500);

    });

    // =========================================
    // STEP 8: PERSONAL MESSAGE
    // =========================================

    $('#story').click(function () {

        $(this).fadeOut('slow');

        $('.cake').fadeOut('slow');

        $('.message').fadeIn('slow');

        const paragraphs = $('.message p');

        paragraphs.hide();

        let currentIndex = 0;

        function showNextParagraph() {

            if (currentIndex >= paragraphs.length) {
                return;
            }

            const currentParagraph = $(paragraphs[currentIndex]);

            currentParagraph.fadeIn(900, function () {

                currentIndex++;

                if (currentIndex < paragraphs.length) {

                    setTimeout(function () {

                        currentParagraph.fadeOut(700, function () {
                            showNextParagraph();
                        });

                    }, 1700);

                } else {

                    // Leave the final birthday message visible
                    currentParagraph.css({
                        'font-weight': 'bold'
                    });

                }

            });

        }

        setTimeout(function () {
            showNextParagraph();
        }, 800);

    });

});
