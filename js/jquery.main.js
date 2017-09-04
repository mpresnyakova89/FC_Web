jQuery(document).ready(function () {
    pageInit.init();
    OpenBox({
        wrap: '#nav',
        link: '.hold-toogle',
        box: '.menu',
        close: '.overlay',
        openClass: 'open'
    });
    listCounter();

    $('.simplebox').simplebox();
    scrollBox();
    checkHash();
    scrollHead();
	initLogin();
});

function initLogin() {
	$('form.form-login').each(function(){
		var hold = $(this);
		var login = hold.find('.btn-login');
		var error = hold.find('.error-login');
		var input = hold.find('input[type="text"], input[type="text"]');

		login.click(function() {
			$.ajax({
				type: 'POST',
				data: hold.serialize(),
				dataType: 'json',
				url: hold.attr('action'),
				success: function(e, msg){
					console.log(msg , e);
					console.log(hold.serialize());
				},
				error: function(e, msg){
					error.removeClass('outtaHere');
					console.log('Server error:', msg , e);
					console.log(hold.serialize());
				}
			});

			return false;
		});
	});
}

function OpenBox(obj) {
    $(obj.wrap).each(function () {
        var hold = $(this);
        var link = hold.find(obj.link);
        var box = hold.find(obj.box);
        var w = obj.w;
        var close = hold.find(obj.close);

        link.click(function () {
            $(obj.wrap).not(hold).removeClass(obj.openClass);
            if (!hold.hasClass(obj.openClass)) {
                hold.addClass(obj.openClass);
            }
            else {
                hold.removeClass(obj.openClass);
            }
            return false;
        });

        hold.hover(function () {
            $(this).addClass('hovering');
        }, function () {
            $(this).removeClass('hovering');
        });

        $("body").click(function () {
            if (!hold.hasClass('hovering')) {
                hold.removeClass(obj.openClass);
            }
        });
        close.click(function () {
            hold.removeClass(obj.openClass);

            return false;
        });
    });
}

function listCounter() {
    $('.list-clock').each(function () {
        var hold = $(this);

        hold.countdown(hold.data('finish'), function (event) {
            hold.find('.day').text(event.strftime('%D'));
            hold.find('.hours').text(event.strftime('%H'));
            hold.find('.minutes').text(event.strftime('%M'));
            hold.find('.sec').text(event.strftime('%S'));
        });
    });
}

function scrollHead() {
    var start = $('#fundcoin');
    var head = $('#nav');
    var headHeight = head.offset().top + head.outerHeight();

    var _scroll = function () {
        if ($(window).scrollTop() >= start.offset().top) {
            head.addClass('fixed-header');
        }
        else {
            head.removeClass('fixed-header');
        }
    }
    _scroll();
    $(window).scroll(_scroll);
}

function checkHash() {
    if (window.location.hash.indexOf("page=") != -1) {
        var id = $(window.location.hash.replace("page=", ''));
        $(window).scrollTop(id.offset().top);
        $('#nav').addClass('fixed-header')
    }
}

function scrollBox() {
    var list = $('.menu li a');
    var box = $('.section');
    var activeText = $('.active-menu');
    var li = $('.menu li');
    var nav = $("#nav");
    var title = $('head title');

    li.on("click", "a", function (event) {
        var id = jQuery(this).attr('href'),
            top = jQuery(id).offset().top;
        li.removeClass('active');
        nav.removeClass('open');
        $(this).parent().addClass('active');

        activeText.text($(this).text());
        var link = $('.menu .active > a');
        if ($('.toogle-menu').is(":hidden")) {
            $(window).unbind('scroll.check');
            $('body,html').animate({scrollTop: top}, 1500, function () {
                changeTitleHash(title, link.text(), link.attr('href').substr(1, link.attr('href').length - 1));
                setTimeout(function () {
                    $(window).on('scroll.check', all)
                }, 200)
            });
        } else {
            $('body,html').animate({scrollTop: top - nav.innerHeight()}, 1500, function () {
                changeTitleHash(title, link.text(), link.attr('href').substr(1, link.attr('href').length - 1));
                setTimeout(function () {
                    $(window).on('scroll.check', all)
                }, 200)
            });
        }

        return false;
    });
    var active, time;

    function all() {
        if (time) {
            clearTimeout(time);
        }
        time = setTimeout(function () {
            list.each(function () {
                if ($(window).scrollTop() > $($(this).attr('href')).offset().top - 50 - nav.innerHeight()) {
                    active = $(this).attr('href');
                }
            });
            li.removeClass('active');
            if (active != undefined) {
                $('[href="' + active + '"]').parent().addClass('active');
                changeTitleHash(title, $('[href="'+active+'"]').text(), active.substr(1, active.length))
                activeText.text($('[href="'+active+'"]').text());
            }
        }, 50)

    }

    function changeTitleHash(title, text, href) {
        title.text(text);
        window.location.hash = "page=" + href;
    }

    $(window).on('scroll.check', all);
    all();
}

