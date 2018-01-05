var data = data;

loadPhotoItems();
rsort(random([0, data.length]));


// 选择器
function g(selector) {
    var method = selector.substr(0, 1) === '.' ? 'getElementsByClassName' : 'getElementById';
    return document[method](selector.substr(1));
}

// 添加照片元素
function loadPhotoItems() {
    var wrap = g('#wrap');
    var photoTemplate = wrap.innerHTML;
    var controlerTemplate = '<span id="controler_{{index}}" class="{{class}}" onclick="turn(g(\'\#photo_{{index}}\'))">{{index}}</span>'

    var photoItems = [];
    var controlerItems = [];
    for (let i = 0; i < data.length; i ++) {
        var photoHtml = photoTemplate
                        .replace('{{index}}', i)
                        .replace('{{image}}', data[i].image)
                        .replace('{{caption}}', data[i].caption)
                        .replace('{{desc}}', data[i].desc);
        var controlerHtml = controlerTemplate
                        .replace(/{{index}}/g, i)
                        .replace('{{class}}', 'controler-unit');
        photoItems.push(photoHtml);
        controlerItems.push(controlerHtml);
    }

    wrap.innerHTML = photoItems.join('') + '<div class="controler">' + controlerItems.join('') + '</div>';
}

// 获取左右区域的坐标范围
// {
//      left: {
//          x:[-100, 400],
//          y:[-200, 600]
//      },
//      right: {
//          x:[450, 950],
//          y:[-200, 600]
//      },
// }
function getRange() {
    var range = {left: {x:[], y:[]}, right: {x:[], y:[]}};
    var wrap = g('#wrap');
    var photo = g('.photo')[0];

    // 左侧区域
    range.left.x[0] = 0 - photo.clientWidth;
    range.left.x[1] = wrap.clientWidth / 2 - photo.clientWidth;
    range.left.y[0] = 0 - photo.clientHeight;
    range.left.y[1] = wrap.clientHeight;

    // 右侧区域
    range.right.x[0] = wrap.clientWidth / 2;
    range.right.x[1] = wrap.clientWidth + photo.clientWidth;
    range.right.y = range.left.y;

    return range;
}

// 重新排序
function rsort(n) {

    // 为指定photo添加photo-center
    var photoCenter = g('#photo_' + n);
    photoCenter.style.left = '';
    photoCenter.style.top = '';
    photoCenter.style.transform = 'rotate(0deg)';
    photoCenter.classList.add('photo-center');
    g('#controler_' + n).classList.add('controler-curent');

    // 其它photo
    var photoes = g('.photo');
    var controlers = g('.controler-unit')
    var range = getRange();

    // 左区域
    for (let i = 0; i < Math.ceil(photoes.length / 2); i ++) {
        if (i === n) {
            continue;
        }
        photoes[i].style.left = random(range.left.x) + 'px';
        photoes[i].style.top = random(range.left.y) + 'px';
        photoes[i].style.transform = 'rotate(' + random([-120, 120]) + 'deg)';
        photoes[i].classList.remove('photo-center');
        photoes[i].classList.remove('photo-back');
        photoes[i].classList.add('photo-front');
        controlers[i].classList.remove('controler-curent');

    }
    // 右区域
    for (let i = Math.ceil(photoes.length / 2); i < photoes.length; i ++) {
        if (i === n) {
            continue;
        }
        photoes[i].style.left = random(range.right.x) + 'px';
        photoes[i].style.top = random(range.right.y) + 'px';
        photoes[i].style.transform = 'rotate(' + random([-120, 120]) + 'deg)';
        photoes[i].classList.remove('photo-center');
        photoes[i].classList.remove('photo-back');
        photoes[i].classList.add('photo-front');
        controlers[i].classList.remove('controler-curent');
    }
}

// 生成[range[0],range[1]] 随机整数
function random(range) {
    var min = Math.min(range[0], range[1]);
    var max = Math.max(range[0], range[1]);

    var diff = max - min;
    return Math.floor(Math.random() * diff + min);
}


// 照片点击事件
function turn(ele) {
    console.log('sd');
    // 中心图片
    if (ele.classList.contains(['photo-center'])) {
        // 正面
        if (ele.classList.contains(['photo-front'])) {
            ele.classList.remove('photo-front');
            ele.classList.add('photo-back');

        // 反面
        } else {
            ele.classList.remove('photo-back');
            ele.classList.add('photo-front');
        }
    // 边图片
    } else {
        rsort(parseInt(ele.id.slice(6)));
    }
}
