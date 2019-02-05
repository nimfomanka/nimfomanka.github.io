window.addEventListener("load", function () {
    var site = document.querySelector("#site");
    var count = 0;
    var prices = null;
    var price = 0;
    var priceRetail = 0;
    var price_keyup_event = function () {
        var test = document.getElementById("priceCalculated");
        if (test) {
            test.parentNode.removeChild(test);
        }
    };
    var price_blur_event = function () {
        if (!document.getElementById("priceCalculated")) {
            console.count();
            price = this.value;
            // Подсчитаем новые цены
            setTimeout(function () {
                price = price.replace(/\s+/, '').replace(',', '.');
                price = parseFloat(price) * 1.2;
                priceRetail = price * 4;
                var _numberFormat = new Intl.NumberFormat('ru-RU', {
                    style: 'decimal',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                // Впишем значения новых цен в наши поля
                prices[1].value = _numberFormat.format(price);
                prices[2].value = _numberFormat.format(priceRetail);
            }, 1)
            // Добавим тестер для того, чтобы многократно не делать наценку
            setTimeout(function () {
                var test = document.createElement('input');
                test.setAttribute("type", "hidden");
                test.setAttribute("id", "priceCalculated");
                site.appendChild(test);
            }, 1)
        }
    };
    if (site) {
        site.addEventListener("DOMSubtreeModified", function () {
            prices = document.querySelectorAll(".gwt-TextBox.double-editor.tutorial-stage-sales-fifth-step");
            if (prices.length) {
                if (!count) {
                    setTimeout(function () {
                        try {
                            price[1].removeEventListener("keyup", price_keyup_event);
                            price[1].removeEventListener("blur", price_blur_event);
                        } catch (er) {}
                        count = 0;
                    }, 1);
                    setTimeout(function () {
                        try {
                            prices[1].addEventListener("keyup", price_keyup_event);
                            prices[1].addEventListener("blur", price_blur_event);
                        } catch (er) {}
                    }, 1);
                }
                count++;
            } else {
                try {
                    price[1].removeEventListener("keyup", price_keyup_event);
                    price[1].removeEventListener("blur", price_blur_event);
                } catch (er) {}
                count = 0;
            }
        }, false);
    }
});