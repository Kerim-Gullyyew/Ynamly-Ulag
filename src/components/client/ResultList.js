import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import Result from './Result';
import { useSelector } from 'react-redux';
import PaginationButton from '../ui/PaginationButton';
import AnimationHeader from '../ui/AnimationHeader';
import { useNavigation } from '@react-navigation/native';
import OtherResult from './OtherResult';
import ResultListOther from './ResultListOther';

const ResultList = ({ route }) => {
  const selectedForm = route.params.selectedForm;
  const link = route.params.link;
  const { next } = useSelector(state => state.trip.data);
  const { previous } = useSelector(state => state.trip.data);
  const { results } = useSelector(state => state.trip.data);
  const { count } = useSelector(state => state.trip.data);
  const result = useSelector(state => state?.trip?.data?.results[0]);
  const region1 = result?.from_location?.region;
  const region2 = result?.to_location?.region;
  const title1 = result?.from_location?.title;
  const title2 = result?.to_location?.title;
  const navigation = useNavigation();
  function onPressHandler() {
    if (selectedForm === 1) {
      navigation.navigate('ClientForm1');
    } else {
      navigation.navigate('ClientForm2');
    }
  }
  return (
    <>
      <SafeAreaView style={styles.body}>
        {results.length > 0 && (
          <AnimationHeader
            region={region1}
            region2={region2}
            title={title1}
            title2={title2}
          />
        )}
        {results.length === 0 && (
          <>
            <View style={styles.noresult}>
              <Text style={styles.noresulttext}>Bu ugra gatnaw ýok</Text>
              <Pressable onPress={() => onPressHandler()} style={styles.nobutton}>
                <Text style={styles.nobuttontext}>Ugry uytgetmek</Text>
              </Pressable>
            </View>
          </>
        )}
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
            <PaginationButton />
            {
              !next && selectedForm === 2 && (
                <OtherResult link={link} />
              )
            }
            {
              selectedForm === 2 && (
                <ResultListOther region1={region1} region2={region2} />
              )
            }
          </>)}
        />
      </SafeAreaView>

    </>
  );
};
export default ResultList;
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
