import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";

const Checkout = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  const onCurrencyChange = ({ target: { value } }) => {
    setCurrency(value);
    dispatch({
      type: "resetOptions",
      value: {
          ...options,
          currency: value,
      },
    });
  }

  const onCreateOrder = (data,actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "8.99",
          },
        },
      ],
    });
  }

  const onApproveOrder = (data,actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      alert(`Transaction completed by ${name}`);
    });
  }

  return (
    <div className="checkout">
      {isPending ? <p>LOADING...</p> : 
        (
          <>
            <h2 className="mb-0 w-auto">PayPal</h2>
            <label className="mb-0">Please choose your currency:</label>
            <select className="form-select" aria-label="currency" value={currency} onChange={onCurrencyChange}>
              <option value="USD">💵 USD</option>
              <option value="EUR">💶 Euro</option>
            </select>
            <label htmlFor="">Enter the amount you want to deposit:</label>
            <input type="number" className="form-control"/>
            <PayPalButtons 
              style={{ layout: "vertical", height: 40, disableMaxWidth: false }}
              createOrder={(data, actions) => onCreateOrder(data, actions)}
              onApprove={(data, actions) => onApproveOrder(data, actions)}
            />
            <div className="container-fluid image-group">
              <img src={import.meta.env.BASE_URL + "visa.png"} alt="" srcSet="" width="100%"/>
              <img src={import.meta.env.BASE_URL + "mastercard.png"} alt="" srcSet="" width="100%"/>
              <img src={import.meta.env.BASE_URL + "amex.png"} alt="" srcSet="" width="100%"/>
              <img src={import.meta.env.BASE_URL + "discover.png"} alt="" srcSet="" width="100%"/>
            </div>
        </>
      )}
    </div>
  )
};

export default Checkout;
