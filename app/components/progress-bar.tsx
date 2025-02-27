export interface ProgressBarProps {
  value: number;
  color: string;
}

export const ProgressBar = ({value, color}: ProgressBarProps) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-gray-700 font-bold w-12">{value}%</div>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }}></div>
        </div>
      </div>
    </div>
  );
};