var pageInit = {
        init: function () {
            this.galFade();
            this.team();
            this.press();
        },
        press: function () {
            $('body').each(function () {
                var hold = $(this);
                var gal = hold.find('.gallery-press');
                var fake = hold.find('.fake');

                if (fake.is(':visible')) {
                    gal.gallery({
                        flexible: true,
                        elements: '.gallery-holder > ul > li',
                        disableBtn: 'hidden'
                    });
                }

                function all() {
                    if (fake.is(':visible')) {
                        if (!gal.hasClass('done')) {
                            gal.addClass('done');
                            gal.gallery('destroy');
                            gal.gallery({
                                flexible: true,
                                elements: '.gallery-holder > ul > li',
                                disableBtn: 'hidden'
                            });

                        }
                        console.log('111115');
                    }
                    else {
                        if (gal.hasClass('done')) {
                            gal.removeClass('done');
                            gal.gallery('destroy');
                        }
                        console.log('114578');
                    }
                }

                $(window).resize(all);
            });
        },
        team: function () {
            $('body').each(function () {
                var hold = $(this);
                var gal = hold.find('.gallery-team');
                var flag = false;
                var nummberDef = 3;
                var nummber = nummberDef;
                var _time;

                gal.gallery({
                    flexible: true,
                    slideElement: nummber,
                    elements: '.gallery-holder > ul > li'
                });

                function all() {
                    if (nummber != gal.gallery('option', 'wrapHolderW')) {
                        flag = true;
                        nummber = gal.gallery('option', 'wrapHolderW')
                    }
                    else {
                        flag = false;
                    }
                    if (flag) {
                        if (_time) clearTimeout(_time);
                        _time = setTimeout(function () {
                            console.log(nummber);
                            if (nummber == 1) gal.addClass('one');
                            else gal.removeClass('one');
                            gal.gallery('destroy');
                            gal.gallery({
                                flexible: true,
                                slideElement: nummber,
                                elements: '.gallery-holder > ul > li'
                            });
                        }, 300);
                    }
                }

                $(window).resize(all);
                all();
            });
        },
        galFade: function () {
            $('body').each(function () {
                var hold = $(this);
                var gal = hold.find('.gallery-equity');
                var _time;

                gal.gallery({
                    switcher: '.switcher > li',
                    effect: 'transparent',
                    autoHeight: true,
                    elements: '.gallery-holder > ul > li'
                });

                $(window).resize(function () {
                    if (_time) clearTimeout(_time);
                    _time = setTimeout(function () {
                        gal.gallery('rePosition');
                    }, 300);
                });
            });
        }
    }


    /**
     * jQuery gallery v2.3.6
     * Copyright (c) 2013 JetCoders
     * email: yuriy.shpak@jetcoders.com
     * www: JetCoders.com
     * Licensed under the MIT License:
     * http://www.opensource.org/licenses/mit-license.php
     **/

