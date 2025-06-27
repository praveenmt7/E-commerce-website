


















// // src/Components/OrderSuccessPage.jsx
// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const OrderSuccessPage = () => {
//   const location = useLocation();
//   const { orderDetails, isCOD } = location.state || {}; // Get order details and COD flag

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
//       <svg className="h-24 w-24 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//       <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Order Placed Successfully!</h2>
//       <p className="text-gray-600 mb-6 text-lg text-center">
//         Thank you for your purchase. Your order has been confirmed and will be processed shortly.
//       </p>

//       {isCOD && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center border-l-4 border-blue-500">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Cash on Delivery (COD)</h3>
//           <p className="text-gray-600">
//             You have chosen Cash on Delivery. Please pay ₹{orderDetails.grandTotal.toFixed(2)} when your order arrives.
//           </p>
//         </div>
//       )}

//       {orderDetails && (
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Order Summary</h3>
//           <p className="text-gray-600">Grand Total: <strong className="text-green-600">₹{orderDetails.grandTotal.toFixed(2)}</strong></p>
//           {/* You might display an order ID here from your backend */}
//           <p className="text-gray-600 mt-2">A confirmation email with your order details has been sent.</p>
//         </div>
//       )}

//       <Link
//         to="/"
//         className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
//       >
//         Continue Shopping
//       </Link>
//     </div>
//   );
// };

// export default OrderSuccessPage;







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





