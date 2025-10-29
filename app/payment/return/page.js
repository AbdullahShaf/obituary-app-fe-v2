"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

const PaymentReturnContent = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [orderData, setOrderData] = useState(null);
  const orderId = searchParams.get('orderId');
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    if (orderId) {
      checkPaymentStatus();
    }
  }, [orderId]);

  const checkPaymentStatus = async () => {
    if (!orderId) {
      return;
    }

    if (canceled) {
      setPaymentStatus('canceled');
      return;
    }
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/status/${orderId}`);
      
      if (response.data.success) {
        setOrderData(response.data.data);
        setPaymentStatus(response.data.data.status);
      } else {
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus('error');
    }
  };

  const renderStatusMessage = () => {
    switch (paymentStatus) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Preverjamo status plačila...</h2>
            <p className="text-gray-600">Prosimo počakajte</p>
          </div>
        );

      case 'paid':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-600 mb-2">Plačilo uspešno!</h2>
            <p className="text-gray-600 mb-4">Vaše plačilo je bilo uspešno potrjeno.</p>
            {orderData?.packageType?.startsWith('memory_page_') && (
              <p className="text-sm text-gray-500 mb-4">
                Dostop do spominske strani je bil podaljšan.
              </p>
            )}
          </div>
        );

      case 'pending':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-yellow-600 mb-2">Plačilo v obdelavi</h2>
            <p className="text-gray-600 mb-4">Vaše plačilo je v obdelavi. Obvestili vas bomo o rezultatu.</p>
            <Button color="primary" onClick={checkPaymentStatus}>
              Osveži status
            </Button>
          </div>
        );

      case 'canceled':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-2">Plačilo preklicano</h2>
            <p className="text-gray-600 mb-4">Vaše plačilo je bilo preklicano ali ni bilo uspešno.</p>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Napaka</h2>
            <p className="text-gray-600 mb-4">Prišlo je do napake pri preverjanju statusa plačila.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {renderStatusMessage()}

        <div className="mt-6 flex space-x-3">
          <Link href="/cenik" className="flex-1">
            <Button  className="w-full bg-slate-400 rounded-xl">
              Nazaj na cenik
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full bg-black rounded-xl">
              Domov
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const PaymentReturnPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Nalaganje...</h2>
          </div>
        </div>
      </div>
    }>
      <PaymentReturnContent />
    </Suspense>
  );
};

export default PaymentReturnPage;