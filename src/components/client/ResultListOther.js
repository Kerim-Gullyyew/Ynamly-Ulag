import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Result from './Result';
import { useSelector } from 'react-redux';
import PaginationButton from '../ui/PaginationButton';
import AnimationHeader from '../ui/AnimationHeader';
import { useNavigation } from '@react-navigation/native';
import OtherResult from './OtherResult';
import PaginationButtonOther from '../ui/PaginationButtonOther';


const ResultListOther = ({ region1, region2 }) => {
  const { next } = useSelector(state => state.trip.data);
  const { previous } = useSelector(state => state.trip.data);
  const { otherdata } = useSelector(state => state?.trip);
  const { results } = useSelector(state => state?.trip?.otherdata);
  const { count } = useSelector(state => state.trip.data);
  // const result = useSelector(state => state.trip.otherdata.data.results[0]);
  // const region1 = result?.from_location?.region;
  // const region2 = result?.to_location?.region;
  // const title1 = result?.from_location?.title;
  // const title2 = result?.to_location?.title;
  const navigation = useNavigation();

  return (
    <>
      {results?.length > 0 && (
        <SafeAreaView style={styles.body}>
          <AnimationHeader
            region={region1}
            region2={region2}
          />

          <FlatList
            data={results}
            renderItem={itemData => {
              return <Result itemData={itemData} />;
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
            alwaysBounceVertical={false}
            ListFooterComponent={() => (<>
              <PaginationButtonOther />
            </>)}
          />
        </SafeAreaView>
      )}
    </>
  )
}

export default ResultListOther

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: Colors.colorBacground2,
  },
  noresult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noresulttext: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.colorDetailText,
  },
  nobutton: {
    backgroundColor: Colors.colorBacground,
    padding: 10,
    marginTop: 15,
    borderRadius: 10,
  },
  nobuttontext: {
    color: 'white',
    fontSize: 18,
  }
});