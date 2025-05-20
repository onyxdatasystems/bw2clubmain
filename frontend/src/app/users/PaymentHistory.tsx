"use client"
import React from 'react';
import { motion } from 'framer-motion';
import type { PaymentHistory } from '../types/userProfileTypes';

interface PaymentHistoryProps {
  payments: PaymentHistory[];
}

const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
  return (
    <motion.div 
      className="p-4 flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
      {payments.length > 0 ? (
        <div className="flex flex-col gap-3">
          {payments.map((payment, index) => (
            <motion.div
              key={index}
              className="p-3 border border-gray-100 rounded-lg"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                  <p className="text-xs text-gray-500">{payment.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${payment.amount.toFixed(2)}</p>
                  <p className={`text-xs ${
                    payment.status === 'completed' ? 'text-green-500' : 
                    payment.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {payment.status}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No payment history found</p>
      )}
    </motion.div>
  );
};

export default PaymentHistory;