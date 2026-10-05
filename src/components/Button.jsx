import { Link } from 'react-router-dom';
import { ArrowRight } from './Icons';

// variant: primary | outline | light | ghost. Renders Link (to), anchor (href) or button.
export default function Button({ to, href, variant = 'primary', arrow = false, className = '', children, ...rest }) {
  const cls = `btn btn--${variant} ${className}`;
  const content = (<>{children}{arrow && <ArrowRight width={16} height={16} />}</>);
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>;
  return <button type="button" className={cls} {...rest}>{content}</button>;
}
