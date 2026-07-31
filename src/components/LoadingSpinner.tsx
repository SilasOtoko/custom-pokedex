import pokeballSvg from '../images/faded-pokeball.svg';

function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading items"
      className="absolute inset-0 flex items-center justify-center"
    >
      <img
        src={pokeballSvg}
        className="w-12 h-12 spinner-pokeball"
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}

export default LoadingSpinner;
