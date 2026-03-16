import { TrimSizes } from '../constants';
import { Ruler } from 'lucide-react';
import ResizeableRectangle from './ResizeableRectangle';

interface PaperSizeDisplayProps {
  trimSize: string;
}

export default function PaperSizeDisplay({ trimSize }: PaperSizeDisplayProps) {
  const size = TrimSizes[trimSize];
  return (<div>
    <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
      <Ruler className="w-5 h-5 text-purple-600" />
        <span className="text-gray-700 ">เปรียบเทียบ</span>
      <span className="text-gray-700 font-medium">{size.name}</span>
      <span className="text-gray-500">({size.widthMM}x{size.heightMM}mm)</span>
        <span className="text-gray-700 ">กับ</span>
         <span className="text-gray-700 font-medium">A4</span>
      <span className="text-gray-500">(210x297mm)</span>
    </div>
    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-2 sm:gap-4">
      <ResizeableRectangle width={size.widthMM} height={size.heightMM} name={size.name} />
      <ResizeableRectangle width={210} height={297} name="A4" />
    </div>
    
  </div>);
}
