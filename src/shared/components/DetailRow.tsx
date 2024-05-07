import React from 'react';

type DetailItemProps = {
  title: string;
  data: string | number;
  isNumber?: boolean;
  isLast?: boolean; 
};

const DetailRow: React.FC<DetailItemProps> = ({ title, data, isNumber = false, isLast = false }) => {

  const formattedData = isNumber ? data.toString() : data;

  const itemClass = `pb-3 pt-3 ${isLast ? '' : 'border-bottom-1'} surface-border flex justify-content-between`;

  return (
    <li className={itemClass}>
      <div className="font-medium text-900 mb-2">{title}</div>
      <div className="line-height-3 text-600">{formattedData}</div>
    </li>
  );
};

export default DetailRow;
