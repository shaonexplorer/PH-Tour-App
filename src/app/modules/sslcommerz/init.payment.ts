import "dotenv/config";
import axios from "axios";

export interface IPaymentData {
  totalAmount: number;
  transactionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export const initPayment = async (data: IPaymentData) => {
  const payload = {
    store_id: process.env.STORE_ID,
    store_passwd: process.env.STORE_PASSWORD,
    total_amount: data.totalAmount,
    currency: "BDT",
    tran_id: data.transactionId,
    success_url: "http://yoursite.com/success.php",
    fail_url: "http://yoursite.com/fail.php",
    cancel_url: "http://yoursite.com/cancel.php",
    cus_name: data.customerName,
    cus_email: data.customerEmail,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: 1000,
    cus_country: "Bangladesh",
    cus_phone: data.customerPhone,
    cus_fax: "N/A",
    ship_name: data.customerName,
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    // multi_card_name: "mastercard,visacard,amexcard",
    // value_a: "ref001_A",
    // value_b: "ref002_B",
    // value_c: "ref003_C",
    // value_d: "ref004_D",
  };

  try {
    const response = await axios.post(
      process.env.TRANSACTION_URL as string,
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Payment initialization failed:", error);
    throw error;
  }
};
