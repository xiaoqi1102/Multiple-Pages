/**
 * Created by yzsoft on 16/7/5.
 */
import {getProduct} from './../../common/product.js'
import 'babel-polyfill';
let productList={
    data:[
        {
            url:'static/img/good01.jpg',
            name:'瓷片 D610022',
            price:'1213',
            specification:'300*300'
        },
        {
            url:'static/img/good01.jpg',
            name:'瓷片 D610022',
            price:'789',
            specification:'400*400'
        }
    ]
};
let productListDom=Handlebars.templates.productListTpl(productList);
$('#productLlistBox').html(productListDom);
console.log(productListDom);


let obj=Object.assign({},{a:12},{b:'你好'});
console.log(obj);
console.log('I am index');
getProduct();