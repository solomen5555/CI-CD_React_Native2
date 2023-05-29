import React, { useRef, useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, ScrollView, Button } from 'react-native';
import styles from './styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedScrollHandler,
  interpolate,
} from 'react-native-reanimated';
import { ICONS } from '../../constants/icons';
import { SCREEN_SIZE } from '../../constants/screenSize';
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics'
import { FlatList } from 'react-native-gesture-handler';

const headerHeight = SCREEN_SIZE.HEIGHT * 0.3;
const headerHeight0225 = SCREEN_SIZE.HEIGHT * 0.225;
const headerHeightScroll = SCREEN_SIZE.HEIGHT * 0.15;
const searchWidth = (SCREEN_SIZE.WIDTH / 7) * 4;
const bodyScrollY = (SCREEN_SIZE.WIDTH / 7) * 2 - SCREEN_SIZE.WIDTH / 42;
const iconSearchX = SCREEN_SIZE.WIDTH / 7;
const bodyXRight = (SCREEN_SIZE.WIDTH * 3) / 14;
const bodyXLeft = SCREEN_SIZE.WIDTH / 14;
const searchHeight = SCREEN_SIZE.WIDTH / 7;
const nameIconWidth = (SCREEN_SIZE.WIDTH / 7) * 1.5;

const spaceScroll = headerHeight - headerHeightScroll;

const inputRange2 = [0, spaceScroll / 2];
const inputRange3 = [-50, 0, spaceScroll / 2];
const inputRange4 = [-50, 0, spaceScroll / 2, spaceScroll];
const inputRange5 = [-50, 0, spaceScroll / 2, spaceScroll, 150];

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);



const listData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

const ITEM_HEIGHT = SCREEN_SIZE.WIDTH * 0.1
const ITEM_WIDTH = SCREEN_SIZE.WIDTH * 0.3
const SCROLL_INDICATOR_WIDTH = 50

