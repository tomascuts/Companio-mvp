export function Avatar({ className, children }) {
    return (
      <div className={`avatar ${className}`}>
        {children}
      </div>
    );
  }
  
  export function AvatarImage({ src, alt }) {
    return <img className="avatar-img" src={src} alt={alt} />;
  }
  
  export function AvatarFallback({ children }) {
    return <div className="avatar-fallback">{children}</div>;
  }