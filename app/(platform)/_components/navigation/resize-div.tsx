interface ResizeDivProps {
  onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  resetWidth: () => void;
}

export const ResizeDiv = ({ onMouseDown, resetWidth }: ResizeDivProps) => {
  return (
    <>
      <div
        onMouseDown={onMouseDown}
        onClick={resetWidth}
        className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
      ></div>
    </>
  );
};
