# Filterable-online-store

Single page application simulating a filterable list of available items in an online store. 
Libraries used are Knockout.js for the MVVM and a bit of jQuery for the effects.
This is an implementation of the filter, so there is no easy (view) way of adding new items to the list.
If, for whatever reason you still need to, you can do so by pushin the anonymous object instances into the array of items.
Example: `this.items.push(new Item("first", "slim", 88, "item_images/1.jpg"));`

I will definitely add some functionality in the future.
*more detailed item objects
*more ways to filter
*prettier UI
____

####Screenshots

Unfiltered, displaying every item in the list
![picture alt](https://raw.githubusercontent.com/Dauta/Filterable-online-store/master/screenshots/screenshot1.jpg)

Filtered by fit style
![picture alt](https://raw.githubusercontent.com/Dauta/Filterable-online-store/master/screenshots/screenshot2.jpg)
