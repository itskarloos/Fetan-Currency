import { toggleDarkMode } from '@/utils/theme-toggle';
import { Button } from '../ui/button';
import { Toggle } from '../ui/toggle';
import { IconSun } from '@tabler/icons-react';

const ThemeToggleButton = () => (
   <button onClick={toggleDarkMode}>
          <Toggle variant="outline" className="dark:background-white dark:text-black "aria-label="Toggle theme">
            <IconSun className="h-4 w-4 text-grey-500" />
          </Toggle>
        </button>
);
export default ThemeToggleButton
 