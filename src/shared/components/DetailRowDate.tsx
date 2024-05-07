import React from 'react';

type DetailItemProps = {
  title: string;
  data: string | number;
  date: string;
  isNumber?: boolean;
  isLast?: boolean; 
};

const DetailRowDate: React.FC<DetailItemProps> = ({ title, data, date,  isNumber = false, isLast = false }) => {

  const formattedData = isNumber ? data.toString() : data;

  const itemClass = `pb-3 pt-3 ${isLast ? '' : 'border-bottom-1'} surface-border flex justify-content-between`;

  return (
<div className="w-full">
    <div className={itemClass} >
        <div className="w-4 flex align-items-center pr-4">
            <div className="font-medium">{title}</div>
        </div>
    
        <div className="w-4 text-center">
            <span className="font-medium">{data}</span>
        </div>
        <div className="w-4 text-right">
            <span className="bg-blue-100 text-primary-700 font-medium px-2 py-1" style={{ borderRadius: '12px' }}>{date}</span>
        </div>
    </div>
 
</div>
  );
};

export default DetailRowDate;