"use client";
import { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

export default function CustomPackageCard({ type, onCodeSubmit, paymentEnabled, onPayment }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isClickable = paymentEnabled && onPayment;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setIsLoading(true);
    try {
      await onCodeSubmit(code.trim().toUpperCase());
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    if (isClickable) {
      onPayment();
    }
  };

  return (
    <div 
      className={`relative w-full h-[120px] rounded-[8px] p-[2px] border-gradient-rounded shadow-md hover:shadow-lg transition-shadow duration-300 ${
        isClickable ? 'cursor-pointer hover:scale-[1.02] transition-transform' : ''
      }`}
      onClick={isClickable ? handleCardClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      } : undefined}
    >
      <div className="flex flex-col justify-between rounded-[8px] p-4 h-full">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-[#7A7A7A] uppercase">
              {type === 'florist' ? 'CVETLIČARNE' : 'OGLAŠEVALCI'}
            </p>
            <div className="text-[20px] text-[#1E2125] mt-1 font-[500]">
              Prilagojeni paket
            </div>
          </div>
          <div className="text-[16px] text-[#530CC6] font-medium">
            Posebna ponudba
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
          <Input
            placeholder="Vnesite kodo (npr. CUSTOM-001)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            size="sm"
            variant="bordered"
            classNames={{
              input: "text-sm",
              inputWrapper: "border-gray-300 hover:border-purple-400 focus-within:border-purple-500 h-8"
            }}
            className='text-black'
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            color="primary"
            isLoading={isLoading}
            disabled={!code.trim() || isLoading}
            className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium px-4 h-8 min-w-0"
          >
            {isLoading ? '' : 'Potrdi'}
          </Button>
        </form>
        {isClickable && (
          <div className="absolute bottom-2 right-3 text-[12px] text-[#530CC6] font-medium">
            Klikni za plačilo →
          </div>
        )}
      </div>
    </div>
  );
}