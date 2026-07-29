function Card({ className, children }) {
  return (
    <div
      className={`relative bg-white rounded-md shadow hover:shadow-md has-[:hover]:cursor-pointer has-[:hover]:scale-105 has-[:focus]:scale-105 transition duration-200 transform-gpu will-change-transform outline outline-transparent has-[:hover]:outline-gray-400 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
