# \<argon-swipeable-pages\>

![Screen](https://cloud.githubusercontent.com/assets/11378781/16348357/4ebcc948-3a52-11e6-92e7-4e5c6bf49b54.png)

##&lt;argon-swipeable-pages&gt;

`argon-swipeable-pages` displays a virtual, 'infinite' page collection. The template inside
the argon-swipeable-pages element represents the DOM to create for each page item.
The `items` property specifies an array of page item data.

For performance reasons, not every item in the collection of pages is rendered at once;
instead a small subset of actual template elements (3 pages) are rendered as the user turns the page.

### Template model

Page item templates should bind to template models of the following structure:

```js
{
  index: 0,        // index in the item array
  item: {}         // user data corresponding to items[index]
}
```

Alternatively, you can change the property name used as data index by changing the
`indexAs` property. The `as` property defines the name of the variable to add to the binding
scope for the array.

For example, given the following `data` array:

##### data.json

```js
[
  {"name": "Bob", "age": 33},
  {"name": "Tim", "age": 19},
  {"name": "Mike", "age": 77}
]
```

The following code would render the pages (note the name and the age are bound from the model object provided to the template scope):

```html
<template is="dom-bind">
  <iron-ajax url="data.json" last-response="{{data}}" auto></iron-ajax>
  <argon-swipeable-pages items="[[data]]" as="person" index-as="pix">
    <template>
      <p>Name: [[person.name]]</p>
      <p>Age: [[person.age]]</p>
      <p>Index: [[pix]]</p>
    </template>
  </argon-swipeable-pages>
</template>
```

### Usage

#### Example 1

```
    <argon-swipeable-pages page-count"22">
        <template>
            <div>
                <h1>Index: [[index]]</h1>
            </div>
        </template>
    </argon-swipeable-pages>
```

#### Example 2

```
    <argon-swipeable-pages items="{{elements}}">
        <template>
            <div>
                <h2>Index: [[index]]</h2>
                <h3>Element: [[item]]</h3>
            </div>
        </template>
    </argon-swipeable-pages>
```

#### Example 3

```
    <argon-swipeable-pages items="{{elements}}" as="element" index-as="idx">
        <template>
            <div>
                <h1>[[getNumber(idx)]]) [[element]]</h1>
                <h2>Index: [[idx]]</h2>
                <h3>Element: [[element]]</h3>
            </div>
        </template>
    </argon-swipeable-pages>
```