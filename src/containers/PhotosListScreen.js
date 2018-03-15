import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from "react-native";

class PhotosList extends Component {
    render() {
        return (
            <View>
                <Text>List</Text>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Details')}
                >
                    <Text>To single</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

PhotosList.propTypes = {};
PhotosList.defaultProps = {};

export default PhotosList;
