const crypto = require("crypto");
const Payment = require("../model/paymentModel.js");
const Razorpay = require("razorpay")

const checkout = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY,
      key_secret: process.env.SECRET,
    });
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong!" });
      }

      res.status(200).json({
        success: true,
        data: order,
      });
    });
  } catch (error) {
    console.log("error while checkout", error);
    res.status(500).json({ error: "internal server error!" });
  }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSignature) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
    res.status(200).json({success:true,message:"Payment successfull!"})
  } else {
    return res.status(200).json({success: false, message: "Invalid signature sent!" });
  }
};

module.exports = { checkout, paymentVerification };
