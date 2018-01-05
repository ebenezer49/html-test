// 为 Zepoto 添加 animateCss 方法
;(function($){
  $.extend($.fn, {
    animateCss: function (animationName, callBack) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function () {
        $(this).removeClass('animated ' + animationName);
        if (typeof callBack === 'function') {
          callBack();
        }
      });
      return this;
    }
  });
  
})(Zepto)


window.onload = function () {
  let total = 17;         // 图片总个数
  let colCount = 4;       // 每行显示的图片个数

  let screenWidth = window.screen.width;
  let screenHeight = window.screen.height;

  render();

  // 显示图片列表
  function render() {
    let padding = 2;
    let width = Math.floor((screenWidth - padding * 3) / 4); // 图片宽度
    let height = width;

    // 加载图片列表
    let template = '';
    for (let index = 1; index <= total; index++) {
      let imgSrc = './img/' + index + '.jpg';
      let p = index % colCount === 1 ? 0 : padding;
      template += `
        <li data_id=${index} style="width:${width}px;height:${height}px;padding-left: ${p}px;padding-top: ${padding}px;">
          <canvas id=cvs_${index} class="animated bounceIn" ></canvas>
        </li>`;
      let imgObj = new Image();
      imgObj.index = index;
      imgObj.onload = function() {
        let canvasDom = $(`#cvs_${this.index}`)[0];
        canvasDom.width = width;
        canvasDom.height = height;

        let ctx = canvasDom.getContext('2d');
        ctx.drawImage(imgObj, 0, 0, width, height);
      }
      imgObj.src = imgSrc;
    }
    let container = $('#img-container').html(template);

    // 小图事件
    let curId;      // 当前播放的图片id
    $('#img-container').delegate('li', 'tap', function () {
      let id = curId = $(this).attr('data_id');
      loadLargeImage(id);
    });
  
    // 大图事件
    $('#large-img-container').tap(function () {
      $(this).animateCss('zoomOut', function() {
        // $('#large-img-container').css('display', 'none');
        $('#large-img-container').hide();
      });
    }).swipeLeft(function () {
      if (curId < total) {
        curId ++;
        loadLargeImage(curId, 'bounceInRight');
      }
    }).swipeRight(function () {
      if (curId > 1) {
        curId --;
        loadLargeImage(curId, 'bounceInLeft');
      }
    });
  }

  function loadLargeImage(id, animate) {
    if (!animate) {
      let largImgContainer = $('#large-img-container');
      // largImgContainer.css('display', 'block');
      largImgContainer.show();
      largImgContainer.animateCss('zoomIn');
    }

    let imgSrc = './img/' + id + '.large.jpg';
    let imgObj = new Image();
    imgObj.onload = function() {
      let hScale = this.height / screenHeight;
      let wScale = this.width / screenWidth;
      let width, height;
      let zoomScale;

      if (wScale >= hScale) {
        zoomScale = 1.0 / wScale;
      } else {
        zoomScale = 1.0 / hScale;
      }
      width = Math.min(Math.floor(this.width * zoomScale), screenWidth);
      height = Math.min(Math.floor(this.height * zoomScale), screenHeight);
      // debugger;

      let canvas = $('#cvs_large');
      let canvasDom = canvas[0];
      canvasDom.width = width;
      canvasDom.height = height;
      canvasDom.style.paddingTop = Math.floor((screenHeight - height) / 2) + 'px';
      canvasDom.style.paddingLeft = Math.floor((screenWidth - width) / 2) + 'px';
      let ctx = canvasDom.getContext('2d');
      ctx.drawImage(imgObj, 0, 0, width, height);

      console.log(`width: ${width}, height: ${height}, screenWidth: ${screenWidth},  screenHeight: ${screenHeight} window.screen.height: ${window.screen.height}`)

      if (animate) {
        canvas.animateCss(animate);
      }
    }
    imgObj.src = imgSrc;
  }
  
}