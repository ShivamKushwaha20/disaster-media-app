import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import VideoCard from "../../Components/VideoCard";
import { useNavigation } from "expo-router";

// Define the structure of each video object
interface Video {
  title: string;
  description: string;
  date: string;
  url: string;
  publishDate: string;
  thumbnail: string;
}

// Define the type for the navigation stack parameters
type RootStackParamList = {
  VideoPage: { videosArr: Video[]; disasterSummary: string };
  VideoPlayer: {
    videoTitle: string;
    videoURL: string | null;
    videoDescription: string;
    videoDate: string;
  };
};

// Define the props type for the VideoPage component using NativeStackScreenProps
type Props = NativeStackScreenProps<RootStackParamList, "VideoPage">;

const VideoPage: React.FC<Props> = ({ route, navigation }) => {
  const [playing, setPlaying] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  // Extract the YouTube video ID from the URL
  const getYoutubeVideoID = (url: string): string | null => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  const toggleDescription = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Destructure the route parameters
  const { videosArr, disasterSummary } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.description}>{disasterSummary}</Text>
      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Videos</Text>
      </View>
      <View>
        {videosArr.map((video, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("VideoPlayer", {
                videoTitle: video.title,
                videoURL: getYoutubeVideoID(video.url),
                videoDescription: video.description,
                videoDate: video.publishDate,
              })
            }
          >
            <VideoCard
              key={index}
              title={video.title}
              thumbnail={video.thumbnail}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default VideoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F1F1F1",
  },
  description: {
    backgroundColor: "white",
    padding: 16,
    fontSize: 15,
    borderRadius: 10,
  },
  videoContainer: {
    backgroundColor: "#FF914D",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
  },
  videoTitle: {
    color: "white",
    fontSize: 16,
  },
});
