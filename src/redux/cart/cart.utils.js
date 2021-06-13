export const addItemToCart = (cartItems, cartItemToAdd) => {
  const amountOfItemToAdd = cartItemToAdd.quantity ? cartItemToAdd.quantity : 1;

  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + amountOfItemToAdd }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: amountOfItemToAdd }];
};

export const removeItemFromCart = (cartItems, cartItemIdToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemIdToRemove
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemIdToRemove);
  }

  return cartItems.map(
    cartItem =>
      cartItem.id === cartItemIdToRemove
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
