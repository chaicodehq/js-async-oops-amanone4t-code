/**
 * 🥟 Ramu ka Samosa Cart - `this` Keyword Basics
 *
 * Ramu bhai ka samosa cart hai jo alag alag jagah ghoomta hai. Tumhe ek
 * samosa cart ka object banana hai jisme `this` keyword ka sahi use ho.
 * `this` se cart apni properties ko access karta hai — owner, location,
 * menu, aur sales sab `this` ke through milta hai.
 *
 * Function: createSamosaCart(ownerName, location)
 *
 * Returns an object with these properties:
 *   - owner: ownerName
 *   - location: location
 *   - menu: { samosa: 15, jalebi: 20, kachori: 25 }
 *   - sales: [] (empty array)
 *
 * And these methods (sab `this` use karte hain):
 *
 *   - sellItem(itemName, quantity)
 *     Validates ki item this.menu mein hai ya nahi.
 *     Agar hai: push { item: itemName, quantity, total: price * quantity } to this.sales.
 *     Returns total price.
 *     Agar item invalid hai ya quantity <= 0: return -1
 *
 *   - getDailySales()
 *     Returns sum of all totals in this.sales.
 *     Agar koi sale nahi hai, return 0.
 *
 *   - getPopularItem()
 *     Returns item name jiska total quantity sabse zyada hai across all sales.
 *     Agar koi sales nahi hain, return null.
 *
 *   - moveTo(newLocation)
 *     Updates this.location to newLocation.
 *     Returns string: "${this.owner} ka cart ab ${newLocation} pe hai!"
 *
 *   - resetDay()
 *     Clears this.sales array (empty kar do).
 *     Returns string: "${this.owner} ka naya din shuru!"
 *
 * Function: demonstrateThisLoss(cart)
 *   Takes a samosa cart object. Extracts the sellItem method WITHOUT binding
 *   (destructure ya variable mein store karo). Returns the unbound function
 *   reference. Yeh dikhata hai ki `this` context lose ho jata hai jab method
 *   ko object se alag karte ho.
 *
 * Function: fixWithBind(cart)
 *   Takes a samosa cart object. Returns cart.sellItem bound to cart using
 *   Function.prototype.bind(). Ab `this` hamesha cart ko refer karega.
 *
 * Rules:
 *   - sellItem mein itemName case-sensitive hai
 *   - quantity must be a positive number (> 0)
 *   - All methods must use `this` to access object properties
 *   - getDailySales returns 0 for empty sales, not undefined
 *   - getPopularItem returns null for no sales, not undefined
 *
 * @param {string} ownerName - Cart owner ka naam
 * @param {string} location - Cart ki current jagah
 * @returns {object} Samosa cart object with properties and methods
 *
 * @example
 *   const cart = createSamosaCart("Ramu", "Station Road");
 *   cart.sellItem("samosa", 3);    // => 45
 *   cart.sellItem("jalebi", 2);    // => 40
 *   cart.getDailySales();           // => 85
 *   cart.getPopularItem();          // => "samosa"
 *   cart.moveTo("College Gate");    // => "Ramu ka cart ab College Gate pe hai!"
 *   cart.resetDay();                // => "Ramu ka naya din shuru!"
 *
 * @example
 *   const cart = createSamosaCart("Ramu", "Station");
 *   const lostFn = demonstrateThisLoss(cart); // unbound sellItem function
 *   const boundFn = fixWithBind(cart);         // properly bound sellItem
 */
export function createSamosaCart(ownerName, location) {
  // Your code here
  let sales = []
  return {
    owner : ownerName,
    location: location,
    menu: {samosa: 15, jalebi: 20, kachori: 25},
    sales: [],
    sellItem : function(itemName, quantity){
      if(!itemName || quantity <= 0 || !this.menu.hasOwnProperty(itemName)) return -1;
      const itemDetails = {item: itemName, quantity, total: this.menu[itemName] * quantity}
      this.sales.push(itemDetails);
      return this.menu[itemName] * quantity;
    },
    getDailySales : function(){
      if(this.sales.length === 0) return 0;
      return this.sales.reduce((sum, el) => sum += el.total, 0);
    },
    getPopularItem: function() {
      if (this.sales.length === 0) return null;
      
      const itemCount = {}; // yahan collect karo: { samosa: 4, jalebi: 2 }
      
      for (let i = 0; i < this.sales.length; i++) {
        const item = this.sales[i].item;
        const qty  = this.sales[i].quantity;
        
        if (itemCount[item] !== undefined) {
          itemCount[item] += qty;
        } else {
          itemCount[item] = qty
        }
      }
      let maxQty = 0;
      let popularItem = null;
      Object.entries(itemCount).forEach(([key, value]) => {
        if(value > maxQty){
          maxQty = value;
          popularItem = key;
        }
      });
      return popularItem;
    },
    moveTo: function(newLocation){
      this.location = newLocation;
      return `${this.owner} ka cart ab ${newLocation} pe hai!`
    },
    resetDay: function(){
      this.sales = [];
      return `${this.owner} ka naya din shuru!`
    }
  }
}

//  * Function: demonstrateThisLoss(cart)
//  *   Takes a samosa cart object. Extracts the sellItem method WITHOUT binding
//  *   (destructure ya variable mein store karo). Returns the unbound function
//  *   reference. Yeh dikhata hai ki `this` context lose ho jata hai jab method
//  *   ko object se alag karte ho.
//  *
//  * Function: fixWithBind(cart)
//  *   Takes a samosa cart object. Returns cart.sellItem bound to cart using
//  *   Function.prototype.bind(). Ab `this` hamesha cart ko refer karega.

export function demonstrateThisLoss(cart) {
  // Your code here
  const lostFn = cart.sellItem;
  return lostFn;
}

export function fixWithBind(cart) {
  // Your code here
  const boundFn = cart.sellItem.bind(cart);
  return boundFn;
}
