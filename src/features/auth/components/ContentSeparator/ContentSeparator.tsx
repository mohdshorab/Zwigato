import { StyleSheet, Text, View } from 'react-native';
import { hs, ms } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';

type props = {
  text: string;
};

const ContentSeparator = ({ text }: props) => {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.straightLineView} />
      <Text style={styles.separatorText}>{text}</Text>
      <View style={styles.straightLineView} />
    </View>
  );
};

const styles = StyleSheet.create({
  separatorContainer: { flexDirection: 'row', alignItems: 'center' },
  straightLineView: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.ui.border,
    height: 1,
  },
  separatorText: {
    fontWeight: '200',
    fontSize: ms(15),
    textAlign: 'center',
    marginHorizontal: hs(10),
  },
});

export default ContentSeparator;
