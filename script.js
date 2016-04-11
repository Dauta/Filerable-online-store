/**
 * Created by Irakli Dautashvili on 03/28/16.
 * All of the following code has been developed solely by me.
 * The required task is completed successfully.
 * Libraries used: Knockout.js and jQuery.
 */
$(document).ready(function () {

    function Item(brand, fit, price, imageSrc) {               //constructor function for an object that references the item to display
        this.brand = brand;                                     //assuming we're dealing with cloths - brand of the item
        this.fit = fit;                                         //fit style
        this.price = price;                                        //price
        this.imageSrc = imageSrc;                               //the source string of the image for an item

        if (this.imageSrc == null || this.imageSrc == undefined) {
            this.imageSrc = "item_images/no-thumb.png";                             //if source image not set, use default.
        }

        this.boolDefault = ko.observable(true);                     //the knockout.observables that take the value from filter function.
        this.boolBrand = ko.observable();
        this.boolFit = ko.observable();
        this.boolPrice = ko.observable();
        this.display = ko.observable(true);                         //master boolean which decides whether or not an item qualifies to be displayed
                                                                    //true by default so that items are displayed before filtering
        this.finalBool = function (brand, fit, price) {             //method that sets this.display()

            var counter = 0;
            for (var k = 0; k < arguments.length; k++) {
                if (arguments[k]) {
                    counter++;
                }
            }
                                                        //depending on how many filter inputs we have, the boolean functions are different
            if (counter == 3) {
                if (brand && fit && price) {
                    return (this.boolBrand() && this.boolFit() && this.boolPrice());
                }
            }
            else if (counter == 2) {
                if (!brand) {
                    return (this.boolFit() && this.boolPrice());
                }
                else if (!fit) {
                    return (this.boolBrand() && this.boolPrice());
                }
                else if (!price) {
                    return (this.boolBrand() && this.boolFit());
                }
            }
            else if (counter == 0) {
                return this.boolDefault();
            }
            else {
                return (this.boolBrand() || this.boolFit() || this.boolPrice());
            }
        };
    }

    var StoreViewModel = function () {                  //the view-model constructor function

        this.visibles = ko.observable(0);               //counter for visible items

        this.brandFirst = ko.observable(false);         //boolean observables that are bound to the filter checkboxes.
        this.brandSecond = ko.observable(false);
        this.brandThird = ko.observable(false);
        this.brands = ko.computed(function () {     //computer observable which decides whether or not we have an input in each filter category
            return this.brandFirst() || this.brandSecond() || this.brandThird();
        }, this);

        this.fitSlim = ko.observable(false);
        this.fitLoose = ko.observable(false);
        this.fits = ko.computed(function () {
            return this.fitSlim() || this.fitLoose();
        }, this);

        this.priceLow = ko.observable(false);
        this.priceMed = ko.observable(false);
        this.priceHigh = ko.observable(false);
        this.prices = ko.computed(function () {
            return this.priceHigh() || this.priceMed() || this.priceLow();
        }, this);

        this.items = ko.observableArray();                      //array to store the items for sale

        this.items.push(new Item("first", "slim", 88, "item_images/1.jpg"));        //populating the array with dummy data
        this.items.push(new Item("second", "slim", 17));
        this.items.push(new Item("third", "loose", 34));
        this.items.push(new Item("third", "slim", 105));
        this.items.push(new Item("first", "loose", 100));
        this.items.push(new Item("second", "loose", 60));
        this.items.push(new Item("first", "slim", 98));
        this.items.push(new Item("second", "slim", 38));
        this.items.push(new Item("third", "loose", 172));
        this.items.push(new Item("third", "loose", 102));
        this.items.push(new Item("first", "slim", 80));
        this.items.push(new Item("second", "loose", 50));
        this.items.push(new Item("first", "loose", 42));

        this.visibles(this.items().length);                     //before filtering every item is listed

        this.filter = function (item) {                         //filter function

            if (item.brand === "first")                         //checks if brand goes through filter
                item.boolBrand(this.brandFirst());
            if (item.brand === "second")
                item.boolBrand(this.brandSecond());
            if (item.brand === "third")
                item.boolBrand(this.brandThird());

            if (item.fit === "slim")                            //checks if fit goes through filter
                item.boolFit(this.fitSlim());
            if (item.fit === "loose")
                item.boolFit(this.fitLoose());

            if (item.price <= 50)                               //checks if price goes through filter
                item.boolPrice(this.priceLow());
            if (item.price > 50 && item.price < 100)
                item.boolPrice(this.priceMed());
            if (item.price >= 100)
                item.boolPrice(this.priceHigh());

            item.display(item.finalBool(this.brands(), this.fits(), this.prices()));    //sets the display

        };

        this.filterNow = function () {                      //function bound to the click event of each checkbox

            var tempCount = 0;                              //counts how many are going to be visible
            for (var i = 0; i < this.items().length; i++) {
                this.filter(this.items()[i]);                   //passes every item through filter

                if (this.items()[i].display()) {
                    tempCount++;
                }
            }
            this.visibles(tempCount);
            return true;                                    //for default browser behaviour
        };

    };

    var newViewModel = new StoreViewModel();
    ko.applyBindings(newViewModel);                     //apply bindings

    $(".me").hover(function(){                           //little jquery to make item icons more interactive
        $(this).css({
            transition : 'background-color 0.2s ease-in-out',
            "background-color": "#86D8F2"
        });
    },function(){
        $(this).css({
            transition : 'background-color 0.2s ease-in-out',
            "background-color": "#dfe1e1"
        });
    })
});