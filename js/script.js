/*===========================================================*/
/*追従メニューの現在地ハイライト*/
/*===========================================================*/

var elemTop = [];

function PositionCheck() {
  var headerH = $("#header").outerHeight(true);
  $(".scroll-point").each(function (i) {
    elemTop[i] = Math.round(parseInt($(this).offset().top - headerH - 10));
  });
}

function ScrollAnime() {
  var scroll = Math.round($(window).scrollTop());
  var NavElem = $("#pc-nav li");
  $("#pc-nav li").removeClass("current");
  if (scroll >= elemTop[0] && scroll < elemTop[1]) {
    $(NavElem[0]).addClass("current");
  } else if (scroll >= elemTop[1] && scroll < elemTop[2]) {
    $(NavElem[1]).addClass("current");
  } else if (scroll >= elemTop[2] && scroll < elemTop[3]) {
    $(NavElem[2]).addClass("current");
  } else if (scroll >= elemTop[3] && scroll < elemTop[4]) {
    $(NavElem[3]).addClass("current");
  } else if (scroll >= elemTop[4]) {
    $(NavElem[4]).addClass("current");
  }
}

$("#pc-nav a,#g-nav a").click(function () {
  var elmHash = $(this).attr("href");
  var headerH = $("#header").outerHeight(true);
  var pos = Math.round($(elmHash).offset().top - headerH);
  $("body,html").animate({ scrollTop: pos }, 500);
  return false;
});

/*===========================================================*/
/*クリックしたらナビが下から上に出現*/
/*===========================================================*/

$(".openbtn").click(function () {
  $(this).toggleClass("active");
  $("#g-nav").toggleClass("panelactive");
});

$("#g-nav a").click(function () {
  $(".openbtn").removeClass("active");
  $("#g-nav").removeClass("panelactive");
});

function navWidth() {
  var windowWidth = window.innerWidth;
  if (windowWidth >= 990) {
    $(".openbtn").removeClass("active");
    $("#g-nav").removeClass("panelactive");
  }
}

/*===========================================================*/
/*スクロールをするとエリアの高さに合わせて線が伸びる*/
/*===========================================================*/

$("body").scrollgress({
  height: "5px",
  color: "#2ac0e4",
});

/*===========================================================*/
/*3ページの指定の高さを超えたら右から出現*/
/*===========================================================*/

function PageTopAnime() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {
    $("#page-top").removeClass("RightMove");
    $("#page-top").addClass("LeftMove");
  } else {
    if ($("#page-top").hasClass("LeftMove")) {
      $("#page-top").removeClass("LeftMove");
      $("#page-top").addClass("RightMove");
    }
  }
}

$("#page-top").click(function () {
  $("body,html").animate(
    {
      scrollTop: 0,
    },
    500
  );
  return false;
});

/*===========================================================*/
/*任意の場所をクリックすると隠れていた内容が開き、先に開いていた内容が閉じる*/
/*===========================================================*/
$(".title").on("click", function () {
  $(".box").slideUp(500);

  var findElm = $(this).next(".box");

  if ($(this).hasClass("close")) {
    $(this).removeClass("close");
  } else {
    $(".close").removeClass("close");
    $(this).addClass("close");
    $(findElm).slideDown(500);
  }
});

/*===========================================================*/
/*ニュースティッカー*/
/*===========================================================*/

var slider;
var sliderFlag = false;
var breakpoint = 768;

function sliderSet() {
  var windowWidth = window.innerWidth;
  if (windowWidth >= breakpoint && !sliderFlag) {
    slider = $(".slider").bxSlider({
      mode: "vertical",
      controls: false,
      auto: "true",
      pager: false,
      minSlides: 3,
      moveSlides: 1,
    });
    sliderFlag = true;
  } else if (windowWidth < breakpoint && sliderFlag) {
    slider.destroySlider();
    sliderFlag = false;
  }
}

/*===========================================================*/
/*ふわっ（正面から）（下から）・パタッ（左へ）*/
/*===========================================================*/

function fadeAnime() {
  // ふわっ（正面から）
  $(".bgappearTrigger").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgappear");
    } else {
      $(this).removeClass("bgappear");
    }
  });

  // ふわっ（下から）
  $(".fadeUpTrigger").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeUp");
    } else {
      $(this).removeClass("fadeUp");
    }
  });

  // パタッ（左へ）
  $(".flipLeftTrigger").each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("flipLeft");
    } else {
      $(this).removeClass("flipLeft");
    }
  });
}

/*===========================================================*/
/*フォーム送信後テキスト表示*/
/*===========================================================*/

function showMessage() {
  if ($("form").parsley().isValid()) {
    document.getElementById("form").style.display = "none";
    document.getElementById("thxMessage").style.display = "block";
  }
}

/*===========================================================*/
/* まとめ*/
/*===========================================================*/

$(window).on("resize", function () {
  sliderSet();
  navWidth();
});

$(window).scroll(function () {
  PageTopAnime();
  PositionCheck();
  ScrollAnime();
  fadeAnime();
});

$(window).on("load", function () {
  sliderSet();
  PositionCheck();
  ScrollAnime();
  PageTopAnime();
  fadeAnime();
});
