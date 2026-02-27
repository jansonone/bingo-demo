import { cn } from '../../lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className, onClick, hover = false }: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl shadow-md p-6',
        hover && 'hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  );
}
