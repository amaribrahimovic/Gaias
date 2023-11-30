import * as Font from "expo-font";
 
const useFonts = async () =>
  await Font.loadAsync({
    'Inter': require('../Inter-Regular.ttf'),
  });

  export default useFonts;