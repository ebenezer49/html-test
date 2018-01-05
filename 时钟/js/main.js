window.onload = function() {
    var dynamicStyle = document.getElementById('dynamic');
    timeInit();

    /**
     * 通过当前系统时间初始化时间
     */
    function timeInit() {
        var template = `
            @keyframes {funName} {
                from {
                    transform: rotate({fromAngle}deg);
                }
                to {
                    transform: rotate({toAngle}deg);
                }
            }
        `
        var time = new Date();
        var hAngle = (time.getHours() % 12) / 12.0 * 360;
        var mAngle = time.getMinutes() / 60.0 * 360;
        var sAngle = time.getSeconds() / 60.0 * 360;

        dynamicStyle.innerHTML = template.format({
            funName: 'hourHandRun',
            fromAngle: hAngle,
            toAngle: 360 + hAngle
        }) + template.format({
            funName: 'minuteHandRun',
            fromAngle: mAngle,
            toAngle: 360 + mAngle
        }) + template.format({
            funName: 'secondHandRun',
            fromAngle: sAngle,
            toAngle: 360 + sAngle
        });
    }

}

loadJs();

/**
 * 引用js
 */
function loadJs() {
    document.write('<script type="text/javascript" src="js/lang.js"></script>');
}
