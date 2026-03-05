import { Modal, ScrollView, Text, View } from 'react-native';
import COLORS from '../../utils/constants/Colors';
import CustomIonicIcon from '../CustomIonicIcon/CustomIonicIcon';
import QuickImage from '../QuickImage/QuickImage';
import {
  AddOnOption,
  CustomizationOption,
  MenuItem,
} from '../../types/restaurant';
import AppButton from '../AppButton/AppButton';
import styles from './MenuItemModal.styles';
import { useCallback, useMemo, useState } from 'react';
import useCounter from '../../hooks/useCounter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../features/cart/slices/CartSlice';

interface MenuItemModalProps {
  showModal: boolean;
  infoToShow: MenuItem | null;
  onClose: () => void;
}

interface CustomizationProps {
  item: CustomizationOption | AddOnOption;
  type: 'CustomizationOption' | 'AddOnOption';
}

interface SelectedAddons {
  name: string;
  price: number;
}

interface FingerPrintProps {
  itemId: string;
  selectedAddons: SelectedAddons[];
}

const MenuItemModal = ({
  showModal,
  infoToShow,
  onClose,
}: MenuItemModalProps) => {
  const { count, increment, decrement } = useCounter(1);
  const dispatch = useAppDispatch();
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [selectedCustom, setSelectedCustom] = useState<CustomizationOption[]>(
    [],
  );

  const { status, cart } = useAppSelector(state => state.cart);

  const allSelectedItems = useMemo(
    () => [...selectedAddOns, ...selectedCustom],
    [selectedAddOns, selectedCustom],
  );

  const isItemSelected = useCallback(
    (name: string) => {
      return allSelectedItems.some(i => i.name === name);
    },
    [allSelectedItems],
  );

  const totalPrice = useMemo(() => {
    return (
      infoToShow &&
      infoToShow?.price +
        allSelectedItems.reduce((acc, i) => {
          const total = (acc += i.price);
          return total;
        }, 0)
    );
  }, [allSelectedItems, infoToShow]);

  const generateFingerprint = ({
    itemId,
    selectedAddons,
  }: FingerPrintProps) => {
    const sorted = [...selectedAddons]
      .map(addon => addon.name)
      .sort()
      .join('|');

    return sorted.length > 0 ? `${itemId}__${sorted}` : `${itemId}__plain`;
  };

  const currentFingerprint = useMemo(
    () =>
      generateFingerprint({
        itemId: infoToShow?.id ?? '',
        selectedAddons: allSelectedItems,
      }),
    [allSelectedItems, infoToShow?.id],
  );

  const matchingCartItem = useMemo(
    () => cart.find(c => c.cartItemId === currentFingerprint),
    [cart, currentFingerprint],
  );

  if (!infoToShow) return null;

  const addItemToCart = () => {
    const cartItemId = generateFingerprint({
      itemId: infoToShow.id,
      selectedAddons: allSelectedItems,
    });
    const finalOrder = {
      cartItemId: cartItemId,
      id: infoToShow.id,
      name: infoToShow.name,
      basePrice: infoToShow.price,
      image: infoToShow.image,
      selectedItems: [...allSelectedItems],
      quantity: count,
      itemTotal: totalPrice ?? 0,
    };
    dispatch(addToCart(finalOrder));
    onClose();
  };

  const OnPressCustomization = ({ item, type }: CustomizationProps) => {
    if (type === 'CustomizationOption')
      setSelectedCustom(prev => {
        const isAlreadySelected = prev.find(i => i.name === item.name);
        if (isAlreadySelected) {
          return prev.filter(i => i.name !== item.name);
        }
        return [...prev, { ...item, type: type }];
      });
    if (type === 'AddOnOption')
      setSelectedAddOns(prev => {
        const isAlreadySelected = prev.find(i => i.name === item.name);
        if (isAlreadySelected) {
          return prev.filter(i => i.name !== item.name);
        }
        return [...prev, { ...item, type: type }];
      });
  };

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
                        name={
                          !isItemSelected(item.name)
                            ? 'square-outline'
                            : 'checkbox-outline'
                        }
                        size={30}
                        onPress={() =>
                          OnPressCustomization({
                            type: 'CustomizationOption',
                            item: item,
                          })
                        }
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
                        name={
                          !isItemSelected(item.name)
                            ? 'square-outline'
                            : 'checkbox-outline'
                        }
                        size={30}
                        onPress={() =>
                          OnPressCustomization({
                            type: 'AddOnOption',
                            item: item,
                          })
                        }
                      />
                    </View>
                  );
                })}
              </View>
            ) : null}
          </ScrollView>
          <View style={styles.footerContainer}>
            {matchingCartItem ? (
              <View style={styles.quantityContainer}>
                <CustomIonicIcon
                  name="add-outline"
                  size={25}
                  color={COLORS.primary}
                  onPress={increment}
                />
                <Text style={styles.quantityText}>
                  {matchingCartItem.quantity}
                </Text>
                <CustomIonicIcon
                  name="remove-outline"
                  size={25}
                  color={COLORS.primary}
                  onPress={decrement}
                />
              </View>
            ) : (
              <AppButton
                onPress={addItemToCart}
                title={`Add Item  ₹${totalPrice}`}
                textStyle={styles.addButtonText}
                buttonStyle={styles.addButton}
                disable={status === 'loading'}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MenuItemModal;