const HeaderUtop = () => {
  const animatedValue = useSharedValue(0);
  const scrollViewRef = useRef(null);

  const animatedValue2 = useSharedValue(0);

  const [visibleBarWidth, setVisibleBarWidth] = useState(0)
  const [BarWidth, setBarWidth] = useState(1)

  //--------------------------------------------

  const scrollViewHandler = event => {
    // console.log(
    //   '*********Event********',
    //   event?.nativeEvent?.contentOffset.y,
    //   headerHeight - headerHeightScroll,
    // );
    animatedValue.value = event?.nativeEvent?.contentOffset.y;
  };

  //--------------------------------------------

  const onScrollEndDrag = event => {
    //console.log('***********END************', event.nativeEvent);
    if (event.nativeEvent?.contentOffset.y < 150) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  //--------------------------------------------

  const footerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, inputRange3, [1, 1, 0]);
    const translateY = interpolate(
      animatedValue.value,
      inputRange3,
      [0, 0, -100],
    );
    return {
      opacity: opacity,
      transform: [{ translateY }],
    };
  });

  //--------------------------------------------

  const nameIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, inputRange2, [1, 0]);

    const height = interpolate(
      animatedValue.value,
      inputRange4,
      [20, 20, 0, 0],
    );
    return {
      opacity,
      // width,
      height,
    };
  });

  //--------------------------------------------

  const header = useAnimatedStyle(() => {
    const height = interpolate(animatedValue.value, inputRange5, [
      headerHeight,
      headerHeight,
      headerHeight0225,
      headerHeightScroll,
      headerHeightScroll,
    ]);
    const opacity = interpolate(animatedValue.value, inputRange2, [1, 0]);
    return {
      height,
    };
  });

  //--------------------------------------------

  const nameHCM = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, inputRange2, [1, 0]);

    return {
      opacity,
      left: -SCREEN_SIZE.WIDTH / 21,
    };
  });

  //--------------------------------------------

  const searchView = useAnimatedStyle(() => {
    // const opacity = interpolate(animatedValue.value, [0, 150], [1, 0]);
    const width = interpolate(animatedValue.value, inputRange4, [
      searchWidth,
      searchWidth,
      0,
      0,
    ]);
    const height = interpolate(animatedValue.value, inputRange4, [
      searchHeight,
      searchHeight,
      0,
      0,
    ]);

    return {
      width,
      height,
    };
  });

  //--------------------------------------------

  const searchContainer = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, inputRange2, [1, 0]);
    const width = interpolate(animatedValue.value, inputRange4, [
      searchWidth,
      searchWidth,
      0,
      0,
    ]);
    const height = interpolate(
      animatedValue.value,
      inputRange4,
      [36, 36, 0, 0],
    );
    const paddingHorizontal = interpolate(
      animatedValue.value,
      inputRange4,
      [5, 5, 0, 0],
    );
    const paddingVertical = interpolate(
      animatedValue.value,
      inputRange4,
      [5, 5, 0, 0],
    );
    return {
      width,
      height,
      paddingHorizontal,
      paddingVertical,
    };
  });

  //--------------------------------------------

  const iconSmallToBig = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedValue.value,
      inputRange4,
      [1, 1, 1.5, 1.5],
    );
    return {
      transform: [{ scale }],
    };
  });

  //--------------------------------------------

  const iconSearch = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.value, inputRange4, [
      2 / 3,
      2 / 3,
      1,
      1,
    ]);
    const translateX = interpolate(animatedValue.value, inputRange4, [
      0,
      0,
      -iconSearchX,
      -iconSearchX,
    ]);

    return {
      transform: [{ scale }, { translateX }],
    };
  });

  //--------------------------------------------

  const bodyStyle = useAnimatedStyle(() => {
    const scale = interpolate(animatedValue.value, inputRange4, [
      1,
      1,
      2 / 3,
      2 / 3,
    ]);

    const translateX = interpolate(animatedValue.value, inputRange5, [
      0,
      0,
      bodyXRight,
      bodyXLeft,
      bodyXLeft,
    ]);

    const translateY = interpolate(animatedValue.value, inputRange4, [
      0,
      0,
      -bodyScrollY,
      -bodyScrollY,
    ]);

    return {
      transform: [{ translateX }, { scale }, { translateY }],
    };
  });

  //--------------------------------------------

  const checkPreviousSession = useCallback(async () => {
    const didCrash = await Crashes.hasCrashedInLastSession();

    if (didCrash) {
      const report = await Crashes.lastSessionCrashReport();
      alert("Xin lỗi về việc ứng dụng bị hỏng, chúng tôi đang cố gắng khắc phục !")
    }

  }, [])

  const [placeHolder, setPlaceHolder] = useState(['Sao chép tin nhắn', 'Ứng dụng tiện ích', 'Chúa tể animation'])
  const [indexPlaceHolder, setIndexPlaceHolder] = useState(0)
  const [indexContentPlaceHolder, setIndexContentPlaceHolder] = useState(0)



  const changeIndex = () => {
    let i = 0
    let isOx = true
    let indextemp = 0

    setInterval(() => {
      if (i == placeHolder?.[indexContentPlaceHolder]?.length) {
        setTimeout(() => {
          isOx = false
        }, 500)
      }

      if (i == -1) {

        console.log('*************', indextemp)
        if (indextemp + 1 < placeHolder?.length) {
          indextemp++

        } else {
          indextemp = 0
        }

        setIndexContentPlaceHolder(indextemp)
        isOx = true

      }

      if (isOx) {
        if (i < placeHolder?.[indexContentPlaceHolder]?.length)
          i++

      }
      else {
        if (i >= 0)
          i--
      }
      setIndexPlaceHolder(i)
    }, 80)




  }

  useEffect(() => {
    checkPreviousSession()
    changeIndex()

  }, [])


  const scrollViewHandler2 = event => {
    console.log(
      '*********Event********',
      event?.nativeEvent?.contentOffset.x

    );
    animatedValue2.value = event?.nativeEvent?.contentOffset.x;
  };

  const scrollIndicatorStyle = useAnimatedStyle(() => {

    const translateX = interpolate(animatedValue2.value, [0, listData?.length * ITEM_WIDTH], [0, SCROLL_INDICATOR_WIDTH]);

    const borderLeft = interpolate(animatedValue2.value, [0, 50, (listData?.length * ITEM_WIDTH) - 50, listData?.length * ITEM_WIDTH], [20, 0, 0, 20]);
    const borderRight = interpolate(animatedValue2.value, [0, 50, (listData?.length * ITEM_WIDTH) / 2, (listData?.length * ITEM_WIDTH) - 50, listData?.length * ITEM_WIDTH], [0, 0, 0, 10, 20]);


    return {
      borderBottomLeftRadius: borderLeft,
      borderTopLeftRadius: borderLeft,
      borderBottomRightRadius: borderRight,
      borderTopRightRadius: borderRight,
      transform: [{ translateX }]
    }
  });





  const renderItem = ({ item, index }) => {
    let rgb = `rgb(${index * 10},${index * 20},${index * 10})`
    return (
      <View style={{ height: ITEM_HEIGHT, width: ITEM_WIDTH, backgroundColor: rgb }} />
    )
  }

  const renderShowScrollIndicator = (size = 1, width = 50, height = 10, container_width = SCREEN_SIZE.WIDTH) => {

    let item_W = (visibleBarWidth / (BarWidth)) * width;

    return (
      <View style={{
        width: width, height: height, backgroundColor: 'red', marginVertical: 5, borderRadius: height,
        alignSelf: 'center'
      }} >
        <Animated.View style={[{
          position: 'absolute', width: item_W, backgroundColor: 'blue', height: height,
        }, scrollIndicatorStyle]} />
      </View>
    )

  }


  return (
    <View style={styles().container}>
      <View style={styles().headerSpace} />

      {/* ---------------------------- */}

      <AnimatedSafeAreaView style={[styles().header, header]}>
        <View style={styles().header1}>
          <Animated.View style={styles('', 0).viewIconContainer}>
            <Animated.Image
              style={[styles().smallIcon, iconSmallToBig]}
              source={ICONS.LOCATION}
              resizeMode="contain"
            />
          </Animated.View>

          {/* ---------------------------- */}

          <Animated.View style={styles('', 1).viewIconContainer}>
            <Animated.Text style={nameHCM}>TP.HCM</Animated.Text>
          </Animated.View>

          <Animated.View style={[styles().searchView, searchView]}>
            <Animated.View
              style={[styles('', 2).searchContainer, searchContainer]}>
              <AnimatedTextInput
                style={[styles().searchInput]}
                placeholder={indexPlaceHolder >= 0 ? placeHolder[indexContentPlaceHolder]?.slice(0, indexPlaceHolder) : ''}
                placeholderTextColor='black'
              />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles('', 2).viewIconContainer, iconSearch]}>
            <Animated.Image
              style={[styles().smallIcon]}
              source={ICONS.SEARCH}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={styles('', 6).viewIconContainer}>
            <Animated.Image
              style={styles().bellIcon}
              source={ICONS.BELL}
              resizeMode="contain"
            />
          </Animated.View>
        </View>

        {/* //-------------------------------------------- */}

        <Animated.View style={[styles().body, bodyStyle]}>
          <View style={styles('', 0).viewIconContainer1}>
            <Animated.Image
              style={[styles().largeIcon]}
              source={ICONS.WALLET}
              resizeMode="contain"
            />
            <Animated.Text style={[styles().nameIconView, nameIconStyle]}>
              Nạp điểm
            </Animated.Text>
          </View>
          <View style={styles('', 0).viewIconContainer1}>
            <Animated.Image
              style={[styles().largeIcon]}
              source={ICONS.PHONE}
              resizeMode="contain"
            />
            <Animated.Text style={[styles().nameIconView, nameIconStyle]}>
              Nạp thẻ ĐT
            </Animated.Text>
          </View>
          <View style={styles('', 0).viewIconContainer1}>
            <Animated.Image
              style={[styles().largeIcon]}
              source={ICONS.MEMBERSHIP}
              resizeMode="contain"
            />
            <Animated.Text style={[styles().nameIconView, nameIconStyle]}>
              Membership
            </Animated.Text>
          </View>
          <View style={styles('', 0).viewIconContainer1}>
            <Animated.Image
              style={[styles().largeIcon]}
              source={ICONS.SCAN}
              resizeMode="contain"
            />
            <Animated.Text style={[styles().nameIconView, nameIconStyle]}>
              Quét QR
            </Animated.Text>
          </View>
        </Animated.View>

        {/* //-------------------------------------------- */}

        <Animated.View style={[styles().footer, footerStyle]}>
          <Text>Điểm Utop của bạn</Text>
          <Text>1000000</Text>
        </Animated.View>
      </AnimatedSafeAreaView>

      {/* //-------------------------------------------- */}

      <ScrollView
        ref={scrollViewRef}
        onScroll={scrollViewHandler}
        onScrollEndDrag={onScrollEndDrag}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}>
        <Animated.View style={styles().spaceScrollView} />
        <View style={[styles().contentScrollView]}>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Text>abc</Text>
          <Button title='Test Crash App' onPress={() => Crashes.generateTestCrash()} />
          <Button title='Analytic track event' onPress={() => Analytics.trackEvent('track_event')} />

          <View style={{}}>
            <FlatList data={listData}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={scrollViewHandler2}
              bounces={false}
              onLayout={({
                nativeEvent: {
                  layout: { width }
                }
              }) => {
                console.log('VisibleScrollBarWidth : ', visibleBarWidth)
                setVisibleBarWidth(width);
              }}
              onContentSizeChange={width => {
                console.log('CompleteScrollBarWidth : ', BarWidth)
                setBarWidth(width);
              }}

            />

            {renderShowScrollIndicator(listData?.length)}
          </View>




        </View>
      </ScrollView>
    </View>
  );
};

export default HeaderUtop;
