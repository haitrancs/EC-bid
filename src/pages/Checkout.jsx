import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "../components/Checkout";
const initialOptions = {
  "client-id": "AV0U-AZEf4LdulqYNoDYNSBa3s57uk0JR22TCSwCxNjNeiDT_ewkMbf94-fY3fK4Gq5GuFixZWKnaNiB",
  currency: "USD",
  intent: "capture",
};

function CheckoutPage() {
  return (
    <div className="container mt-3">
      <PayPalScriptProvider options={initialOptions}>
        <Checkout />
      </PayPalScriptProvider>
    </div>
  )
}

export default CheckoutPage