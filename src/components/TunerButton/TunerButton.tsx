type TunerButtonProps = {
  toggleTuning: () => void;
  stopTuning: () => void;
  isCurrentlyTuning: boolean;
}

export function TunerButton({ toggleTuning, stopTuning, isCurrentlyTuning }: TunerButtonProps) {
  const buttonClass = "inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm";
  return (
    <button style={{ position: "fixed", bottom: 64}}className={buttonClass} onClick={isCurrentlyTuning ? stopTuning : toggleTuning}>
      {isCurrentlyTuning ? (
        <span>Stop tuning</span>
      ) : (
        <span>Let's get tuning!</span>
      )}
    </button>
  );
}
