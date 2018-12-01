(function()
{
  var items = [{ name: "cookies", quantity: 10},
               { name: "chocolates", quantity: 15},
               { name: "biscuits", quantity: 20},
               { name: "coffee 3in1 ", quantity: 25},
               { name: "coffee 2in1 ", quantity: 30}];

  var bought_items = [];

  angular.module('shoppingListApp', [])
  .controller("ToBuyController", itemcontroller)
  .controller("AlreadyBoughtController", shoppinglistcontroller)
  .service("ShoppingListCheckOffService",ShoppingListCheckOffService)
  
  itemcontroller.$inject = ['ShoppingListCheckOffService'];
  function itemcontroller(ShoppingListCheckOffService)
  {
    var controller= this;
    //controller.items = items;
    controller.items = ShoppingListCheckOffService.getItems();

    controller.buynow = function(itemindex)
    {
        var buyitem=controller.items[itemindex];
        ShoppingListCheckOffService.addToCart(buyitem.name,buyitem.quantity,itemindex)
    }
  }
  
  //Without inject the service,it is working. But To follow the assignment rule to inject.
  /*function shoppinglistcontroller()
  {
      var controller= this;
      controller.items = bought_items;
  }*/


  shoppinglistcontroller.$inject = ['ShoppingListCheckOffService'];
  function shoppinglistcontroller(ShoppingListCheckOffService)
  {
      var controller= this;
      controller.items = ShoppingListCheckOffService.getCheckOutItems();
  }


  function ShoppingListCheckOffService()
  {
      var service = this;

      service.addToCart = function(item_name, item_quantity, item_index)
      {
         bought_items.push({name: item_name,quantity: item_quantity});
         items.splice(item_index,1);
      }   
      
      service.getItems = function()
      {
          return items;
      }

      service.getCheckOutItems = function()
      {
          return bought_items;
      }
  }

})();