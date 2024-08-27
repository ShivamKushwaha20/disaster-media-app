import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import YoutubeIframe from 'react-native-youtube-iframe';

export default function VideoPlayer({route}) {
  const {videoTitle, videoURL, videoDescription, videoDate} = route.params;
  const [playing, usePlaying] = useState<boolean>(false);
  return (
 <View style={styles.container}>
      <View style={styles.videoContainer}>
        <YoutubeIframe
          height={200} 
          play={playing}
          videoId={videoURL}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.title}>{videoTitle}</Text>
          <View style={styles.descriptionContainer}>
            <Text>{}</Text>
            <Text style={styles.description}>{videoDescription}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
  },
  videoContainer: {
    height: 200,
    backgroundColor: "#F1F1F1",
    position: "absolute", // setting the position at flxed
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,  
  },
  contentContainer: {
    paddingTop: 210,  // Add padding equal to video height + some margin
  },
  title: {
    fontSize: 18,
    padding: 10,
  },
  descriptionContainer: {
    backgroundColor: "white",
    padding: 5,
    marginTop: 10,
    borderColor: "black",
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  description:{

  } 
})