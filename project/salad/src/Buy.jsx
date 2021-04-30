const Buy = ({price, onBack}) => {
  return (
    <div>
    <h3> Thanks for your order! </h3>
    <p> Your order total is ${price} </p>
    <button onClick={onBack}> Continue Shopping</button>
    </div>
  )
}

export default Buy;
