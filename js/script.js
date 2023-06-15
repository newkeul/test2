/* header */
var btn = document.querySelector(".btn-gnb");
var gnb = document.getElementById("gnb");
var body = document.querySelector("html");

btn.addEventListener("click", function () {
  gnb.classList.toggle("on");
  if (gnb.classList.contains("on")) {
    disableScroll();
  } else {
    enableScroll();
  }
});

var gnbItems = document.querySelectorAll(".header.mobile .gnb_list-item>a");
gnbItems.forEach(function (item, idx) {
  item.addEventListener("click", function (event) {
    event.preventDefault();

    // 나머지 .gnb_list-item에서 active 클래스를 제거
    if (event.target.parentElement.classList.contains("active")) {
      console.log(event.target.parentElement);
      event.target.parentElement.classList.remove("active");
    } else {
      gnbItems.forEach(function (item) {
        item.parentElement.classList.remove("active");
      });
      console.log(event.target.parentElement);
      event.target.parentElement.classList.add("active");
    }
  });
});
// 스크롤 막는 함수
function disableScroll() {
  // 현재 스크롤 위치 저장
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // 스크롤 위치 고정 및 스크롤 막기
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}
// 미디어 쿼리 변경시 스크롤 허용
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    enableScroll();
    gnb.classList.remove("on");
  }
});
// // 스크롤 허용 함수
function enableScroll() {
  window.onscroll = null;
}
/* flow banner */
$(window).on("load", function () {
  setFlowBanner();
});

function setFlowBanner() {
  const $wrap = $(".flow_banner");
  const $list = $(".flow_banner .list");
  let wrapWidth = $wrap.width();
  let listWidth = $list.width();
  const speed = 40; //픽셀 이동

  //리스트 복제
  let $clone = $list.clone();
  $wrap.append($clone);
  flowBannerAct();

  //배너 실행 함수
  function flowBannerAct() {
    //무한 반복을 위해 리스트를 복제 후 배너에 추가
    if (listWidth < wrapWidth) {
      const listCount = Math.ceil((wrapWidth * 2) / listWidth);
      for (let i = 2; i < listCount; i++) {
        $clone = $clone.clone();
        $wrap.append($clone);
      }
    }
    $wrap
      .find(".list")
      .css({ animation: `${listWidth / speed}s linear infinite flowRolling` });
  }
}
