import React, { ReactElement }  from 'react';

interface StatCardProps {
  outerBgColor: string; 
  innerBgColor: string; 
  number: number | string;
  title: string;
  percentage: string;
  statIcon: ReactElement; 
  isPrice?: boolean; 
}

const StatCard = ({ outerBgColor, innerBgColor, number, title, percentage, statIcon,  isPrice = false }: StatCardProps) =>{
    const formattedNumber = isPrice && typeof number === 'number' ? `$${number.toLocaleString()}` : number;
    const percentageColor = percentage.startsWith('-') ? 'text-red-600' : 'text-green-600';

    return (
    
    <div className="col-12 lg:col-4 p-2">
  <div className="shadow-2 surface-card border-round p-4">
    <div className="flex align-items-center">
      <div className={`w-4rem h-4rem flex align-items-center justify-content-center ${outerBgColor} border-circle mr-3 flex-shrink-0`}>
        <div className={`w-3rem h-3rem flex align-items-center justify-content-center ${innerBgColor} border-circle flex-shrink-0 text-white`}>
        {statIcon}
        </div>
      </div>

      <div className="ml-1 flex-1">
      <span className="block text-900 mb-1 text-xl font-medium">{formattedNumber}</span>
        <p className="text-600 mt-0 text-sm">{title}</p>
        <div className="flex align-items-center justify-content-end">
        <span className={`font-bold ${percentageColor}`}>{percentage}</span>
        </div>
      </div>
    </div>
  </div>
  </div>
)};

export default StatCard;
