import { Modal, ScrollView, Text, View } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';
import QuickImage from '../QuickImage/QuickImage';
import { MenuItem } from '../../types/restaurant';
import AppButton from '../AppButton/AppButton';
import styles from './MenuItemModal.styles';

interface MenuItemModalProps {
  showModal: boolean;
  infoToShow: MenuItem | null;
  onClose: () => void;
}

const MenuItemModal = ({
  showModal,
  infoToShow,
  onClose,
}: MenuItemModalProps) => {
  if (!infoToShow) return null;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={showModal}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <CustomIonicIcon
          name="close-outline"
          size={30}
          color={COLORS.common.white}
          onPress={onClose}
          style={styles.closeButton}
        />
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.mainContent}>
              <QuickImage
                source={infoToShow?.image}
                resizeMode="cover"
                style={styles.menuItemImage}
              />
              <View
                style={[
                  styles.vegIndicator,
                  {
                    borderColor: infoToShow.isVeg
                      ? COLORS.common.green
                      : COLORS.common.red,
                  },
                ]}
              >
                <View
                  style={[
                    styles.vegDot,
                    {
                      backgroundColor: infoToShow.isVeg
                        ? COLORS.common.green
                        : COLORS.common.red,
                    },
                  ]}
                />
              </View>
              <View style={styles.headerContainer}>
                <View>
                  <Text style={styles.itemName}>{infoToShow?.name}</Text>
                  <Text style={styles.servesText}>
                    Serves {infoToShow?.serves}
                  </Text>
                </View>
                <View style={styles.actionButtonsContainer}>
                  <CustomIonicIcon
                    name="bookmark-outline"
                    size={18}
                    color={COLORS.ui.borderGrey}
                    style={styles.actionButton}
                    onPress={() => {}}
                  />
                  <CustomIonicIcon
                    name="arrow-redo-outline"
                    size={18}
                    color={COLORS.ui.borderGrey}
                    style={styles.actionButton}
                    onPress={() => {}}
                  />
                </View>
              </View>
              <Text style={styles.itemDesc}>{infoToShow.desc}</Text>
            </View>
            <View style={styles.thickSeparator} />
            {infoToShow?.customization.length > 0 ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Make it as you like</Text>
                <View style={styles.thinSeparator} />
                {infoToShow?.customization.map((item, index) => {
                  return (
                    <View key={index} style={styles.optionRow}>
                      <QuickImage
                        source={infoToShow?.image}
                        resizeMode="cover"
                        style={styles.optionImage}
                      />
                      <Text style={styles.optionName}>{item.name}</Text>
                      <Text style={styles.optionPrice}>₹ {item.price}</Text>
                      <CustomIonicIcon
                        name="square-outline"
                        size={30}
                        onPress={() => {}}
                      />
                    </View>
                  );
                })}
              </View>
            ) : null}
            {infoToShow?.addOns.length > 0 ? (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Need something for side</Text>
                <View style={styles.thinSeparator} />
                {infoToShow?.addOns.map((item, index) => {
                  return (
                    <View key={index} style={styles.optionRow}>
                      <QuickImage
                        source={infoToShow?.image}
                        resizeMode="cover"
                        style={styles.optionImage}
                      />
                      <Text style={styles.optionName}>{item.name}</Text>
                      <Text style={styles.optionPrice}>₹ {item.price}</Text>
                      <CustomIonicIcon
                        name="square-outline"
                        size={30}
                        onPress={() => {}}
                      />
                    </View>
                  );
                })}
              </View>
            ) : null}
          </ScrollView>
          <View style={styles.footerContainer}>
            <View style={styles.quantityContainer}>
              <CustomIonicIcon
                name="add-outline"
                size={25}
                color={COLORS.primary}
                onPress={() => {}}
              />
              <Text style={styles.quantityText}>0</Text>
              <CustomIonicIcon
                name="remove-outline"
                size={25}
                color={COLORS.primary}
                onPress={() => {}}
              />
            </View>
            <AppButton
              onPress={() => {}}
              title="Add item"
              textStyle={styles.addButtonText}
              buttonStyle={styles.addButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MenuItemModal;
