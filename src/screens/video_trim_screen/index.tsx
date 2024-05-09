import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {isValidVideo, showEditor} from 'react-native-video-trim';
import {
  launchImageLibrary,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import {useEffect} from 'react';

export default function VideoTrimScreen() {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.VideoTrim);
    const subscription = eventEmitter.addListener('VideoTrim', event => {
      switch (event.name) {
        case 'onShow': {
          console.log('onShowListener', event);
          break;
        }
        case 'onHide': {
          console.log('onHide', event);
          break;
        }
        case 'onStartTrimming': {
          console.log('onStartTrimming', event);
          break;
        }
        case 'onFinishTrimming': {
          console.log('onFinishTrimming', event);
          break;
        }
        case 'onCancelTrimming': {
          console.log('onCancelTrimming', event);
          break;
        }
        case 'onError': {
          console.log('onError', event);
          break;
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onMediaLoaded = (response: ImagePickerResponse) => {
    console.log('Response', response);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <TouchableOpacity
          onPress={async () => {
            const result = await launchImageLibrary({
              mediaType: 'video',
              assetRepresentationMode: 'current',
            });

            isValidVideo(result.assets![0]?.uri || '').then(res =>
              console.log('isValidVideo:', res),
            );

            showEditor(result.assets![0]?.uri || '', {
              maxDuration: 30,
              cancelButtonText: 'cancel',
              saveButtonText: 'save',
            })
              .then(res => console.log('showEditor result ===> ', res))
              .catch(e => console.log(e, 1111));
          }}
          style={{padding: 10, backgroundColor: 'red'}}>
          <Text style={{color: 'white'}}>Launch Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
