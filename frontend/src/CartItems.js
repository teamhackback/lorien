import locations from './Locations';

class Cart {
  constructor() {
    this.keys = Object.keys(this).filter(key => {
      return typeof this[key] !== "function";
    });
    //this.load();
    console.log(this);
    setInterval(() => {
      this.serialize();
    }, 500);
  }
  globalCategory = "tree"; // "beehive", "tree", "carbon"
  beehive = {
    size: "small"
  };
  tree = {
    selectedType: "pine"
  };
  carbon = {
    nrOfTrees: null
  };
  premiumService = [
    {
      title: "Foo",
    },
    {
      title: "Bar",
    }
  ];

  load = () => {
    this.keys.forEach(key => {
      this[key] = JSON.parse(localStorage.getItem(`cart.${key}`));
    });
    if (localStorage.getItem(`cart.locations`) && localStorage.getItem(`cart.locations`).length > 100) {
      locations.length = 0;
      locations.push.apply(locations, JSON.parse(localStorage.getItem(`cart.locations`)));
    }
  }

  serialize = () => {
    this.keys.forEach(key => {
        localStorage.setItem(`cart.${key}`, JSON.stringify(this[key]));
    });
    localStorage.setItem(`cart.locations`, JSON.stringify(locations));
  }
}

export default new Cart();
