import {StyleSheet,Platform} from 'react-native';
import {SCREEN_SIZE} from '../../constants/screenSize';

 

const styles = (color, index) => { 
  const isIOS = Platform.OS =='ios' ? true : false

  return StyleSheet.create({
    container: {
      flex: 1,
      top :  isIOS ? 0 : - SCREEN_SIZE.WIDTH / 7
    },
    headerSpace: {
      height: SCREEN_SIZE.HEIGHT * 0.15,
      // backgroundColor: 'green',
    },
    header: {
      backgroundColor: '#deaa1b',
      width: '100%',
      position: 'absolute',
    },
    viewIconContainer: {
      width: SCREEN_SIZE.WIDTH / 7,
      backgroundColor: color,
      height: SCREEN_SIZE.WIDTH / 7,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: (index * SCREEN_SIZE.WIDTH) / 7,
    },
    viewIconContainer1: {
      width: (SCREEN_SIZE.WIDTH / 7) * 1.5,
      backgroundColor: color,
      height: (SCREEN_SIZE.WIDTH / 7) * 1.5,
      justifyContent: 'center',
      alignItems: 'center',
      //position: 'absolute',
      left: (index * SCREEN_SIZE.WIDTH) / 7,
    },
    smallIcon: {
      width: 16,
      height: 16,
    },
    iconSearch: {
      width: 16,
      height: 16,
    },
    mediumIcon: {
      width: 24,
      height: 24,
    },
    largeIcon: {
      height: 32,
      width: 32,
    },
    bellIcon: {
      width: 24,
      height: 24,
      position: 'absolute',
      right: 16,
    },
    header1: {
      flexDirection: 'row',

      position: 'absolute',
      top: SCREEN_SIZE.WIDTH / 7,
    },
    searchView: {
      left: (2 * SCREEN_SIZE.WIDTH) / 7,
      justifyContent: 'center',
      position: 'absolute',
    },
    nameIconView: {
      justifyContent: 'center',
      alignItems: 'center',
      //width: (SCREEN_SIZE.WIDTH / 7) * 1.5,
      height: 20,
    },
    searchContainer: {
      flexDirection: 'row',

      borderRadius: 20,
      backgroundColor: 'white',
      height: 36,
      width: (SCREEN_SIZE.WIDTH / 7) * 4,
      // position: 'absolute',
      paddingHorizontal: 5,
      paddingVertical: 5,
      alignItems: 'center',
      //position: 'absolute',
    },
    searchInput: {
      height: 50,
      marginLeft: SCREEN_SIZE.WIDTH / 10,
    },
    body: {
      flexDirection: 'row',
      height: (SCREEN_SIZE.WIDTH / 7) * 1.5,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: (SCREEN_SIZE.WIDTH * 2) / 7,
      width: (SCREEN_SIZE.WIDTH / 7) * 4 * 1.5,
      alignSelf: 'center',
      // backgroundColor: 'pink',
    },
    bodyItem: {
      alignItems: 'center',
    },
    footer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 20,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'space-around',
      paddingVertical: 8,
      borderRadius: 5,
    },
    contentScrollView: {
      height: 2000,
    },
    spaceScrollView: {
      height: SCREEN_SIZE.HEIGHT * 0.15,
    },
  });
}
  

export default styles;
