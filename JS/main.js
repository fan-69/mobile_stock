
(function(undefined) {
    "use strict";

    function Q(el) {
        if (typeof el === "string") {
            var els = document.querySelectorAll(el);
            return typeof els === "undefined" ? undefined : els.length > 1 ? els : els[0];
        }
        return el;
    }
    var txt = "innerText" in HTMLElement.prototype ? "innerText" : "textContent";
    var scannerLaser = Q(".scanner-laser"),
        play = Q("#scan"),
        scannedQR = Q("#scanned-QR"),
        zoom = Q("#zoom");
   
    var args = {
        autoBrightnessValue: 100,
        resultFunction: function(res) {
            scannedQR[txt] = res.format + ": " + res.code;
            decoder.pause();
            let d=Object.assign({},res);
            delete d['imgData'];
            if($('#set_reg_0a').is(':checked')){
                d.name=$('#name_product').val();
            }
            Post($('#serv').val(),d);
            location.href='#post_1c'; //history.go(-1);
        },
        getDevicesError: function(error) {
            var p, message = "Error detected with the following parameters:\n";
            for (p in error) {
                message += p + ": " + error[p] + "\n";
            }
            alert(message);
        },
        getUserMediaError: function(error) {
            var p, message = "Error detected with the following parameters:\n";
            for (p in error) {
                message += p + ": " + error[p] + "\n";
            }
            alert(message);
        },
        cameraError: function(error) {
            var p, message = "Error detected with the following parameters:\n";
            if (error.name == "NotSupportedError") {
                var ans = confirm("Your browser does not support getUserMedia via HTTP!\n(see: https:goo.gl/Y0ZkNV).\n You want to see github demo page in a new window?");
                if (ans) {
                    window.open("https://andrastoth.github.io/webcodecamjs/");
                }
            } else {
                for (p in error) {
                    message += p + ": " + error[p] + "\n";
                }
                alert(message);
            }
        },
        cameraSuccess: function() {
            grabImg.classList.remove("disabled");
        }
    };
    var decoder = new WebCodeCamJS("#webcodecam-canvas").buildSelectMenu("#camera-select", "environment|back").init(args);

    play.addEventListener("click", function() {
        if (!decoder.isInitialized()) {
            scannedQR[txt] = "Scanning ...";
        } else {
            scannedQR[txt] = "Scanning ...";
            decoder.play();
        }
    }, false);
    /*grabImg.addEventListener("click", function() {
        if (!decoder.isInitialized()) {
            return;
        }
        var src = decoder.getLastImageSrc();
        scannedImg.setAttribute("src", src);
    }, false);
    pause.addEventListener("click", function(event) {
        scannedQR[txt] = "Paused";
        decoder.pause();
    }, false);
    stop.addEventListener("click", function(event) {
        grabImg.classList.add("disabled");
        scannedQR[txt] = "Stopped";
        decoder.stop();
    }, false);*/
    Page.changeZoom = function(a) {
        if (decoder.isInitialized()) {
            var value=typeof a !=="undefined" ? parseFloat(a) :zoom.value/1;
            decoder.options.zoom = value;
        }
    };

    document.querySelector("#camera-select").addEventListener("change", function() {
        if (decoder.isInitialized()) {
            decoder.stop().play();
        }
    });
}).call(window.Page = window.Page || {});