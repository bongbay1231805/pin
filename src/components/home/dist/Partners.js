'use client';
"use strict";
exports.__esModule = true;
exports.Partners = void 0;
var image_1 = require("next/image");
var partners_module_css_1 = require("./partners.module.css");
function Partners() {
    var partners = [
        {
            img: "hyundai.png",
            width: 130,
            height: 77
        },
        {
            img: "decori.png",
            width: 190,
            height: 55
        },
        {
            img: "vietcombank.png",
            width: 190,
            height: 65
        },
        {
            img: "nama.png",
            width: 190,
            height: 77
        },
        {
            img: "hyundai.png",
            width: 130,
            height: 77
        }
    ];
    return (React.createElement("div", { className: 'mb-[5%] 2xl:mb-[96px]' },
        React.createElement("div", { className: "m-auto max-w-[95%] md:max-w-[85%]  2xl:max-w-[1580px]" },
            React.createElement("h2", { className: "text-[33px] 2xl:text-[42px] text-gray-1 font-bold text-center pt-[82px] mb-[51px]" }, "\u0110\u1ED0I T\u00C1C"),
            React.createElement("div", { className: "grid gap-8 items-center " + partners_module_css_1["default"].carouselonlycss },
                React.createElement("div", { className: "" + partners_module_css_1["default"].groupcarousel }, partners.map(function (partner, index) { return (React.createElement("div", { key: index + "c1", className: "flex-1" },
                    React.createElement("div", { className: "h-[52px] 2xl:h-[60px] w-[160px] ml-[20px] mr-[20px] text-center " + partners_module_css_1["default"].cardcarousel },
                        React.createElement(image_1["default"], { src: "/" + partner.img, alt: "Partner logo", width: "" + partner.width, height: "" + partner.height, className: "grayscale-[100%] opacity-75 hover:grayscale-0 hover:opacity-100", style: { objectFit: "contain" } })))); })),
                React.createElement("div", { className: "" + partners_module_css_1["default"].groupcarousel }, partners.map(function (partner, index) { return (React.createElement("div", { key: index + "c2", className: "flex-1" },
                    React.createElement("div", { className: "h-[52px] 2xl:h-[60px] w-[160px] ml-[20px] mr-[20px] text-center " + partners_module_css_1["default"].cardcarousel },
                        React.createElement(image_1["default"], { src: "/" + partner.img, alt: "Partner logo", width: "" + partner.width, height: "" + partner.height, className: "grayscale-[100%] opacity-75 hover:grayscale-0 hover:opacity-100", style: { objectFit: "contain" } })))); }))))));
}
exports.Partners = Partners;
