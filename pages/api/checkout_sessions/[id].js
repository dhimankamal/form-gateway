const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { id } = req.query
		try {
			const session = await stripe.checkout.sessions.create({
				line_items: [
					{
						price: 'price_1LCLlFSBD7Ah0EoeaAdlWnUv',
						quantity: 1,
					},
				],
				payment_method_types: ['card'],
				mode: 'payment',
				success_url: `${req.headers.origin}/audition?success=true&session_id={CHECKOUT_SESSION_ID}&id=${id}`,
				cancel_url: `${req.headers.origin}/audition?canceled=true&id=${id}`,
			});
			res.redirect(303, session.url);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
