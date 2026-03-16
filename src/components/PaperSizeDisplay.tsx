import { TrimSizes } from '../constants';
import { Ruler } from 'lucide-react';
import ResizeableRectangle from './ResizeableRectangle';

interface PaperSizeDisplayProps {
  trimSize: string;
}

export default function PaperSizeDisplay({ trimSize }: PaperSizeDisplayProps) {
  const size = TrimSizes[trimSize];
  return (<div>
    <div className="flex items-center gap-2">
      <Ruler className="w-5 h-5 text-purple-600" />
        <span className="text-gray-700 ">เปรียบเทียบ</span>
      <span className="text-gray-700 font-medium">{size.name}</span>
      <span className="text-gray-500">({size.widthMM}x{size.heightMM}mm)</span>
        <span className="text-gray-700 ">กับ</span>
         <span className="text-gray-700 font-medium">A4</span>
      <span className="text-gray-500">(210x297mm)</span>
    </div>
    <div className="flex items-end grid grid-cols-2 gap-2">
      <ResizeableRectangle width={size.widthMM} height={size.heightMM} name={size.name} />
      <ResizeableRectangle width={210} height={297} name="A4" />
    </div>
    
  </div>);
}
