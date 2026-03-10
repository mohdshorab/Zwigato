import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { CommonHeader } from '../../../components';
import styles from './CartScreen.styles';
import {
  CartItem,
  decrementCartItem,
  incrementCartItem,
} from '../slices/CartSlice';
import CustomIonicIcon from '../../../components/CustomIonicIcon/CustomIonicIcon';
import COLORS from '../../../utils/constants/Colors';
import { ms } from '../../../utils/Layout';
import AppButton from '../../../components/AppButton/AppButton';
import { useCallback, useMemo } from 'react';
import { FlashList } from '@shopify/flash-list';

const EmptyCart = () => (
  <View style={styles.emptyContainer}>
    <CustomIonicIcon
      name="cart-outline"
      size={ms(80)}
      color={COLORS.ui.borderGrey}
    />
    <Text style={styles.emptyTitle}>Your cart is empty</Text>
    <Text style={styles.emptySubtitle}>
      Add items from a restaurant to get started
    </Text>
  </View>
);

const CartScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'CartScreen'>) => {
  const dispatch = useAppDispatch();
  const { cart, status } = useAppSelector(state => state.cart);

  const grandTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.itemTotal, 0),
    [cart],
  );

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart],
  );

  const handleIncrement = useCallback(
    (cartItemId: string) => {
      dispatch(incrementCartItem(cartItemId));
    },
    [dispatch],
  );

  const handleDecrement = useCallback(
    (cartItemId: string) => {
      dispatch(decrementCartItem(cartItemId));
    },
    [dispatch],
  );

  const renderCartItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <View style={styles.cartCard}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          {item.selectedItems.length > 0 && (
            <Text style={styles.itemAddons} numberOfLines={2}>
              {item.selectedItems.map(s => s.name).join(', ')}
            </Text>
          )}
          <Text style={styles.itemPrice}>₹{item.itemTotal}</Text>
        </View>
        <View style={styles.quantityControls}>
          <CustomIonicIcon
            name="remove-circle-outline"
            size={ms(28)}
            color={COLORS.primary}
            onPress={() => handleDecrement(item.cartItemId)}
          />
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <CustomIonicIcon
            name="add-circle-outline"
            size={ms(28)}
            color={COLORS.primary}
            onPress={() => handleIncrement(item.cartItemId)}
          />
        </View>
      </View>
    ),
    [handleIncrement, handleDecrement],
  );

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader showBackButton navigation={navigation} title="Your Cart" />

      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <View style={styles.itemCountBanner}>
            <CustomIonicIcon
              name="receipt-outline"
              size={ms(14)}
              color={COLORS.primary}
            />
            <Text style={styles.itemCountText}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </Text>
          </View>

          <FlashList
            data={cart}
            keyExtractor={item => item.cartItemId}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />

          <View style={styles.billContainer}>
            <Text style={styles.billTitle}>Bill Summary</Text>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Item Total</Text>
              <Text style={styles.billValue}>₹{grandTotal}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Fee</Text>
              <Text style={styles.billValueFree}>FREE</Text>
            </View>
            <View style={styles.billDivider} />
            <View style={styles.billRow}>
              <Text style={styles.billTotal}>Grand Total</Text>
              <Text style={styles.billTotalValue}>₹{grandTotal}</Text>
            </View>
          </View>

          <View style={styles.checkoutContainer}>
            <AppButton
              title={`Place Order  ₹${grandTotal}`}
              onPress={() => {}}
              buttonStyle={styles.checkoutButton}
              textStyle={styles.checkoutText}
              disable={status === 'loading'}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