;(function ($) {
    var _installDirections = function (data) {
            data.holdWidth = data.list.parent().outerWidth();
            data.woh = data.elements.outerWidth(true);
            if (!data.direction) data.parentSize = data.holdWidth; else {
                data.woh = data.elements.outerHeight(true);
                data.parentSize = data.list.parent().height()
            }
            data.wrapHolderW = Math.ceil(data.parentSize / data.woh);
            if ((data.wrapHolderW - 1) * data.woh + data.woh / 2 > data.parentSize) data.wrapHolderW--;
            if (data.wrapHolderW == 0) data.wrapHolderW = 1
        }, _dirAnimate = function (data) {
            if (!data.direction) return {
                left: -(data.woh *
                    data.active)
            }; else return {top: -(data.woh * data.active)}
        }, _initDisableBtn = function (data) {
            data.prevBtn.removeClass(data.disableBtn);
            data.nextBtn.removeClass(data.disableBtn);
            if (data.active == 0 || data.count + 1 == data.wrapHolderW - 1) data.prevBtn.addClass(data.disableBtn);
            if (data.active == 0 && data.count + 1 == 1 || data.count + 1 <= data.wrapHolderW - 1) data.nextBtn.addClass(data.disableBtn);
            if (data.active == data.rew) data.nextBtn.addClass(data.disableBtn)
        }, _initEvent = function (data, btn, side) {
            btn.bind(data.event + ".gallery" +
                data.timeStamp, function () {
                if (data.flag) {
                    if (data.infinite) data.flag = false;
                    if (data._t) clearTimeout(data._t);
                    _toPrepare(data, side);
                    if (data.autoRotation) _runTimer(data);
                    if (typeof data.onChange == "function") data.onChange({data: data})
                }
                if (data.event == "click") return false
            })
        }, _initEventSwitcher = function (data) {
            data.switcher.bind(data.event + ".gallery" + data.timeStamp, function () {
                if (data.flag && !$(this).hasClass(data.activeClass)) {
                    if (data.infinite) data.flag = false;
                    data.active = data.switcher.index(jQuery(this)) * data.slideElement;
                    if (data.infinite) data.active = data.switcher.index(jQuery(this)) + data.count;
                    if (data._t) clearTimeout(data._t);
                    if (data.disableBtn) _initDisableBtn(data);
                    if (!data.effect) _scrollElement(data); else _fadeElement(data);
                    if (data.autoRotation) _runTimer(data);
                    if (typeof data.onChange == "function") data.onChange({data: data})
                }
                if (data.event == "click") return false
            })
        }, _toPrepare = function (data, side) {
            if (!data.infinite) {
                if (data.active == data.rew && data.circle && side) data.active = -data.slideElement;
                if (data.active == 0 && data.circle &&
                    !side) data.active = data.rew + data.slideElement;
                for (var i = 0; i < data.slideElement; i++) if (side) {
                    if (data.active + 1 <= data.rew) data.active++
                } else if (data.active - 1 >= 0) data.active--
            } else {
                if (data.active >= data.count + data.count && side) data.active -= data.count;
                if (data.active <= data.count - 1 && !side) data.active += data.count;
                data.list.css(_dirAnimate(data));
                if (side) data.active += data.slideElement; else data.active -= data.slideElement
            }
            if (data.disableBtn) _initDisableBtn(data);
            if (!data.effect) _scrollElement(data); else _fadeElement(data)
        },
        _fadeElement = function (data) {
            data.list.removeClass(data.activeClass).css({zIndex: 1});
            data.list.eq(data.last).stop().css({zIndex: 2, opacity: 1});
            if (data.effect == "transparent") data.list.eq(data.last).animate({opacity: 0}, {
                queue: false,
                duration: data.duration
            });
            data.list.eq(data.active).addClass(data.activeClass).css({
                opacity: 0,
                zIndex: 3
            }).animate({opacity: 1}, {
                queue: false, duration: data.duration, complete: function () {
                    jQuery(this).css("opacity", "auto")
                }
            });
            if (data.autoHeight) data.list.parent().animate({height: data.list.eq(data.active).outerHeight()},
                {queue: false, duration: data.duration});
            if (data.switcher) data.switcher.removeClass(data.activeClass).eq(data.active).addClass(data.activeClass);
            data.last = data.active
        }, _scrollElement = function (data) {
            data.elements.removeClass("active").eq(data.active).addClass(data.activeClass);
            if (!data.infinite) data.list.animate(_dirAnimate(data), {queue: false, duration: data.duration}); else {
                data.list.animate(_dirAnimate(data), data.duration, function () {
                    if (data.active >= data.count + data.count) data.active -= data.count;
                    if (data.active <=
                        data.count - 1) data.active += data.count;
                    data.list.css(_dirAnimate(data));
                    data.flag = true
                });
                data.elements.eq(data.active - data.count).addClass(data.activeClass);
                data.elements.eq(data.active + data.count).addClass(data.activeClass)
            }
            if (data.autoHeight) data.list.parent().animate({height: data.list.children().eq(data.active).outerHeight()}, {
                queue: false,
                duration: data.duration
            });
            if (data.switcher) if (!data.infinite) data.switcher.removeClass(data.activeClass).eq(Math.ceil(data.active / data.slideElement)).addClass(data.activeClass);
            else {
                data.switcher.removeClass(data.activeClass).eq(data.active - data.count).addClass(data.activeClass);
                data.switcher.removeClass(data.activeClass).eq(data.active - data.count - data.count).addClass(data.activeClass);
                data.switcher.eq(data.active).addClass(data.activeClass)
            }
        }, _runTimer = function (data) {
            if (data._t) clearTimeout(data._t);
            data._t = setInterval(function () {
                if (data.infinite) data.flag = false;
                _toPrepare(data, true);
                if (typeof data.onChange == "function") data.onChange({data: data})
            }, data.autoRotation)
        }, _rePosition =
            function (data) {
                if (data.flexible && !data.direction) {
                    _installDirections(data);
                    if (data.oneSlide) data.elements.css({width: data.holdWidth}); else if (data.elements.length * data.minWidth > data.holdWidth) {
                        data.elements.css({width: Math.floor(data.holdWidth / Math.floor(data.holdWidth / data.minWidth))});
                        if (data.elements.outerWidth(true) > Math.floor(data.holdWidth / Math.floor(data.holdWidth / data.minWidth))) data.elements.css({
                            width: Math.floor(data.holdWidth / Math.floor(data.holdWidth / data.minWidth)) - (data.elements.outerWidth(true) -
                                Math.floor(data.holdWidth / Math.floor(data.holdWidth / data.minWidth)))
                        })
                    } else {
                        data.active = 0;
                        data.elements.css({width: Math.floor(data.holdWidth / data.elements.length)})
                    }
                }
                _installDirections(data);
                if (!data.effect) {
                    data.rew = data.count - data.wrapHolderW + 1;
                    if (data.active > data.rew && !data.infinite) data.active = data.rew;
                    if (data.active - data.count > data.rew && data.infinite) data.active = data.rew;
                    data.list.css({position: "relative"}).css(_dirAnimate(data));
                    if (data.autoHeight) data.list.parent().css({height: data.list.children().eq(data.active).outerHeight()})
                } else {
                    data.rew =
                        data.count;
                    data.list.css({opacity: 0}).removeClass(data.activeClass).eq(data.active).addClass(data.activeClass).css({opacity: 1}).css("opacity", "auto");
                    if (data.autoHeight) data.list.parent().css({height: data.list.eq(data.active).outerHeight()})
                }
                if (data.switcher) if (!data.infinite) data.switcher.removeClass(data.activeClass).eq(Math.ceil(data.active / data.slideElement)).addClass(data.activeClass); else {
                    data.switcher.removeClass(data.activeClass).eq(data.active - data.count).addClass(data.activeClass);
                    data.switcher.removeClass(data.activeClass).eq(data.active -
                        data.count - data.count).addClass(data.activeClass);
                    data.switcher.eq(data.active).addClass(data.activeClass)
                }
                if (data.disableBtn) _initDisableBtn(data);
                if (data.rew <= 0 && !data.effect) data.list.css({left: 0})
            }, _initTouchEvent = function (data) {
            var touchOnGallery = false;
            var startTouchPos, listPosNow, side, start;
            var span = data.list.parent().find("span.gallery-touch-holder");
            if (span.length == 0) {
                span = $("<span></span>");
                span.css({
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 9999,
                    height: 9999,
                    cursor: "pointer",
                    zIndex: 9999,
                    display: "none"
                }).addClass("gallery-touch-holder");
                data.list.parent().append(span)
            }
            data.list.parent().css({position: "relative"});
            data.list.bind("mousedown.gallery" + data.timeStamp + " touchstart.gallery" + data.timeStamp, function (e) {
                touchOnGallery = true;
                startTouchPos = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                data.list.stop();
                start = 0;
                listPosNow = data.list.position().left;
                if (e.type == "mousedown") e.preventDefault()
            });
            $(document).bind("mousemove.gallery" + data.timeStamp + " touchmove.gallery" + data.timeStamp, function (e) {
                if (touchOnGallery &&
                    Math.abs(startTouchPos - (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX)) > 10) {
                    span.css({display: "block"});
                    start = (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX) - startTouchPos;
                    if (!data.effect) data.list.css({left: listPosNow + start});
                    return false
                }
            }).bind("mouseup.gallery" + data.timeStamp + " touchend.gallery" + data.timeStamp, function (e) {
                if (touchOnGallery && span.is(":visible")) {
                    span.css({display: "none"});
                    if (!data.infinite) if (!data.effect) if (data.list.position().left > 0) {
                        data.active =
                            0;
                        _scrollElement(data)
                    } else if (data.list.position().left < -data.woh * data.rew) {
                        data.active = data.rew;
                        _scrollElement(data)
                    } else {
                        data.active = Math.floor(data.list.position().left / -data.woh);
                        if (start < 0) data.active += 1;
                        _scrollElement(data)
                    } else {
                        if (start < 0) _toPrepare(data, true);
                        if (start > 0) _toPrepare(data, false)
                    } else {
                        if (data.list.position().left > -data.woh * data.count) data.list.css({left: data.list.position().left - data.woh * data.count});
                        if (data.list.position().left < -data.woh * data.count * 2) data.list.css({
                            left: data.list.position().left +
                            data.woh * data.count
                        });
                        data.active = Math.floor(data.list.position().left / -data.woh);
                        if (start < 0) data.active += 1;
                        _scrollElement(data)
                    }
                    if (data.disableBtn) _initDisableBtn(data);
                    if (typeof data.onChange == "function") data.onChange({data: data});
                    if (data.autoRotation) _runTimer(data);
                    touchOnGallery = false
                } else touchOnGallery = false
            })
        }, methods = {
            init: function (options) {
                return this.each(function (i) {
                    var $this = $(this);
                    $this.data("gallery", jQuery.extend({}, defaults, options));
                    var data = $this.data("gallery");
                    data.aR = data.autoRotation;
                    data.context = $this;
                    data.timeStamp = (new Date).getTime() + i;
                    data.list = data.context.find(data.elements);
                    data.elements = data.list;
                    if (data.elements.css("position") == "absolute" && data.autoDetect && !data.effect) data.effect = true;
                    data.count = data.list.index(data.list.filter(":last"));
                    if (!data.effect) data.list = data.list.parent();
                    data.switcher = data.context.find(data.switcher);
                    if (data.switcher.length == 0) data.switcher = false;
                    if (data.nextBtn) data.nextBtn = data.context.find(data.nextBtn);
                    if (data.prevBtn) data.prevBtn = data.context.find(data.prevBtn);
                    if (data.switcher) data.active = data.switcher.index(data.switcher.filter("." + data.activeClass + ":eq(0)")); else data.active = data.elements.index(data.elements.filter("." + data.activeClass + ":eq(0)"));
                    if (data.active < 0) data.active = 0;
                    data.last = data.active;
                    if (data.oneSlide) data.flexible = true;
                    if (data.flexible && !data.direction) data.minWidth = data.elements.outerWidth(true);
                    _rePosition(data);
                    if (data.flexible && !data.direction) $(window).bind("resize.gallery" + data.timeStamp, function () {
                        _rePosition(data)
                    });
                    data.flag = true;
                    if (data.infinite) {
                        data.count++;
                        data.active += data.count;
                        data.list.append(data.elements.clone().addClass("gallery-clone"));
                        data.list.append(data.elements.clone().addClass("gallery-clone"));
                        data.list.css(_dirAnimate(data));
                        data.elements = data.list.children()
                    }
                    if (data.rew <= 0 && !data.effect) data.list.css({left: 0}); else {
                        if (data.list.length <= 1 && data.effect) return $this;
                        if (data.nextBtn) _initEvent(data, data.nextBtn, true);
                        if (data.prevBtn) _initEvent(data, data.prevBtn, false);
                        if (data.switcher) _initEventSwitcher(data);
                        if (data.autoRotation) _runTimer(data);
                        if (data.touch) _initTouchEvent(data);
                        if (typeof data.onChange == "function") data.onChange({data: data})
                    }
                })
            }, option: function (name, set) {
                if (set) return this.each(function () {
                    var data = $(this).data("gallery");
                    if (data) data[name] = set
                }); else {
                    var ar = [];
                    this.each(function () {
                        var data = $(this).data("gallery");
                        if (data) ar.push(data[name])
                    });
                    if (ar.length > 1) return ar; else return ar[0]
                }
            }, destroy: function () {
                return this.each(function () {
                    var $this = $(this), data = $this.data("gallery");
                    if (data) {
                        if (data._t) clearTimeout(data._t);
                        data.context.find("*").unbind(".gallery" + data.timeStamp);
                        $(window).unbind(".gallery" + data.timeStamp);
                        $(document).unbind(".gallery" + data.timeStamp);
                        data.elements.removeAttr("style");
                        if (data.infinite) data.elements.filter(".gallery-clone").remove();
                        data.list.removeAttr("style");
                        $this.removeData("gallery")
                    }
                })
            }, rePosition: function () {
                return this.each(function () {
                    var $this = $(this), data = $this.data("gallery");
                    _rePosition(data)
                })
            }, stop: function () {
                return this.each(function () {
                    var $this = $(this), data = $this.data("gallery");
                    data.aR = data.autoRotation;
                    data.autoRotation = false;
                    if (data._t) clearTimeout(data._t)
                })
            }, play: function (time) {
                return this.each(function () {
                    var $this = $(this), data = $this.data("gallery");
                    if (data._t) clearTimeout(data._t);
                    data.autoRotation = time ? time : data.aR;
                    if (data.autoRotation) _runTimer(data)
                })
            }, next: function (element) {
                return this.each(function () {
                    var $this = $(this), data = $this.data("gallery");
                    if (element != "undefined" && element > -1) {
                        data.active = element;
                        if (data.disableBtn) _initDisableBtn(data);
                        if (!data.effect) _scrollElement(data);
                        else _fadeElement(data)
                    } else if (data.flag) {
                        if (data.infinite) data.flag = false;
                        if (data._t) clearTimeout(data._t);
                        _toPrepare(data, true);
                        if (data.autoRotation) _runTimer(data);
                        if (typeof data.onChange == "function") data.onChange({data: data})
                    }
                })
            }, prev: function () {
                return this.each(function () {
                    var $this = $(this), data = $this.data("gallery");
                    if (data.flag) {
                        if (data.infinite) data.flag = false;
                        if (data._t) clearTimeout(data._t);
                        _toPrepare(data, false);
                        if (data.autoRotation) _runTimer(data);
                        if (typeof data.onChange == "function") data.onChange({data: data})
                    }
                })
            }
        },
        defaults = {
            infinite: false,
            activeClass: "active",
            duration: 300,
            slideElement: 1,
            autoRotation: false,
            effect: false,
            elements: "ul:eq(0) > li",
            switcher: ".switcher > li",
            disableBtn: false,
            nextBtn: "a.link-next, a.btn-next, .next",
            prevBtn: "a.link-prev, a.btn-prev, .prev",
            circle: true,
            direction: false,
            event: "click",
            autoHeight: false,
            flexible: false,
            oneSlide: false,
            autoDetect: true,
            touch: true,
            onChange: null
        };
    $.fn.gallery = function (method) {
        if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments,
            1)); else if (typeof method === "object" || !method) return methods.init.apply(this, arguments); else $.error("Method " + method + " does not exist on jQuery.gallery")
    }
})(jQuery);


