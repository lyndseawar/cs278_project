import React, { useState, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { sortByDate, filterByCategory } from "../utils";
import { db, auth } from "../config/firebase.js";
import { collection, doc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";
import PostCard from "../components/PostCard";

export function FeedScreen() {
    const [committedActivities, setCommittedActivities] = useState([]);
    const [filter, setFilter] = useState(null);
    const [sort, setSort] = useState(null);
    const [feedData, setFeedData] = useState([]);
    const userId = auth.currentUser?.uid || "unknown"; //get the current user's ID

    const [sortOrder, setSortOrder] = useState("asc"); //add this state to store the sort order

    const handleCommit = (activityId) => {
        if (!committedActivities.includes(activityId)) {
            setCommittedActivities([...committedActivities, activityId]);
        }
    };

    const handleFilter = (category) => {
        setFilter(category);
    };

    const handleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    useEffect(() => {
        const fetchAndSortData = async () => {
            const feedDataRef = collection(db, "feeddata");
            const activityAttendeesRef = collection(db, "activityAttendees");
            const feedSnapshot = await getDocs(feedDataRef);
            const activitySnapshot = await getDocs(activityAttendeesRef);
            const tempfeedData = feedSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const attendeesData = activitySnapshot.docs.map((doc) => ({
                id: doc.id,
                totalAttendees: Object.keys(doc.data()).length,
            }));

            let mergeData = tempfeedData.map((item) => {
                const attendeesItem = attendeesData.find(
                    (attendeesItem) => attendeesItem.id === item.id
                );
                const totalAttendees = attendeesItem ? attendeesItem.totalAttendees : 0;
                const totalAttendeesNeeded = parseInt(item.totalAttendeesNeeded, 10);
                const ratio = totalAttendees / totalAttendeesNeeded;
                return {
                    ...item,
                    totalAttendees,
                    ratio,
                };
            });
            mergeData.sort((a, b) => {
                if (sortOrder === "asc") {
                    return a.ratio - b.ratio;
                } else {
                    return b.ratio - a.ratio;
                }
            });
            setFeedData(mergeData);
        };
        fetchAndSortData();
    }, [sortOrder]);

    const fetchFeedData = () => {
        const feedDataRef = collection(db, "feeddata");
        const unsub = onSnapshot(feedDataRef, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFeedData(data);
        });
        return () => unsub();
    };

    const handleDeletePost = async (postId) => {
        try {
            const docRef = doc(db, "feeddata", postId);
            await deleteDoc(docRef);
            setFeedData((prevFeedData) => prevFeedData.filter((item) => item.id !== postId));
        } catch (error) {
            console.log("Error deleting document: ", error);
        }
    };
    
    useEffect(() => {
        const unsub = fetchFeedData();
        return () => unsub();
    }, [feedData]); // Include feedData as a dependency here

    let filteredFeed = feedData;
    if (filter) {
        filteredFeed = filteredFeed.filter(
            (item) => item.activityCategory === filter
        );
    }
    if (sort) {
        filteredFeed = sortByDate(filteredFeed, sort);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[styles.horzScrollView, { paddingTop: 15 }]}
                >
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("")}
                        >
                            <Text style={styles.buttonTextStyle}>All</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("sports")}
                        >
                            <Text style={styles.buttonTextStyle}>Sports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("study date")}
                        >
                            <Text style={styles.buttonTextStyle}>Study Date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("food")}
                        >
                            <Text style={styles.buttonTextStyle}>Food</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("arts")}
                        >
                            <Text style={styles.buttonTextStyle}>Arts</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("adventure")}
                        >
                            <Text style={styles.buttonTextStyle}>Adventure</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("games")}
                        >
                            <Text style={styles.buttonTextStyle}>Games</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("volunteering")}
                        >
                            <Text style={styles.buttonTextStyle}>Volunteering</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("fitness")}
                        >
                            <Text style={styles.buttonTextStyle}>Fitness</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("book club")}
                        >
                            <Text style={styles.buttonTextStyle}>Book Club</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => handleFilter("other")}
                        >
                            <Text style={styles.buttonTextStyle}>Other</Text>
                        </TouchableOpacity>
                        {/* Add more filter buttons as needed */}
                    </View>
                </ScrollView>
                <View style={styles.sortContainer}>
                    <TouchableOpacity style={styles.sortStyle} onPress={handleSort}>
                        <Ionicons name="filter-outline" color="white" size={25} />
                    </TouchableOpacity>
                    {/* Add more sort buttons as needed */}
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                {filteredFeed.map((item) => (
                    <PostCard
                        key={item.id}
                        item={item}
                        handleCommit={handleCommit}
                        handleDelete={handleDeletePost} // Pass the handleDeletePost function to the PostCard component
                        userId={userId}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 15,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 55
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    filterContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    sortContainer: {
        // justifyContent: "flex-end",
        // backgroundColor: "transparent",
        // backgroundColor: "yellow"
    },
    buttonStyle: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
        backgroundColor: "#4B0082",
    },
    filteredButtonStyle: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#AC8FC7",
        backgroundColor: "#AC8FC7",
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginHorizontal: 5,
    },
    buttonTextStyle: {
        color: "white",
    },
    sortStyle: {
        borderRadius: 55,
        borderWidth: 1,
        marginHorizontal: 12,
        paddingHorizontal: 4,
        paddingVertical: 3,
        backgroundColor: "#4B0082",
    },
    postCard: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "gray",
    },
    horzScrollView: {
        paddingLeft: 10,
        paddingBottom: 15
    },
});

export default FeedScreen;
