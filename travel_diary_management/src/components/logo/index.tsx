import { NavLink } from 'react-router-dom';

import { useThemeToken } from '@/theme/hooks';

function Logo({ className = '' }: { className?: string }) {
  const { colorPrimary } = useThemeToken();

  return (
    <NavLink to="/" className="no-underline">
      <button className={`font-semibold ${className}`} style={{ color: colorPrimary }}>
      金陵游记
      </button>
    </NavLink>
  );
}

export default Logo;
