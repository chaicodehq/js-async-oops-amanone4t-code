/**
 * 🍱 Mumbai ka Dabbawala Service - ES6 Classes
 *
 * Mumbai ke famous dabbawala system ko ab modern ES6 class mein likho!
 * Har din hazaaron dabbas deliver hote hain aur ek bhi galat nahi jaata.
 * Tumhe DabbaService class banana hai jo customers manage kare, delivery
 * batches banaye, aur daily reports generate kare.
 *
 * Class: DabbaService
 *
 *   constructor(serviceName, area)
 *     - this.serviceName = serviceName
 *     - this.area = area
 *     - this.customers = [] (internal array)
 *     - this._nextId = 1 (auto-increment counter)
 *
 *   addCustomer(name, address, mealPreference)
 *     - mealPreference must be one of: "veg", "nonveg", "jain"
 *     - Agar invalid preference, return null
 *     - Agar name already exists (duplicate), return null
 *     - Creates customer: { id: auto-increment, name, address, mealPreference,
 *       active: true, delivered: false }
 *     - Pushes to this.customers
 *     - Returns the customer object
 *
 *   removeCustomer(name)
 *     - Sets customer's active to false (soft delete)
 *     - Returns true if found and deactivated
 *     - Returns false if not found or already inactive
 *
 *   createDeliveryBatch()
 *     - Returns array of delivery objects for all ACTIVE customers
 *     - Each delivery: { customerId: id, name, address, mealPreference,
 *       batchTime: new Date().toISOString() }
 *     - Resets delivered to false for all active customers before creating batch
 *     - Returns empty array if no active customers
 *
 *   markDelivered(customerId)
 *     - Finds active customer by id, sets delivered to true
 *     - Returns true if found and marked
 *     - Returns false if not found or not active
 *
 *   getDailyReport()
 *     - Returns report object for ACTIVE customers only:
 *       {
 *         totalCustomers: number (active only),
 *         delivered: number (active and delivered === true),
 *         pending: number (active and delivered === false),
 *         mealBreakdown: { veg: count, nonveg: count, jain: count }
 *       }
 *     - mealBreakdown counts active customers only
 *
 *   getCustomer(name)
 *     - Returns customer object by name (including inactive)
 *     - Returns null if not found
 *
 * Rules:
 *   - Use ES6 class syntax (not constructor functions)
 *   - Customer ids auto-increment starting from 1
 *   - No duplicate customer names allowed
 *   - removeCustomer is a soft delete (active: false), not actual removal
 *   - getDailyReport only counts active customers
 *   - mealPreference must be exactly "veg", "nonveg", or "jain"
 *
 * @example
 *   const service = new DabbaService("Raju Dabba", "Dadar");
 *   service.addCustomer("Amit", "Andheri West", "veg");
 *   // => { id: 1, name: "Amit", address: "Andheri West", mealPreference: "veg", active: true, delivered: false }
 *   service.addCustomer("Priya", "Bandra East", "jain");
 *   // => { id: 2, ... }
 *   service.createDeliveryBatch();
 *   // => [{ customerId: 1, name: "Amit", ... }, { customerId: 2, name: "Priya", ... }]
 *   service.markDelivered(1);       // => true
 *   service.getDailyReport();
 *   // => { totalCustomers: 2, delivered: 1, pending: 1, mealBreakdown: { veg: 1, nonveg: 0, jain: 1 } }
 */
export class DabbaService {
  constructor(serviceName, area) {
    // Your code here
    this.serviceName = serviceName;
    this.area = area;
    this.customers = []
    this._nextId = 1
  }

  addCustomer(name, address, mealPreference) {
    // Your code here
    const preference = ["veg", "nonveg", "jain"];
    if(
      !preference.includes(mealPreference)|| 
      this.customers.find((e) => e.name === name)
    )
      return null;
    const customer = {
      id : this._nextId++,
      name,
      address,
      mealPreference,
      active: true,
      delivered: false
    }
    this.customers.push(customer);
    return customer;
  }

  removeCustomer(name) {
    // Your code here
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].name === name){
        if(!this.customers[i].active){
          return false;
        }else{
        this.customers[i].active = false;
        return true;
        }
      }
    }
    return false;
  }

  createDeliveryBatch() {
    // Your code here
    const delivery = [];
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].active){
        this.customers[i].delivered = false;
        const deliveryObj = { 
          customerId: this.customers[i].id,
          name: this.customers[i].name, 
          address: this.customers[i].address, 
          mealPreference: this.customers[i].mealPreference,
          batchTime: new Date().toISOString() 
        }
        delivery.push(deliveryObj);
      }
    }
    return delivery;
  }

  markDelivered(customerId) {
    // Your code here
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].id === customerId && this.customers[i].active){
        this.customers[i].delivered = true;
        return true;
      }
    }
    return false;
  }

  getDailyReport() {
    // Your code here
    let delivered = 0;
    let pending = 0;
    let vegCount = 0, nonvegCount = 0, jainCount = 0;
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].active && this.customers[i].delivered){
        delivered++;
      }else if(this.customers[i].active && !this.customers[i].delivered){
        pending++;
      }
      if(this.customers[i].active){
        if(this.customers[i].mealPreference === "veg"){
          vegCount++;
        }else if(this.customers[i].mealPreference === "nonveg"){
          nonvegCount++;
        }else{
          jainCount++;
        }
      }
    }
    return {
      totalCustomers : delivered + pending,
      delivered,
      pending,
      mealBreakdown : {
        veg: vegCount,
        nonveg: nonvegCount,
        jain: jainCount
      }
    }
  }

  getCustomer(name) {
    // Your code here
    for(let i = 0; i < this.customers.length; i++){
      if(this.customers[i].name === name){
        return this.customers[i];
      }
    }
    return null;
  }
}