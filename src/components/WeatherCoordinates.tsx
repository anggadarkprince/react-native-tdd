import { StyleSheet, Text, TextInput, View } from "react-native";
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import Button from './Button';
import {Colors} from '../constants';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

type FormValues = {
  latitude: string;
  longitude: string;
};

function WeatherCoordinates() {
  const navigation = useNavigation();

  const form = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const handlingSubmit = form.handleSubmit((values) => {
    navigation.navigate('Weather', values);
  });

  return (
    <View testID={'weather-coordinates'}>
      <View style={styles.inputs}>
        <Controller
          name={'latitude'}
          control={form.control}
          render={({onChange, ...p}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-latitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder={'Lat'}
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.errors.latitude && (
          <Text style={styles.error}>Latitude must be a valid number</Text>
        )}
        <Controller
          name={'longitude'}
          control={form.control}
          render={({onChange, ...p}) => (
            <TextInput
              {...p}
              testID="weather-coordinates-longitude"
              onChangeText={onChange}
              style={styles.input}
              placeholder={'Lng'}
              placeholderTextColor={Colors.GRAY}
            />
          )}
        />
        {form.errors.longitude && (
          <Text style={styles.error}>Longitude must be a valid number</Text>
        )}
      </View>
      <Button label="Find" onPress={handlingSubmit} />
    </View>
  );
}

const defaultValues: FormValues = {
  latitude: '',
  longitude: '',
};

const validationSchema = Yup.object().shape({
  latitude: Yup.number().min(-90).max(90),
  longitude: Yup.number().min(-180).max(180),
});

const styles = StyleSheet.create({
  inputs: {
    flexDirection: 'column',
    marginBottom: 15,
  },
  input: {
    backgroundColor: Colors.TRANSPARENT,
    margin: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: Colors.WHITE,
  },
  error: {
    marginHorizontal: 5,
    color: Colors.ERROR,
  },
});

export default WeatherCoordinates;
