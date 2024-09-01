import { toggleDarkMode } from '@/utils/theme-toggle';
import { Button } from '../ui/button';

const ThemeToggleButton = () => (
  <Button className="bg-white" onClick={toggleDarkMode}>
    Toggle Dark Mode
  </Button>
);
export default ThemeToggleButton
 