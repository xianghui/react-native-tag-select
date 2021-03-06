# react-native-tag-select

A simple tag component to act as radio button / checkbox (minor enhancement to the original react-native-tag-select npm package)

## Features

- Max itens selected
- Plain simple and flexible API
- Listeners for actions
- Force select a tag (rather than toggle the state) (enhancement)
- Define initial selection data (enhancement)

## Demo

You can try on expo: https://expo.io/@rafaelmotta021/react-native-tag-select-demo

or just check the image bellow:

<p align="center">
<img src="https://raw.githubusercontent.com/rafaelmotta/react-native-tag-select/master/example.gif" height="550" />
</p>

## Setup

`npm install --save https://github.com/xianghui/react-native-tag-select.git`

## Usage

```javascript
import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
} from 'react-native';

import { TagSelect } from 'react-native-tag-select';

export default class App extends React.Component {
  render() {
    const data = [
      { id: 1, label: 'Money' },
      { id: 2, label: 'Credit card' },
      { id: 3, label: 'Debit card' },
      { id: 4, label: 'Online payment' },
      { id: 5, label: 'Bitcoin' },
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.labelText}>Payment:</Text>
        <TagSelect
          data={data}
          max={3}
          ref={(tag) => {
            this.tag = tag;
          }}
          onMaxError={() => {
            Alert.alert('Ops', 'Max reached');
          }}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.buttonInner}>
            <Button
              title="Get selected count"
              style={styles.button}
              onPress={() => {
                Alert.alert('Selected count', `Total: ${this.tag.totalSelected}`);
              }}
            />
          </View>
          <View>
            <Button
              title="Get selected"
              onPress={() => {
                Alert.alert('Selected items:', JSON.stringify(this.tag.itemsSelected));
              }}
            />
          </View>
        </View>
        <Text style={styles.labelText}>With custom style:</Text>
        <TagSelect
          data={data}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
          itemStyleSelected={styles.itemSelected}
          itemLabelStyleSelected={styles.labelSelected}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 15,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333'
  },
  itemSelected: {
    backgroundColor: '#333',
  },
  labelSelected: {
    color: '#FFF',
  },
});
```

## Available props

| Name | Type| Default | Description |
| --- | --- | --- | --- |
| labelAttr | string | 'label' | Key attribute name to render label text |
| keyAttr | string | 'id' | Key attribute name to render key property to the list  |
| data | array | [] | Data to render |
| max | number | null | Max itens permitted |
| onMaxError | func | null | Callback after user reach max itens |
| onItemPress | func | null | Callback after user press on item |
| onItemLongPress | func | null | Callback after user long press on item (e.g. can be used to trigger a change of color) |
| itemStyle | any | {} | Style of item container |
| itemStyleSelected | any | {} | Style of item container selected |
| itemLabelStyle | any | {} | Style of item label |
| itemLabelStyleSelected | any | {} | Style of item label selected |
| selectedData | array | [] | Data to do initial selection (format is similar to data) |
| colors | any | {} | color associative array with label to color mapping tag with the some_tag label will be having color_value background color (e.g. { 'some_tag' : color_value}) |


# Methods
To access tag select methods you must get the ref property first.


- Get the number of itens selected. Returns a boolean.
```javascript
this.ref.totalSelected
```


- Get itens selected. Returns an array.
```javascript
this.ref.itemsSelected
```


- "Force" Select a tag (select a tag regardless whether it was previously selected)
```javascrip
//format of item is similar to a single item in the data props
this.ref.forceSelectItem(item)
```