import { StyleSheet } from 'react-native';
import { hs, vs, ms } from '../../../../utils/Layout';
import COLORS from '../../../../utils/constants/Colors';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    marginHorizontal: hs(10),
    marginBottom: vs(20),
    borderRadius: hs(20),
    shadowColor: COLORS.common.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  image: {
    alignSelf: 'center',
    height: vs(200),
    width: '100%',
    borderTopLeftRadius: hs(20),
    borderTopRightRadius: hs(20),
  },
  bookmarkContainer: {
    position: 'absolute',
    right: hs(15),
    top: vs(15),
  },
  contentContainer: {
    paddingVertical: vs(10),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hs(10),
  },
  restaurantName: {
    fontSize: ms(20),
    fontWeight: '500',
    color: '#000',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: hs(10),
    paddingVertical: vs(2),
    paddingHorizontal: vs(7),
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  ratingText: {
    fontSize: ms(14),
    color: COLORS.common.white,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    marginHorizontal: hs(10),
    marginTop: vs(8),
    alignItems: 'center',
  },
  infoText: {
    fontSize: ms(12),
    color: COLORS.text.secondary,
  },
  iconMargin: {
    marginRight: hs(5),
  },
  sparkleMargin: {
    marginHorizontal: hs(5),
  },
});
