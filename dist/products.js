"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = getProduct;
exports.getProducts = getProducts;
var business_js_1 = require("./business.js");
/**
 * Retrieves a single product from the database based on a business phone number and product name.
 *
 * @param {number} businessPhone - The phone number of the business associated with the product.
 * @param {string} productName - The name of the product to retrieve.
 * @returns {(Promise<Product | null>)} A promise that resolves to a Product object or null if an error occurs.
 */
function getProduct(supabase, businessPhone, productName) {
    return __awaiter(this, void 0, void 0, function () {
        var businessId, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, business_js_1.getBusinessIdByPhoneNumber)(supabase, String(businessPhone))];
                case 1:
                    businessId = _b.sent();
                    return [4 /*yield*/, supabase
                            .from("products")
                            .select("*")
                            .eq("business_id", businessId)
                            .ilike("name", "".concat(productName, "%"))
                            .single()];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        console.error('getProduct', error);
                    console.log(data);
                    return [2 /*return*/, data];
            }
        });
    });
}
/**
* Retrieves products from the database based on a business phone number.
*
* @param {number} businessPhone - The phone number of the business associated with the products.
* @returns {(Promise<Product[] | null>)} A promise that resolves to an array of Product objects or null if an error occurs.
*/
function getProducts(supabase, businessPhone) {
    return __awaiter(this, void 0, void 0, function () {
        var businessId, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, business_js_1.getBusinessIdByPhoneNumber)(supabase, businessPhone)];
                case 1:
                    businessId = _b.sent();
                    return [4 /*yield*/, supabase
                            .from("products")
                            .select("*")
                            .eq("business_id", businessId)
                            .limit(5)];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        console.error('getProducts', error);
                    return [2 /*return*/, data];
            }
        });
    });
}