/**
 * jQuery simplebox v2.0.4
 * Copyright (c) 2013 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function ($) {
    var _condition = function (id, options) {
        if ($.simplebox.modal) {
            var data = $.simplebox.modal.data('simplebox');
            data.onClose($.simplebox.modal);
            $.simplebox.modal.fadeOut(data.duration, function () {
                $.simplebox.modal.css({left: '-9999px', top: '-9999px'}).show();
                data.afterClose($.simplebox.modal);
                $.simplebox.modal.removeData('simplebox');
                $.simplebox.modal = false;
                _toPrepare(id, options);
            });
        } else _toPrepare(id, options);
    }, _calcWinWidth = function () {
        return ($(document).width() > $('body').width()) ? $(document).width() : jQuery('body').width();
    }, _toPrepare = function (id, options) {
        $.simplebox.modal = $(id);
        $.simplebox.modal.data('simplebox', options);
        var data = $.simplebox.modal.data('simplebox');
        data.btnClose = $.simplebox.modal.find(data.linkClose);
        var popupTop = $(window).scrollTop() + ($(window).height() / 2) - $.simplebox.modal.outerHeight(true) / 2;
        if ($(window).scrollTop() > popupTop) popupTop = $(window).scrollTop();
        if (popupTop + $.simplebox.modal.outerHeight(true) > $(document).height()) popupTop = $(document).height() - $.simplebox.modal.outerHeight(true);
        if (popupTop < 0) popupTop = 0;
        if (!data.positionFrom) {
            $.simplebox.modal.css({
                zIndex: 1000,
                top: popupTop,
                left: _calcWinWidth() / 2 - $.simplebox.modal.outerWidth(true) / 2
            }).hide();
        } else {
            $.simplebox.modal.css({
                zIndex: 1000,
                top: $(data.positionFrom).offset().top + $(data.positionFrom).outerHeight(true),
                left: $(data.positionFrom).offset().left
            }).hide();
        }
        _initAnimate(data);
        _closeEvent(data, data.btnClose);
        if (data.overlay.closeClick) _closeEvent(data, $.simplebox.overlay);
    }, _initAnimate = function (data) {
        data.onOpen($.simplebox.modal);
        if (data.overlay) {
            $.simplebox.overlay.css({
                background: data.overlay.color,
                opacity: data.overlay.opacity
            }).fadeIn(data.duration, function () {
                $.simplebox.modal.fadeIn(data.duration, function () {
                    $.simplebox.busy = false;
                    data.afterOpen($.simplebox.modal);
                    if ($(window).scrollTop() > $.simplebox.modal.offset().top) $('html, body').animate({scrollTop: $.simplebox.modal.offset().top}, 500);
                });
            });
        } else {
            $.simplebox.overlay.fadeOut(data.duration);
            $.simplebox.modal.fadeIn(data.duration, function () {
                $.simplebox.busy = false;
                data.afterOpen($.simplebox.modal);
                if ($(window).scrollTop() > $.simplebox.modal.offset().top) $('html, body').animate({scrollTop: $.simplebox.modal.offset().top}, 500);
            });
        }
    }, _closeEvent = function (data, element) {
        element.unbind('click.simplebox').bind('click.simplebox', function () {
            if (!$.simplebox.busy) {
                $.simplebox.busy = true;
                data.onClose($.simplebox.modal);
                $.simplebox.modal.fadeOut(data.duration, function () {
                    $.simplebox.modal.css({left: '-9999px', top: '-9999px'}).show();
                    $.simplebox.overlay.fadeOut(data.duration, function () {
                        data.afterClose($.simplebox.modal);
                        $.simplebox.modal.removeData('simplebox');
                        $.simplebox.modal = false;
                        $.simplebox.busy = false
                    });
                });
            }
            return false;
        });
    }, methods = {
        init: function (options) {
            $(this).unbind('click.simplebox').bind('click.simplebox', function () {
                var data = $(this).data('simplebox');
                if (!$(this).hasClass(defaults.disableClass) && !$.simplebox.busy) {
                    $.simplebox.busy = true;
                    _condition($(this).attr('href') ? $(this).attr('href') : $(this).data('href'), jQuery.extend(true, {}, defaults, options));
                }
                return false;
            });
            return this;
        }, option: function (name, set) {
            if (set) {
                return this.each(function () {
                    var data = $(this).data('simplebox');
                    if (data) data[name] = set;
                });
            } else {
                var ar = [];
                this.each(function () {
                    var data = $(this).data('simplebox');
                    if (data) ar.push(data[name]);
                });
                if (ar.length > 1) return ar; else return ar[0];
            }
        }
    }, defaults = {
        duration: 300,
        linkClose: '.close, .btn-close',
        disableClass: 'disabled',
        overlay: {box: 'simplebox-overlay', color: 'black', closeClick: true, opacity: 0.3},
        positionFrom: false,
        onOpen: function () {
        },
        afterOpen: function () {
        },
        onClose: function () {
        },
        afterClose: function () {
        }
    };
    $.fn.simplebox = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.simplebox');
            }
        }
    };
    $.simplebox = function (id, options) {
        if (!$.simplebox.busy) {
            $.simplebox.busy = true;
            _condition(id, jQuery.extend(true, {}, defaults, options));
        }
    };
    $.simplebox.init = function () {
        if (!$.simplebox.overlay) {
            $.simplebox.overlay = jQuery('<div class="' + defaults.overlay.box + '"></div>');
            jQuery('body').append($.simplebox.overlay);
            $.simplebox.overlay.css({
                position: 'fixed',
                zIndex: 999,
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                background: defaults.overlay.color,
                opacity: defaults.overlay.opacity
            }).hide();
        }
        ;$(document).unbind('keypress.simplebox').bind('keypress.simplebox', function (e) {
            if ($.simplebox.modal && $.simplebox.modal.is(':visible') && e.keyCode == 27) {
                $.simplebox.close();
            }
        });
        $(window).bind('resize.simplebox', function () {
            if ($.simplebox.modal && $.simplebox.modal.is(':visible')) {
                var data = $.simplebox.modal.data('simplebox');
                if (!data.positionFrom) {
                    $.simplebox.modal.animate({left: _calcWinWidth() / 2 - $.simplebox.modal.outerWidth(true) / 2}, {
                        queue: false,
                        duration: $.simplebox.modal.data('simplebox').duration
                    });
                } else {
                    $.simplebox.modal.animate({
                        top: $(data.positionFrom).offset().top + $(data.positionFrom).outerHeight(true),
                        left: $(data.positionFrom).offset().left
                    }, {queue: false, duration: $.simplebox.modal.data('simplebox').duration});
                }
            }
        });
    };
    $.simplebox.close = function () {
        if ($.simplebox.modal && !$.simplebox.busy) {
            var data = $.simplebox.modal.data('simplebox');
            $.simplebox.busy = true;
            data.onClose($.simplebox.modal);
            $.simplebox.modal.fadeOut(data.duration, function () {
                $.simplebox.modal.css({left: '-9999px', top: '-9999px'}).show();
                if ($.simplebox.overlay) $.simplebox.overlay.fadeOut(data.duration, function () {
                    data.afterClose($.simplebox.modal);
                    $.simplebox.modal.removeData('simplebox');
                    $.simplebox.modal = false;
                    $.simplebox.busy = false;
                }); else {
                    data.afterClose($.simplebox.modal);
                    $.simplebox.modal.removeData('simplebox');
                    $.simplebox.modal = false;
                    $.simplebox.busy = false;
                }
            });
        }
    };
    $(document).ready(function () {
        $.simplebox.init();
    });
})(jQuery);
