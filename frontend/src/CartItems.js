import locations from './Locations';

class Cart {
  constructor() {
    this.keys = Object.keys(this).filter(key => {
      return typeof this[key] !== "function";
    });
    //this.load();
    console.log(this);
    this.interval = setInterval(this.serialize(), 500);
  }
  globalCategory = null; // null, "beehive", "tree", "carbon"
  beehive = {
    size: "small",
    value: 1
  };
  tree = {
    selectedType: "pine"
  };
  carbon = {
    nrOfTrees: 0,
    sliderValue: 0,
    co2: "5t"
  };
  premiumServices = [
  ];

  load = () => {
    this.keys.forEach(key => {
      this[key] = JSON.parse(localStorage.getItem(`cart.${key}`)) || {};
    });
    if (localStorage.getItem(`cart.locations`) && localStorage.getItem(`cart.locations`).length > 100) {
      locations.length = 0;
      locations.push.apply(locations, JSON.parse(localStorage.getItem(`cart.locations`) || []));
    }
  }

  serialize = () => {
    this.keys.forEach(key => {
        localStorage.setItem(`cart.${key}`, JSON.stringify(this[key]));
    });
    localStorage.setItem(`cart.locations`, JSON.stringify(locations));
  }

  clear = () => {
    clearInterval(this.interval);
    this.keys.forEach(key => {
      localStorage.removeItem(`cart.${key}`);
    });
    locations.forEach(marker => {
      marker.selected = false;
    });
  }
}

export default new Cart();
