import * as React from 'react';

import { StyleSheet, View, SafeAreaView } from 'react-native';
import Timetable from 'react-native-timetable';

const events = [
  {
    sections: {
      '--LEC (5034)': {
        _typename: 'CourseSection',
        startTimes: ['11:30', '16:30'],
        endTimes: ['12:15', '18:15'],
        days: ['2', '3'],
        locations: ['Online Teaching', 'Online Teaching'],
        instructors: ['Professor LEE Pak Ching', 'Professor LEE Pak Ching'],
      },
      '-L01-LAB (5035)': {
        typename: 'CourseSection',
        startTimes: ['16:30'],
        endTimes: ['17:15'],
        days: ['2'],
        locations: ['Online Teaching'],
        instructors: ['Professor LEE Pak Ching'],
      },
    },
    courseId: 'AIST3020',
    title: 'Introduction to Computer Systems',
  },
  {
    sections: {
      '--LEC (8756)': {
        typename: 'CourseSection',
        startTimes: ['9:30'],
        endTimes: ['12:15'],
        days: ['1'],
        locations: ['Sino Building LT2'],
        instructors: ['Dr. HAN Man'],
      },
    },
    courseId: 'ARCH1320',
    title: 'Experiencing Architecture',
  },
  {
    sections: {
      'AT01-TUT (4617)': {
        typename: 'CourseSection',
        startTimes: ['12:30'],
        endTimes: ['14:15'],
        days: ['3'],
        locations: ['Online Teaching'],
        instructors: ['Professor Andrej BOGDANOV'],
      },
    },
    courseId: 'ENGG2780',
    title: 'Statistics for Engineers',
  },
  {
    sections: {
      '--LEC (5776)': {
        typename: 'CourseSection',
        startTimes: ['9:30'],
        endTimes: ['11:15'],
        days: ['5'],
        locations: ['Online Teaching'],
        instructors: ['Professor Peter Frederick RHODES'],
      },
      '-T02-TUT (5770)': {
        typename: 'CourseSection',
        startTimes: ['13:30'],
        endTimes: ['14:15'],
        days: ['2'],
        locations: ['Online Teaching'],
        instructors: ['Professor Peter Frederick RHODES'],
      },
      '-T03-TUT (8836)': {
        typename: 'CourseSection',
        startTimes: ['14:30'],
        endTimes: ['15:15'],
        days: ['4'],
        locations: ['Online Teaching'],
        instructors: ['Professor Sandra MARCO COLINO'],
      },
    },
    courseId: 'LAWS2131',
    title: 'Tort I',
  },
  {
    sections: {
      '--LEC (6338)': {
        _typename: 'CourseSection',
        startTimes: ['14:30'],
        endTimes: ['17:15'],
        days: ['2'],
        locations: ['Online Teaching'],
        instructors: ['Dr. KOU Zhihui, \n\rProfessor TSANG Wai Chung'],
      },
    },
    courseId: 'BECE2130',
    title: 'Language and Literacy in the Early Years',
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Timetable events={events} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
