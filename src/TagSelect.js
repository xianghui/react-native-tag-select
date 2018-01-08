import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';

import TagSelectItem from './TagSelectItem';

class TagSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: this.updateSelection(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    const selectedItems = this.updateSelection(nextProps);
    this.setState({
      selectedItems,
    })
  }

  updateSelection(props){
    const selectedItems = {};
    props.selectedData.forEach(item => {
      selectedItems[item[this.props.keyAttr]] = item;
    })

    return selectedItems
  }

  get totalSelected() {
    return Object.keys(this.state.selectedItems).length;
  }

  get itemsSelected() {
    const items = [];

    Object.entries(this.state.selectedItems).forEach(([key]) => {
      items.push(this.state.selectedItems[key]);
    });

    return items;
  }

  forceSelectItem = (item) => {
    const selectedItems = Object.assign(this.state.selectedItems, {});
    const found = this.state.selectedItems[item[this.props.keyAttr]];

    if (!found) {
      if (this.props.max && this.totalSelected >= this.props.max) {
        return this.props.onMaxError();
      }

      selectedItems[item[this.props.keyAttr]] = item;
    }

    this.setState({ selectedItems });
  }

  handleSelectItem = (item) => {
    const selectedItems = Object.assign(this.state.selectedItems, {});
    const found = this.state.selectedItems[item[this.props.keyAttr]];

    if (found) {
      delete selectedItems[item[this.props.keyAttr]];
    } else {
      if (this.props.max && this.totalSelected >= this.props.max) {
        return this.props.onMaxError();
      }

      selectedItems[item[this.props.keyAttr]] = item;
    }

    this.setState({ selectedItems });

    if (this.props.onItemPress) {
      return this.props.onItemPress(item);
    }
  };

  render() {
    return (
      <View style={styles.list}>
        {this.props.data.map((i) => {
          return (
            <TagSelectItem
              {...this.props}
              label={i[this.props.labelAttr]}
              key={i[this.props.keyAttr]}
              onPress={this.handleSelectItem.bind(this, i)}
              selected={this.state.selectedItems[i[this.props.keyAttr]] && true}
            />
          )
        })}
      </View>
    );
  }
}

TagSelect.propTypes = {
  labelAttr: PropTypes.string,
  keyAttr: PropTypes.string,
  data: PropTypes.array,
  max: PropTypes.number,
  onMaxError: PropTypes.func,
  onItemPress: PropTypes.func,
  itemStyle: PropTypes.any,
  itemStyleSelected: PropTypes.any,
  itemLabelStyle: PropTypes.any,
  itemLabelStyleSelected: PropTypes.any,
  selectedData: PropTypes.array,
};

TagSelect.defaultProps = {
  labelAttr: 'label',
  keyAttr: 'id',
  data: [],
  max: null,
  onMaxError: null,
  onItemPress: null,
  itemStyle: {},
  itemStyleSelected: {},
  itemLabelStyle: {},
  itemLabelStyleSelected: {},
  selectedData: [],
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});

export default TagSelect;
