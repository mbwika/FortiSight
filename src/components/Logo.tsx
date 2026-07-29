
import logoImage from "../assets/code-n-security.png";


export function Logo({
  className = "",
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <a 
      href="https://codensecurity.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center gap-3 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="h-14 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <img 
          src={logoImage} 
          alt="Code & Security logo"
          className="h-full w-full scale-125 object-cover object-center"
        />
      </div>
      {showTagline && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-tight tracking-wide text-slate-950 dark:text-white">
            Identifying and Mitigating Cybersecurity Risk
          </span>
        </div>
      )}
    </a>
  );
}

export function LogoCompact({
  className = "",
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <a 
      href="https://codensecurity.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <div className="h-11 w-24 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <img 
          src={logoImage} 
          alt="Code & Security logo"
          className="h-full w-full scale-125 object-cover object-center"
        />
      </div>
      {showTagline && (
        <div className="flex flex-col">
          <span className="text-xs font-semibold leading-tight tracking-wide text-slate-950 dark:text-white">
            Identifying and Mitigating Cybersecurity Risk
          </span>
        </div>
      )}
    </a>
  );
}
