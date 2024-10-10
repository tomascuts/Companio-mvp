export function Button({ variant, size, children, ...props }) {
    return (
      <button className={`btn ${variant} ${size}`} {...props}>
        {children}
      </button>
    );
  }