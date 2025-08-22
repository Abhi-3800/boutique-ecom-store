export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-5 py-2 rounded-lg bg-beige-dark text-white font-medium hover:bg-brand-black transition ${className}`}
    >
      {children}
    </button>
  )
}
