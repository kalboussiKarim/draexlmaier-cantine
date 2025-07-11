const CartItem = ({ name, quantity, price, onPlus, onMinus }) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {price}TND
      </p>
      <p className="cart-item-actions">
        <button onClick={onMinus}>-</button>
        <span>{quantity}</span>
        <button onClick={onPlus}>+</button>
      </p>
    </li>
  );
};
export default CartItem;
