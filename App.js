import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { GoalItems } from "./components/GoalItems";
import { GoalInputs } from "./components/GoalInputs";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setisAddMode] = useState(false);

  const courseGoalsHandler = enteredGoal => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: enteredGoal }
    ]);
    setisAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  const cancelHandler = () => {
    setisAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add new goal" onPress={() => setisAddMode(true)} />
      <GoalInputs
        isAddMode={isAddMode}
        courseGoalsHandler={courseGoalsHandler}
        cancelHandler={cancelHandler}
      />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItems
            onDelete={removeGoalHandler}
            id={itemData.item.id}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 50 }
});
