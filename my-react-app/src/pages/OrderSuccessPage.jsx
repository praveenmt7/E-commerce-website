






// pages/OrderSuccess.js
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderSuccessPage = () => {
    const location = useLocation();
    // Destructure orderId from location.state
    const { orderDetails, paymentMethod, orderId } = location.state || {};

    if (!orderDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 p-4 font-inter">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">🚫 Order Not Found</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        It seems like there are no order details to display. Please ensure you complete the order process from the beginning.
                    </p>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 font-inter">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
                <h1 className="text-4xl font-extrabold text-green-700 mb-4 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Order Successful!
                </h1>
                <p className="text-xl text-gray-800 mb-2 font-semibold">
                    Thank you, <span className="text-indigo-600">{orderDetails.deliveryAddress?.fullName || orderDetails.shippingInfo?.fullName || 'Valued Customer'}</span>!
                </p>
                <p className="text-gray-700 mb-2 text-lg">Your order has been placed successfully.</p>
                
                {orderId && ( // Only show order ID if it exists
                    <p className="text-gray-700 mb-4 text-lg">
                        Your Order ID: <span className="font-mono bg-gray-100 text-indigo-700 px-3 py-1 rounded-md text-base select-all inline-block mt-1">{orderId}</span>
                    </p>
                )}

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-left mb-6">
                    <p className="text-lg font-medium text-gray-800 mb-2">Order Summary:</p>
                    <p className="text-gray-700"><strong>Grand Total:</strong> <span className="text-green-600 font-bold">₹{orderDetails.grandTotal?.toFixed(2) || 'N/A'}</span></p>
                    <p className="text-gray-700"><strong>Payment Method:</strong> <span className="font-semibold">{paymentMethod || 'N/A'}</span></p>
                    <p className="text-gray-700"><strong>Delivery Option:</strong> <span className="font-semibold">{orderDetails.deliveryOption || 'N/A'}</span></p>
                    <p className="text-gray-700"><strong>Delivery Address:</strong> {orderDetails.deliveryAddress?.street}, {orderDetails.deliveryAddress?.city}, {orderDetails.deliveryAddress?.state} - {orderDetails.deliveryAddress?.zipCode}</p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccessPage;





