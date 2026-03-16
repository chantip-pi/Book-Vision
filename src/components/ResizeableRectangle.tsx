
interface ResizableRectangleProps {
  width: number;
  height: number;
  name: string;
}

export default function ResizableRectangle({ width, height, name }: ResizableRectangleProps) {
  return (
    <div className="flex flex-col items-center">
    <div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: 'lightblue',
          border: '2px solid blue',
          marginTop: '10px'
        }}
      />
    </div>
    <div className="text-center font-medium text-gray-600">{name}</div>   
    </div>
  );
}
