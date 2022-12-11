import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next/types";
import Order from "../../models/Order";
import { initMongoose } from "./products";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await initMongoose();
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;
  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );

  if (event?.type === "checkout.session.completed") {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === "paid") {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
    }
  }

  res.json("ok");
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
