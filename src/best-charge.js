module.exports = function bestCharge(selectedItems) {
  var items = loadAllItems();
  var promotions = loadPromotions();
  var shoppingcar = [];
  var buffer = [];

  //输入的数据包装成购物车对象数组
  for (var i =0;i<selectedItems.length;i++) {
    buffer = selectedItems[i].split('x');
    var obj = {code : buffer[0].trim(),num:buffer[1].trim(),name:"",price:0};
    shoppingcar.push(obj);
  }

  //哪些商品打半价
  var half = [];
  for (var i =0;i<promotions.length;i++) {
    if (promotions[i].type == "指定菜品半价"){
      for(var j = 0;j<promotions[i].items.length;j++){
        half .push(promotions[i].items[j]);
      }
      break;
    }
  }

  var totlemoney =  0;
  var halfprice = 0;
  var zhiding = "";
  //得出购物车中每种商品的单价和和名字,得出总价和半价
  for(var i =0;i<shoppingcar.length;i++) {
    for(var j =0;j<items.length;j++) {
      if(shoppingcar[i].code == items[j].id) {
        shoppingcar[i].name = items[j].name;
        shoppingcar[i].price = items[j].price;
        totlemoney += shoppingcar[i].price * shoppingcar[i].num;
        for (var x =0;x<half.length;x++) {
          if(shoppingcar[i].code == half[x]){
            if (zhiding == ""){
              zhiding = shoppingcar[i].name;
            }else
              zhiding = zhiding+"，"+shoppingcar[i].name;
            halfprice += (shoppingcar[i].price/2) * shoppingcar[i].num;
          }
        }
        break;
      }
    }
  }
  //包装打印
  var anwser = "============= 订餐明细 =============\n";
  for (var i =0;i<shoppingcar.length;i++) {
    anwser = anwser + shoppingcar[i].name + " x " + shoppingcar[i].num +  " = "+shoppingcar[i].num*shoppingcar[i].price+"元\n";
  }
  anwser = anwser +"-----------------------------------\n";
  //判断选择哪种折扣
  if(totlemoney > 30) {
    if ((totlemoney - halfprice) > (totlemoney - 6)) {
      //选择满三十减6
      anwser = anwser + "使用优惠:\n满30减6元，省6元\n-----------------------------------\n总计：" + (totlemoney - 6) + "元" + "\n===================================";
    } else {
      //选择部分半价
      anwser = anwser + "使用优惠:\n指定菜品半价(" + zhiding + ")，省" + halfprice + "元\n-----------------------------------\n总计：" + (totlemoney - halfprice) + "元\n===================================";
    }

  }else if (halfprice > 0){
     anwser = anwser +"使用优惠:\n指定菜品半价("+zhiding+")，省"+halfprice+"元\n-----------------------------------\n总计："+(totlemoney-halfprice)+"元\n===================================";
   }else {
     anwser = anwser + "总计："+totlemoney+"元\n==================================="
   }


  return anwser;
}

function loadPromotions() {
  return [{
    type: '满30减6元'
  }, {
    type: '指定菜品半价',
    items: ['ITEM0001', 'ITEM0022']
  }];
}
function loadAllItems() {
  return [{
    id: 'ITEM0001',
    name: '黄焖鸡',
    price: 18.00
  }, {
    id: 'ITEM0013',
    name: '肉夹馍',
    price: 6.00
  }, {
    id: 'ITEM0022',
    name: '凉皮',
    price: 8.00
  }, {
    id: 'ITEM0030',
    name: '冰锋',
    price: 2.00
  }];
}
