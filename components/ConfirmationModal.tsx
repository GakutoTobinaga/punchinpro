import React from 'react';
import { Button } from '@tremor/react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void; // onCancel propを追加
  }
  
  const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow space-y-3">
          <h2 className="text-lg font-bold">変更を確認</h2>
          <p>この変更を保存しますか？</p>
          <div className="flex justify-end space-x-2">
            <Button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">キャンセル</Button>
            <Button onClick={onConfirm} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">確定</Button>
          </div>
        </div>
      </div>
    );
  };
  

export default ConfirmationModal;
