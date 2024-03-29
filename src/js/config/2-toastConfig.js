// !function (t, n) {
//     var o = t.createElement("style");
//     if (t.getElementsByTagName("head")[0].appendChild(o), o.styleSheet) o.styleSheet.disabled || (o.styleSheet.cssText = n);
//     else try {
//         o.innerHTML = n
//     } catch (i) {
//         o.innerText = n
//     }
// }(document, "\n.ionic_toast {\n  z-index: 9999;\n}\n\n.toast_section {\n  color: #FFF;\n  cursor: default;\n  font-size: 1.1em;\n  display: none;\n  border-radius: 5px;\n  opacity: 1;\n  padding: 10px 30px 10px 10px;\n  margin: 10px;\n  position: fixed;\n  left: 0;\n  right: 0;\n  text-align: center;\n  z-index: 9999;\n  font-weight: bold;\n background-color: rgba(239, 76, 76, 0.75);\n}\n\n.ionic_toast_top {\n  top: 10px;\n}\n\n.ionic_toast_middle {\n  top: 40%;\n}\n\n.ionic_toast_bottom {\n  bottom: 10px;\n}\n\n.ionic_toast_close {\n  border-radius: 2px;\n  color: #CCCCCC;\n  cursor: pointer;\n  display: none;\n  position: absolute;\n  right: 4px;\n  top: 4px;\n  width: 20px;\n  height: 20px;\n}\n\n.toast_close_icon {\n  position: relative;\n  top: 1px;\n}\n\n.ionic_toast_sticky .ionic_toast_close {\n  display: block;\n}\n\n.ionic_toast_close:active {\n\n}");
angular.module("ionic-toast", ["ionic-toast.provider"]);
angular.module("ionic-toast.provider", []).provider("ionicToast",
    function () {
        var t = {
            position: "top",
            showClose: !1,
            theme: "dark",
            timeOut: 4e3
        };
        this.configure = function (n) {
            angular.extend(t, n)
        };
        this.$get = ["$compile", "$document", "$interval", "$rootScope", "$templateCache", "$timeout",
            function (n, o, i, e, s, a) {
                var c = {},
                    l = e.$new(),
                    p = t.timeOut,
                    d = {
                        toastClass: "",
                        toastMessage: "",
                        toastStyle: {
                            display: "none",
                            opacity: 0
                        }
                    },
                    r = {
                        top: "ionic_toast_top",
                        middle: "ionic_toast_middle",
                        bottom: "ionic_toast_bottom"
                    },
                    u = n(s.get("ionic-toast/templates/ionic-toast.html"))(l);
                l.ionicToast = d;
                o.find("body").append(u);
                var _ = function (t, n, o) {
                    l.ionicToast.toastStyle = {
                        display: t,
                        opacity: n
                    };
                    l.ionicToast.toastStyle.opacity = n;
                    o()
                };
                return l.hideToast = function () {
                    _("none", 0,
                        function () {
                        })
                },
                    c.show = function (q, n, o, i, e) {
                        n && (o = o || t.position, e = e || t.timeOut, e > 1e4 && (e = 1e4), angular.extend(l.ionicToast, {
                            toastClass: r[o] + " " + (i ? "ionic_toast_sticky" : "") + " " + (q ? "toast_background_correct" :"toast_background_error"),
                            toastMessage: n
                        }), _("block", 1,
                            function () {
                                i || (p = a(function () {
                                        l.hideToast()
                                    },
                                    e))
                            }))
                    },
                    c.hide = function () {
                        l.hideToast()
                    },
                    c
            }]
    });
angular.module("ionic-toast").run(["$templateCache",
    function (t) {
        var n = '<div class="ionic_toast"><div class="toast_section" ng-class="ionicToast.toastClass" ng-style="ionicToast.toastStyle" ng-click="hideToast()"><span class="ionic_toast_close"><i class="ion-android-close toast_close_icon"></i></span><span ng-bind-html="ionicToast.toastMessage"></span></div></div>';
        t.put("ionic-toast/templates/ionic-toast.html", n)
    }]);