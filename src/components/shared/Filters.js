// @flow
import React from 'react';
import type { Element } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import AppText from './Typography';
import { colors } from '../../styles/index';
import type { Filter } from '../../api/types';

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    paddingVertical: 13,
    justifyContent: 'space-evenly',
  },
  current: {
    color: colors.highlightText,
  },
});

export type FiltersProps = {
  onFilterSelect: (id: string) => () => void,
  currentFilter: string,
  allFilters: Array<Filter>,
};

const Filters = ({
  onFilterSelect,
  allFilters,
  currentFilter,
}: FiltersProps): Element<*> => (
  <View style={styles.filters}>
    {allFilters.map(filter => (
      <TouchableOpacity key={filter.id} onPress={onFilterSelect(filter.id)}>
        <AppText style={currentFilter === filter.id ? styles.current : {}}>
          {filter.label}
        </AppText>
      </TouchableOpacity>
    ))}
  </View>
);

// Filters.propTypes = {};
Filters.defaultProps = {};

export default Filters;
